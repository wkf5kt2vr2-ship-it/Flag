const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  // COMPLIANCE: context.OPENID is available but deliberately NOT used.
  // We store NO user identity information — only answer data.
  const { answers, submittedAt } = event;

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return { success: false, error: 'invalid_payload' };
  }

  const record = {
    answers: sanitizeAnswers(answers),
    submittedAt: typeof submittedAt === 'string' ? submittedAt : new Date().toISOString(),
  };

  try {
    const result = await db.collection('survey_responses').add({ data: record });
    return { success: true, id: result._id };
  } catch (err) {
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
    } else if (typeof val === 'number' && isFinite(val)) {
      safe[key] = val;
    } else if (Array.isArray(val)) {
      safe[key] = val
        .filter(v => typeof v === 'string' && v.length <= 100)
        .slice(0, 20);
    }
  }
  return safe;
}
