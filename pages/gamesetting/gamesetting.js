// pages/gamesetting/gamesetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgdimgSrc: "/images/bgdimage5.png",
    gamesetSrc: "/images/gameset.png",
    sure2Src: "/images/sure2.png",
    // tempInputgames:null,
    // tempInputchips:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    this.audioCtx2 = wx.createInnerAudioContext();
    this.audioCtx2.src = '/sounds/click2.mp3';
    this.audioCtx2.volume = 0.3 ;
    // this.tempInputchips = null ;
    // this.tempInputgames = null ;
  },
  handleClick: function() {
    this.audioCtx2.play();  // 播放点击音效
  },
  handleInput: function(e) {
    // 实时获取用户输入并保存在页面的临时数据中
    this.data.userInputgames = e.detail.value;
  },
  handleInput2: function(e) {
    this.data.userInputchips = e.detail.value;
  },
  storeInput: function() {
    this.handleClick();
    if(this.data.userInputgames === undefined || this.data.userInputchips===undefined){
      wx.showToast({
        title: '请输入游戏局数和筹码数',
        icon: 'none',  // 为 'none' 时，不显示图标只显示文字
        duration: 2000  // 提示的延迟时间，单位毫秒，默认：1500
      });
    }else{
      wx.redirectTo({
        url: `/pages/pvppage/pvppage?userInputgames=${this.data.userInputgames}&userInputchips=${this.data.userInputchips}`
      });
    }
    console.log(this.data.userInputgames);
    console.log(this.data.userInputchips);
    
    
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