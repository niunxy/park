// pages/home/carInfo/carInfo.js
const http =  require('../../../fetch/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['自行车', '摩托车', '电动车', '小轿车','卡车'],
    index:0,
    carPic:'',
    car:'',
    carBrand:'',
    carCode:'',
    carVin:'',
    buyPrice:'',
    buyTime:''
  },

  submitHandle: function(){
      http('/wx/insertUserCar',{
        carBrand:this.data.carBrand,
        carCode:this.data.carCode,
        carVin:this.data.carVin,
        buyPrice:this.data.buyPrice,
        carPic:this.data.carPic,
        carType:this.data.array[this.data.index],
        buyTime:this.data.buyTime
      },'post').then((res) => {
          if(res.code === 200){
              wx.navigateBack()
          }
      })
  },

  bindchange(e){
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function(e) {
    this.setData({
      buyTime: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindHandle(event){
      const type = event.currentTarget.dataset.type
      this.setData({
         [type]:event.detail.value
      })
  },
  upload(event){
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
                car: app.globalData.baseUrl + data.filePath,
                carPic: data.fileUuid
              })
            }
            //do something
          }
        })
      }
    })
},
})