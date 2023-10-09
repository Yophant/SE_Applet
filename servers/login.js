export const getCode = () => {
  new promise ((resolve,reject)=>{
    wx.login({
      success: (res) => {
        //获取code
        reslove(res.code)
      }
    })
  })
}