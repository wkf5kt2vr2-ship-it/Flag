const SURVEY_CONFIG = require('../../utils/questions');
const { buildScaleValues, isAnswered, calcProgress, validateAllAnswers } = require('../../utils/util');

Page({
  data: {
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    totalQuestions: 0,
    answers: {},
    progressPercent: 0,
    isCurrentAnswered: false,
    submitting: false,
  },

  onLoad() {
    const questions = SURVEY_CONFIG.questions.map(q => {
      if (q.type === 'scale') {
        return { ...q, scaleValues: buildScaleValues(q) };
      }
      return q;
    });

    const total = questions.length;
    this.setData({
      questions,
      totalQuestions: total,
      currentQuestion: questions[0],
      progressPercent: calcProgress(0, total),
      isCurrentAnswered: !questions[0].required,
    });
  },

  // 单选
  selectSingle(e) {
    const { qid, value } = e.currentTarget.dataset;
    this.setData({ [`answers.${qid}`]: value });
    this._checkAnswered();
  },

  // 多选
  toggleMultiple(e) {
    const { qid, value } = e.currentTarget.dataset;
    const current = this.data.answers[qid] || [];
    const idx = current.indexOf(value);
    const updated = idx === -1
      ? [...current, value]
      : current.filter(v => v !== value);
    this.setData({ [`answers.${qid}`]: updated });
    this._checkAnswered();
  },

  // 量表评分 — data-value 传来的是字符串，显式转为数字存储
  selectScale(e) {
    const { qid, value } = e.currentTarget.dataset;
    this.setData({ [`answers.${qid}`]: Number(value) });
    this._checkAnswered();
  },

  // 下一题
  nextQuestion() {
    const { currentIndex, questions, totalQuestions, answers } = this.data;
    if (!isAnswered(questions[currentIndex], answers)) return;

    const nextIndex = currentIndex + 1;
    const nextQ = questions[nextIndex];
    this.setData({
      currentIndex: nextIndex,
      currentQuestion: nextQ,
      progressPercent: calcProgress(nextIndex, totalQuestions),
      isCurrentAnswered: isAnswered(nextQ, answers),
    });
  },

  // 上一题
  prevQuestion() {
    const { currentIndex, questions, totalQuestions, answers } = this.data;
    if (currentIndex === 0) return;

    const prevIndex = currentIndex - 1;
    const prevQ = questions[prevIndex];
    this.setData({
      currentIndex: prevIndex,
      currentQuestion: prevQ,
      progressPercent: calcProgress(prevIndex, totalQuestions),
      isCurrentAnswered: isAnswered(prevQ, answers),
    });
  },

  // 提交问卷
  submitSurvey() {
    const { questions, answers } = this.data;
    const { valid, firstUnansweredIndex } = validateAllAnswers(questions, answers);

    if (!valid) {
      wx.showToast({ title: '请完成所有必填题目', icon: 'none' });
      this.setData({
        currentIndex: firstUnansweredIndex,
        currentQuestion: questions[firstUnansweredIndex],
        progressPercent: calcProgress(firstUnansweredIndex, questions.length),
        isCurrentAnswered: false,
      });
      return;
    }

    this.setData({ submitting: true });
    wx.showLoading({ title: '提交中...' });

    // 仅发送答题数据，不包含任何个人信息
    wx.cloud.callFunction({
      name: 'submitSurvey',
      data: {
        answers,
        submittedAt: new Date().toISOString(),
      },
      success: () => {
        wx.hideLoading();
        wx.redirectTo({ url: '/pages/result/result' });
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('submitSurvey failed', err);
        wx.showToast({ title: '提交失败，请重试', icon: 'none' });
        this.setData({ submitting: false });
      },
    });
  },

  _checkAnswered() {
    const { currentQuestion, answers } = this.data;
    this.setData({ isCurrentAnswered: isAnswered(currentQuestion, answers) });
  },
});
