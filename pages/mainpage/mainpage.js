// pages/mainpage/mainpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing:false,
    bgdimgSrc: "/images/newest_mainpage.png",
    startboardSrc: "/images/startboard.png",
    animationData: {} // 用于保存动画数据
  },
  
  onLoad: function() {
    // 初始化音乐播放器
    this.audioCtx = wx.createInnerAudioContext();
    this.audioCtx.src = '/bgm/prologue.mp3';
    this.audioCtx2 = wx.createInnerAudioContext();
    this.audioCtx2.src = '/sounds/click0.mp3';
    this.audioCtx2.volume = 0.3 ;
    this.audioCtx3 = wx.createInnerAudioContext();
    this.audioCtx3.src = '/sounds/click1.mp3';
    this.audioCtx3.volume = 0.5 ;
    this.animation = wx.createAnimation({
      duration: 600, // 动画时长，单位ms
      timingFunction: 'ease', // 动画效果
  });
    
},
  // 点击事件处理函数
  handleClick: function() {
    this.audioCtx2.play();  // 播放点击音效
  },
  handleClick2:function(){
    this.audioCtx3.play();
  },
  toggleMusic: function() {
    this.animation.translateY(-110).step(); // -30px为滑动的距离，可以根据需要调整
    // 更新动画数据
    this.setData({
        animationData: this.animation.export()
    });
    // 将动画恢复到原位置，准备下一次动画
    setTimeout(() => {
        // 音乐播放与暂停逻辑
        if (this.data.playing) {
            this.audioCtx.pause();
        } else {
            this.audioCtx.play();
        }
        // 切换播放状态
        this.setData({
            playing: !this.data.playing
        });
        this.animation.translateY(0).step({ duration: 800 });
        this.setData({
            animationData: this.animation.export()
        });
    }, 500); // 500ms是动画的时长

  },
  redirectToChoosemode: function() {
    this.handleClick();
    wx.redirectTo({
        url: '/pages/choosemode/choosemode'
    });
  },
  redirectToRules: function() {
    this.handleClick2();
    wx.redirectTo({
        url: '/pages/rules/rules'
    });
  },
  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad(options) {

  // },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady() {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow() {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide() {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload() {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh() {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom() {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage() {

  // }
})