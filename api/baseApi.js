let request = function(method, url, params) {
  return new Promise(function(resovle, reject) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: 'https://www.wanandroid.com' + url,
      method: method,
      data: params,
      header:{
        'content-type':'application/x-www-form-urlencoded',
        cookie:wx.getStorageSync('cookie')
      },
      success: function(res) {
        if(res.data.errorCode == 0) {
          if(url == "/user/login" || url == "/user/register") {
            wx.setStorageSync('cookie', res.header['Set-Cookie']);
          }
          console.log("接口：" +url, '参数：' + params, "\n返回值：" + res);
          wx.hideLoading();
          resovle(res.data);
        } else {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 2000
          });
          reject(res.data);
        }
      },
      fail: function(err) {
        wx.hideLoading();
        wx.showToast({
          title: '服务连接异常',
          icon: 'none',
          duration: 2000
        });
        reject(err);
      }
    });
  });
}

module.exports = {
  request
}