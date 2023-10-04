// pages/rules/rules.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgdimgSrc: "/images/bgdimage3.png",
    back2Src:"/images/back2.png",
    ruleSrc:"/images/rule.png",
    nextstepSrc:"/images/nextstep.png",
    prestepSrc:"/images/prestep.png",
    currentImageIndex: 0,
    images: [
      "/images/rule1.png",
      "/images/rule2.png",
      "/images/rule3.png",
      "/images/rule4.png",
      "/images/rule5.png",
      "/images/rule6.png",
      "/images/rule7.png",
      "/images/rule8.png"
    ],
    animationData: {}
  },
  // 动画效果
  fadeIn: function() {
    const animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
    });
    // 先将透明度设置为0
    animation.opacity(0).step({ duration: 1 });
    // 然后将透明度设置为1
    animation.opacity(1).step({ duration: 500 });
    this.setData({
        animationData: animation.export()
    });
  },

  // 点击向左或向右的图标时调用的函数
  prevImage: function() {
    let newIndex = (this.data.currentImageIndex - 1 + 8) % 8;
    this.setData({
        currentImageIndex: newIndex
    });
    this.fadeIn();
  },

  nextImage: function() {
    let newIndex = (this.data.currentImageIndex + 1) % 8;
    this.setData({
        currentImageIndex: newIndex
    });
    this.fadeIn();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.audioCtx2 = wx.createInnerAudioContext();
    this.audioCtx2.src = '/sounds/click1.mp3';
    this.audioCtx2.volume = 0.3 ;
    this.audioCtx3 = wx.createInnerAudioContext();
    this.audioCtx3.src = '/sounds/click2.mp3';
    this.audioCtx3.volume = 0.5 ;
  },
  // 点击事件处理函数
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