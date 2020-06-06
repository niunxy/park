// pages/home/news/news.js
const http =  require('../../../fetch/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    baseUrl: app.globalData.baseUrl,
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
                newsList:res.newsList
              })
          }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  }
})