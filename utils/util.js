/**
 * 根据量表题配置生成选项数组
 * @param {{ min: number, max: number }} question
 * @returns {number[]}
 */
function buildScaleValues(question) {
  const values = [];
  for (let i = question.min; i <= question.max; i++) {
    values.push(i);
  }
  return values;
}

/**
 * 判断当前题目是否已作答
 * @param {{ id: string, type: string, required: boolean }} question
 * @param {Object} answers
 * @returns {boolean}
 */
function isAnswered(question, answers) {
  if (!question.required) return true;
  const val = answers[question.id];
  if (val === undefined || val === null) return false;
  if (question.type === 'multiple') return Array.isArray(val) && val.length > 0;
  return val !== '';
}

/**
 * 计算进度百分比
 * @param {number} currentIndex  当前题序号（0-based）
 * @param {number} total
 * @returns {number} 0–100
 */
function calcProgress(currentIndex, total) {
  if (total === 0) return 0;
  return Math.round(((currentIndex + 1) / total) * 100);
}

/**
 * 验证所有必填题已作答
 * @param {Array} questions
 * @param {Object} answers
 * @returns {{ valid: boolean, firstUnansweredIndex: number|null }}
 */
function validateAllAnswers(questions, answers) {
  for (let i = 0; i < questions.length; i++) {
    if (!isAnswered(questions[i], answers)) {
      return { valid: false, firstUnansweredIndex: i };
    }
  }
  return { valid: true, firstUnansweredIndex: null };
}

/**
 * 格式化 ISO 时间戳为可读字符串
 * @param {string} isoString
 * @returns {string}
 */
function formatDate(isoString) {
  const d = new Date(isoString);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * 生成一次性会话标识，用于防止重复提交
 * 仅在内存中存储，不会写入数据库
 * @returns {string}
 */
function generateSessionToken() {
  return 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

module.exports = {
  buildScaleValues,
  isAnswered,
  calcProgress,
  validateAllAnswers,
  formatDate,
  generateSessionToken,
};
