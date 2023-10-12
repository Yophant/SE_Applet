// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgdimgSrc: "/images/bgdimage2.png",
    rankerSrc: "/images/ranker.png",
    you_rankingSrc: "/images/you_ranking.png",
    back2Src:"/images/back2.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.audioCtx2 = wx.createInnerAudioContext();
    this.audioCtx2.src = '/sounds/click0.mp3';
    this.audioCtx2.volume = 0.3 ;
    this.audioCtx3 = wx.createInnerAudioContext();
    this.audioCtx3.src = '/sounds/click1.mp3';
    this.audioCtx3.volume = 0.5 ;
  },
  // 点击事件处理函数
  handleClick: function() {
    this.audioCtx2.play();  // 播放点击音效
  },
  handleClick2:function(){
    this.audioCtx3.play();
  },
  redirectToChoosemode: function() {
    this.handleClick2();
    wx.navigateBack({
      delta: 1
    })
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