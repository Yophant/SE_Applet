// // 封装成类 
// export const getCode = () => {
//   return new Promise ((resolve,reject)=>{
//     let that =this;
//     wx.login({
//       success: (res) => {
//         //获取code
//         resolve(res.code)
//       }
//     })
//   })
// }
// class Request {
//   constructor(baseURL) {
//     this.baseURL = baseURL
//   }
//   request(options) {
//     const { url } = options
//     return new Promise((resolve, reject) => {
//       wx.request({
//         ...options,
//         url: this.baseURL + url,
//         success: (res) => {
//           resolve(res.data)
//         },
//         fail: (err) => {
//           console.log("err:", err);
//         }
//       })
//     })
//   }
//   get(options) {
//     return this.request({ ...options, method: "get" })
//   }
//   post(options) {
//     return this.request({ ...options, method: "post" })
//   }
// }
// export const loginRequest = new Request("http://xxxxxxx")

App({
  async onLaunch() {

    this.globalData.audio = wx.createInnerAudioContext();
    this.globalData.audio.src = 'http://music.163.com/song/media/outer/url?id=408055111.mp3',
    this.globalData.isPlaying = false;
  //   // 展示本地存储能力

  //   //获取本地token
  //   const token = wx.getStorageSync('token') || ''
 
  //   //检查token是否过期
  //   const res = await loginRequest.post({
  //     url: '/auth',
  //     header: {
  //       token
  //     }
  //   })
  //   console.log(res);
 
  //   // 登录
  //   if (token && res.message === "已登录") {
  //     console.log('请求其他数据');
  //   } else {
  //     this.handlerLogin()
  //   }
  // },
  // //登录的回调函数
  // async handlerLogin() {
  //   //获取code
  //   const code = await getCode() ;
 
  //   //将code发给后端请求token
  //   const res = await loginRequest.post({
  //     url: "/login",
  //     data: { code }
  //   })
 
  //   //保存token
  //   wx.setStorageSync('token', res.token)
  },

  globalData: {
    userInfo: null,
    audio: null,
    isPlaying: false
  },

})