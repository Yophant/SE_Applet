// pages/choosemode/choosemode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgdimgSrc: "/images/bgdimage2.png",
    localbattleSrc: "/images/localbattle.png",
    onlinebattleSrc: "/images/onlinebattle.png",
    aibattleSrc:"/images/aibattle.png",
    rankingSrc:"/images/ranking.png",
    funbattleSrc:"/images/funbattle.png",
    rulesSrc:"/images/rules.png",
    back2Src:"/images/back2.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    this.audioCtx2 = wx.createInnerAudioContext();
    this.audioCtx2.src = '/sounds/click2.mp3';
    this.audioCtx2.volume = 0.3 ;
    this.audioCtx3 = wx.createInnerAudioContext();
    this.audioCtx3.src = '/sounds/click1.mp3';
    this.audioCtx3.volume = 0.5 ;
  },
  handleClick: function() {
    this.audioCtx2.play();  // 播放点击音效
  },
  handleClick2:function(){
    this.audioCtx3.play();
  },
  redirectToTarget: function() {
    this.handleClick();
    wx.redirectTo({
        url: '/pages/mainpage/mainpage'
    });
  },
  redirectToRanking: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/ranking/ranking'
    });
  },
  redirectToRules: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/rules/rules'
    });
  },
  redirectToFunpvp: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/gamesetting/gamesetting'
    });
  },
  redirectToOnlinepvp: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/onlinepvp/onlinepvp'
    });
  },
  redirectToPvppage: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/gamesetting/gamesetting'
    });
  },
  redirectToPvaipage: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/gamesetting/gamesetting'
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})