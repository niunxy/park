const baseUrl = 'https://24hchw.com/prod-api'
const fetch = function fetch(url, params, type = 'get') {
  return new Promise((resolve, reject) => {
    console.log(wx.getStorageSync('uToken'))
    return wx.request({
      url: `${baseUrl}` + url, //仅为示例，并非真实的接口地址
      data: params,
      method: type,
      header:{
        Authorization:wx.getStorageSync('uToken')
      },
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

module.exports = fetch