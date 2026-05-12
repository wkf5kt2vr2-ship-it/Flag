App({
  onLaunch() {
    // COMPLIANCE: traceUser is set to false to prevent automatic openid association.
    // This app collects NO personal identifiers per WeChat Mini Program privacy rules
    // and Tencent Cloud data minimization policy.
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'YOUR_ENV_ID',   // 替换为你的云环境 ID
        traceUser: false,     // 关键：禁止 SDK 自动关联用户 openid
      });
    }
  },

  globalData: {},
});
