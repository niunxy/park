// pages/my/contact/contact.js
const http =  require('../../../fetch/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactusList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.init()
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
  callPhone: function(){
    wx.makePhoneCall({
      phoneNumber: '029-65691333' //仅为示例，并非真实的电话号码
    })
  },
  copyEmail: function(){
    wx.setClipboardData({
      data: 'xianhr@hanweitech.com'
    })
  },
  init(){
      http('/wx/getContactUsList',null).then((res) => {
          if(res.code === 200) {
              this.setData({
                contactusList:res.contactusList
              })
          }
      })
  }
})