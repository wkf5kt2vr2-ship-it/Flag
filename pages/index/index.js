const SURVEY_CONFIG = require('../../utils/questions');

Page({
  data: {
    surveyTitle: '',
    surveyDesc: '',
    questionCount: 0,
    estimatedMinutes: 0,
  },

  onLoad() {
    this.setData({
      surveyTitle: SURVEY_CONFIG.title,
      surveyDesc: SURVEY_CONFIG.description,
      questionCount: SURVEY_CONFIG.questions.length,
      estimatedMinutes: SURVEY_CONFIG.estimatedMinutes,
    });
  },

  startSurvey() {
    wx.navigateTo({ url: '/pages/survey/survey' });
  },
});
