// app.js
App({
  onLaunch() {
    this.globalData.audio = wx.createInnerAudioContext();
    this.globalData.audio.src = 'https://m801.music.126.net/20231007230124/9510cbb3f861acbcc89d89b166d0ac20/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/9835534795/e5c7/6864/6610/b06524e2e873b78703f5e7004d212973.m4a';
    // 'https://m701.music.126.net/20231006175903/d43aabd9fcd303def8f85e3d64a6583d/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/9835534795/e5c7/6864/6610/b06524e2e873b78703f5e7004d212973.m4a'
    this.globalData.isPlaying = false;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
  globalData: {
    userInfo: null,
    audio: null,
    isPlaying: false
  }
})
