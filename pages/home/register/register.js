// pages/home/register/register.js
const http =  require('../../../fetch/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    villageList:[],
    array: ['美国', '中国', '巴西', '日本'],
    index:0,
    frontPic:'',
    endPic:'',
    handPic:'',
    facePic:'',
    idCardPic1:'',
    idCardPic2:'',
    idCardPic3:'',
    facePic1:'',
    realName:'',
    address:'',
    phonenumber:'',
    idCard:'',
    baseUrl: app.globalData.baseUrl
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
  bindHandle(event){
      const name = event.currentTarget.dataset.type
      this.setData({
        [name]: event.detail.value
      })
  },
  initArea(){
    http('/wx/getVillageList',null).then((res) => {
        if(res.code === 200){
            this.setData({
              villageList:res.villageList
            })
        }
    })
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
                if(type === '1'){
                    that.setData({
                      frontPic: app.globalData.baseUrl + '/' + data.filePath,
                      idCardPic1: data.fileUuid
                    })
                }else if(type === '2'){
                    that.setData({
                      endPic: app.globalData.baseUrl + '/' + data.filePath,
                      idCardPic2: data.fileUuid
                    })
                }else if(type === '3'){
                    that.setData({
                      handPic: app.globalData.baseUrl + '/' + data.filePath,
                      idCardPic3: data.fileUuid
                    })
              }
            }
            //do something
          }
        })
      }
    })
},
faceUpload(){
  const that = this
  wx.chooseImage({
    success: (res) => {
      const tempFilePaths = res.tempFilePaths
      wx.uploadFile({
        url: `${app.globalData.baseUrl}/wx/data/userFaceUpload`, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        success (res){
          const data = JSON.parse(res.data)
          if(data.code === 200){
            that.setData({
              facePic: app.globalData.baseUrl + data.filePath,
              facePic1: data.fileUuid
            })
          }
        }
      })
    }
  })
},
submitHandle(){
  http('/wx/logonApp',{
    realName:this.data.realName,
    address:this.data.address,
    phonenumber:this.data.phonenumber,
    villageId:this.data.villageList[this.data.index].villageId,
    idCard:this.data.idCard,
    idCardPic1:this.data.idCardPic1,
    idCardPic2:this.data.idCardPic2,
    idCardPic3:this.data.idCardPic3,
    facePic1:this.data.facePic1,
  }).then((res) => {
      if(res.code == 200){
          
      }
  })
}
})