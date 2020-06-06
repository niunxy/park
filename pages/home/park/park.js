// pages/home/park/park.js
const http =  require('../../../fetch/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index:0,
    carOwner:'',
    phone:'',
    idCard:'',
    parkPlace:'',
    houseNo:'',
    parkCar:'',
    parklotList:[],
    index1:0,
    order:{

    },
    carType:'',
    carName:'',
    carId:'',
    price:0,
    carList:[],
    orderType:''
  },

  initParklot(){
      http('/wx/getParklotList',null).then((res) => {
          if(res.code === 200){
            this.setData({
              parklotList:res.parklotList
            })
          }
      })
  },

  bindLotChange(e){
      this.setData({
        index1:e.detail.value
      })
      this.getPrice('N',this.data.parklotList[e.detail.value].parklotId)
  },

  getPrice(planType,parklotId){
     http('/wx/getPrice?planType=' + planType + '&parklotId=' + parklotId, null).then((res) => {
       if(res.code === 200){
          this.setData({
              price: res.price
          })
       }
     })
  },

  bindCarChange(e){
      this.setData({
        index:e.detail.value,
        carType:this.data.carList[e.detail.value].carType,
        carId:this.data.carList[e.detail.value].carId
      })
  },

  pay(){
      http('/wx/pay/createOrder',{
        carId: this.data.carId,
        carName: this.data.carName,
        carType: this.data.carType,
        idCard: this.data.order.idCard,
        orderCode: this.data.order.orderCode,
        orderType: this.data.orderType == "N" ? "全年" : this.data.orderType == "BN" ? "半年" : "按月",
        parklotId: this.data.parklotList[this.data.index1].parklotId,
        parklotName: this.data.parklotList[this.data.index1].parklotName,
        phonenumber: this.data.order.phonenumber,
        realName: this.data.order.realName,
        userAddress: this.data.order.userAddress,
        villageId: this.data.order.villageId,
        villageName: this.data.order.villageName
      },'post').then((res) => {
          debugger
          if(res.code === 200){
            wx.requestPayment({
              timeStamp: res.order.timeStamp,
              nonceStr: res.order.nonceStr,
              package: res.order.packageValue,
              signType: 'MD5',
              paySign: res.order.paySign,
              success(res) { 
                console.log(res)
                if(res.errMsg == "requestPayment:ok"){
                    
                }
              },
              fail(res) { 
                console.log(res)
              }
            })
          }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.initParklot()
      
      this.setData({
          orderType:options.orderType,
          order:JSON.parse(wx.getStorageSync('order')),
          carList:JSON.parse(wx.getStorageSync('carList')),
          carId:JSON.parse(wx.getStorageSync('order')).carId,
          carName:JSON.parse(wx.getStorageSync('order')).carName,
          carType:JSON.parse(wx.getStorageSync('order')).carType,
      })
      this.getPrice('N',JSON.parse(wx.getStorageSync('order')).parklotId)
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
      this.setData({
        order:{

        }
      })
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
  bindDataHandle: function(event){
      const type = event.currentTarget.dataset.type
      console.log(event)
      if(type){
            this.setData({
              [type]:event.detail.value
            })
      }
  },
  init(){
    
  }
})