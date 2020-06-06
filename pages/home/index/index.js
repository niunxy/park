// pages/home/index/index.js
const http = require('../../../fetch/api')
const app = getApp()
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
    villageList: [],
    rotationPicList: [],
    baseUrl: app.globalData.baseUrl,
    newsList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBanner()
    this.initNews()
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
  parkHandle: function (e) {
    const orderType = e.currentTarget.dataset.type
    http('/wx/getOrderInfo', {
      planType: orderType
    }).then((res) => {
      if (res.code == 200) {
        if (res.errCode === 4) {
          wx.navigateTo({
            url: '../register/register',
          })
        }else if(res.errCode === 5){
          wx.navigateTo({
            url: '../carInfo/carInfo',
          })
        }else if(res.errCode === 1){
            wx.setStorageSync('carList', JSON.stringify(res.carList))
            wx.setStorageSync('order', JSON.stringify(res.order))
            wx.setStorageSync('parklotList', JSON.stringify(res.parklotList))
            wx.navigateTo({
              url: '../park/park?orderType=' + orderType,
            })
        }
      }
    })
    // wx.navigateTo({
    //   url: '../park/park',
    // })
  },
  halfParkHandle: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  yearParkHandle: function () {
    wx.navigateTo({
      url: '../carInfo/carInfo',
    })
  },
  initBanner() {
    http('/wx/getRotationPicList', null).then((res) => {
      if (res.code == 200) {
        this.setData({
          rotationPicList: res.rotationPicList
        })
      }
    })
  },
  initNews() {
    http('/wx/getNewsList', null).then((res) => {
          if(res.code === 200){
            res.newsList.forEach((item) => {
                if(item.newsIcon){
                  res.url = this.data.baseUrl + item.newsIcon.filepath
                }else{
                  res.url = ''
                }
            })
              this.setData({
                newsList:res.newsList[0]
              })
          }
    })
  },
  more(){
    wx.navigateTo({
      url: '../news/news',
    })
  }
})