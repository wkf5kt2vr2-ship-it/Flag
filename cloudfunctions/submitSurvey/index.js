const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  // COMPLIANCE: context.OPENID is available but deliberately NOT used.
  // We store NO user identity information — only answer data.
  const { answers, submittedAt, sessionToken } = event;

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return { success: false, error: 'invalid_payload' };
  }

  const record = {
    answers: sanitizeAnswers(answers),
    submittedAt: typeof submittedAt === 'string' ? submittedAt : new Date().toISOString(),
  };

  // 使用 sessionToken 作为文档 _id，实现幂等提交（重复请求写入相同 _id 会冲突）
  if (sessionToken && /^sess_[a-z0-9]+$/.test(sessionToken)) {
    record._id = sessionToken;
  }

  try {
    const result = await db.collection('survey_responses').add({ data: record });
    return { success: true, id: result._id };
  } catch (err) {
    // _id 冲突说明是重复提交，当作成功处理
    if (err.errCode === -502005 || (err.message && err.message.includes('unique'))) {
      return { success: true, id: sessionToken };
    }
    console.error('DB write failed:', err);
    return { success: false, error: err.message };
  }
};

// 过滤非法字段和不安全的字段内容
function sanitizeAnswers(answers) {
  const safe = {};
  for (const [key, val] of Object.entries(answers)) {
    if (!/^[a-zA-Z0-9_]+$/.test(key)) continue;
    if (typeof val === 'string' && val.length <= 200) {
      safe[key] = val;
    } else if (typeof val === 'number' && Number.isInteger(val) && val >= 0 && val <= 100) {
      safe[key] = val;
    } else if (Array.isArray(val)) {
      safe[key] = val
        .filter(v => typeof v === 'string' && v.length <= 100)
        .slice(0, 20);
    }
  }
  return safe;
}
