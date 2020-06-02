// pages/home/register/register.js
const http =  require('../../../fetch/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    villageList:[],
    array: ['美国', '中国', '巴西', '日本'],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initArea()
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  initArea(){
    http('/getVillageList',null).then((res) => {
        if(res.code === 200){
            this.setData({
              villageList:res.villageList
            })
        }
    })
},
upload(){
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://implement.mynatapp.cc/dev-api/wx/data/idCardUpload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success (res){
            const data = res.data
            debugger
            //do something
          }
        })
      }
    })
}
})