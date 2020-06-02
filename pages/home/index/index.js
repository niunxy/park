// pages/home/index/index.js
const http =  require('../../../fetch/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    villageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        wx.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              http('/loginApp',{
                code:res.code
              },'get').then((res) => {
                  if(res.code == 200){
                    wx.setStorageSync('uToken', res.uToken)
                  }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  parkHandle: function(){
      http('/getOrderInfo',{
        planType:'N'
      }).then((res) => {
          if(res.code == 200){
              if(res.errCode === 4){
                wx.navigateTo({
                  url: '../register/register',
                })
              }
          }
      })
      // wx.navigateTo({
      //   url: '../park/park',
      // })
  },
  halfParkHandle: function(){
      wx.navigateTo({
        url: '../register/register',
      })
  },
  yearParkHandle: function(){
      wx.navigateTo({
        url: '../carInfo/carInfo',
      })
  }
})