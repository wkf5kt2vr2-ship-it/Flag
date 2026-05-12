const SURVEY_CONFIG = {
  id: 'psych_wellbeing_v1',
  title: '心理健康状况调查',
  description: '本问卷旨在了解您近期的心理健康状况，结果仅用于教学研究，不涉及任何个人信息。',
  estimatedMinutes: 5,
  questions: [
    // 单选题
    {
      id: 'q01',
      type: 'single',
      required: true,
      text: '在过去两周内，您的整体心情状态如何？',
      options: ['非常好', '比较好', '一般', '比较差', '非常差']
    },
    {
      id: 'q02',
      type: 'single',
      required: true,
      text: '您通常每天的睡眠时间是多少小时？',
      options: ['少于5小时', '5–6小时', '7–8小时', '8小时以上']
    },
    {
      id: 'q03',
      type: 'single',
      required: true,
      text: '当您遇到困难时，您通常会？',
      options: ['独自承受', '向朋友倾诉', '向家人求助', '寻求专业帮助', '转移注意力']
    },
    {
      id: 'q11',
      type: 'single',
      required: true,
      text: '您是否曾经主动寻求过心理咋询或辅导？',
      options: ['从未', '考虑过但未实施', '曾经寻求过', '正在接受咋询']
    },
    {
      id: 'q15',
      type: 'single',
      required: true,
      text: '您认为学校/单位的心理健康支持服务是否充分？',
      options: ['非常充分', '基本够用', '一般', '不太够用', '完全不够用']
    },

    // 多选题
    {
      id: 'q04',
      type: 'multiple',
      required: true,
      text: '以下哪些因素会让您感到压力？（可多选）',
      options: ['学业/工作压力', '人际关系', '经济问题', '健康问题', '未来规划', '家庭矛盾']
    },
    {
      id: 'q05',
      type: 'multiple',
      required: true,
      text: '您通常通过哪些方式来缓解压力？（可多选）',
      options: ['运动健身', '听音乐', '与朋友交流', '阅读', '睡觉休息', '其他']
    },
    {
      id: 'q06',
      type: 'multiple',
      required: false,
      text: '您是否有以下睡眠问题？（可多选，无则跳过）',
      options: ['入睡困难', '易醒', '多梦', '早醒', '白天嘠睡', '没有睡眠问题']
    },
    {
      id: 'q13',
      type: 'multiple',
      required: true,
      text: '以下哪些活动能让您感到快乐？（可多选）',
      options: ['户外活动', '社交聚会', '独处思考', '创意活动', '学习新知识', '帮助他人']
    },

    // 量表题
    {
      id: 'q07',
      type: 'scale',
      required: true,
      text: '您对目前生活状态的满意程度？',
      min: 1,
      max: 5,
      minLabel: '非常不满意',
      maxLabel: '非常满意'
    },
    {
      id: 'q08',
      type: 'scale',
      required: true,
      text: '过去一个月内，您感到焦虑或紧张的频率？',
      min: 1,
      max: 5,
      minLabel: '从不',
      maxLabel: '几乎每天'
    },
    {
      id: 'q09',
      type: 'scale',
      required: true,
      text: '您与同学/同事的关系融洽程度？',
      min: 1,
      max: 5,
      minLabel: '非常差',
      maxLabel: '非常好'
    },
    {
      id: 'q10',
      type: 'scale',
      required: true,
      text: '您对自己的学习/工作效率评分？',
      min: 1,
      max: 10,
      minLabel: '很低',
      maxLabel: '很高'
    },
    {
      id: 'q12',
      type: 'scale',
      required: true,
      text: '您认为自己具备应对生活挑战的能力程度？',
      min: 1,
      max: 5,
      minLabel: '完全不具备',
      maxLabel: '完全具备'
    },
    {
      id: 'q14',
      type: 'scale',
      required: true,
      text: '过去两周内，您感到孤独或被孤立的程度？',
      min: 1,
      max: 5,
      minLabel: '从不孤独',
      maxLabel: '经常孤独'
    },
  ]
};

module.exports = SURVEY_CONFIG;
