const fetch = function fetch(url, params, type = 'get') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: params,
      method: type,
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

module.exports = fetch