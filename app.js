// app.js
App({
  onLaunch() {
    this.globalData.audio = wx.createInnerAudioContext();
    this.globalData.audio.src = 'https://m804.music.126.net/20231005201901/39ffbf249ee1573d88928cd31189d1a0/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/9835534795/e5c7/6864/6610/b06524e2e873b78703f5e7004d212973.m4a?authSecret=0000018affb008b30f590aaba3230f2d';
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
