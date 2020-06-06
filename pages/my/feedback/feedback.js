// pages/my/feedback/feedback.js
const http = require('../../../fetch/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList3: [],
    opinionPicids: '',
    opinionContent: '',
    pic:'',
    phone:''
  },
  upload(event){
    const type = event.currentTarget.dataset.type
    const that = this
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${app.globalData.baseUrl}/wx/data/idCardUpload`, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success (res){
            const data = JSON.parse(res.data)
            if(data.code === 200) {
              that.setData({
                pic: app.globalData.baseUrl + '/' + data.filePath,
                opinionPicids: data.fileUuid
              })
            }
          }
        })
      }
    })
  },
  bindHandle(event) {
    const type = event.cunrrentTarget.dataset.type
    this.setData({
      [type]: event.detail.value
    })
  },
  submitHandle() {
    http('/wx/addOpinion', {
      opinionPicids: this.data.opinionPicids,
      opinionContent: this.data.opinionContent
    }, 'post').then((res) => {
        if(res.code === 200){
            if(res.errCode === 4){
              wx.navigateTo({
                url: '../../home/register/register',
              })
            }
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        phone:wx.getStorageSync('phnoe')
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

  }
})