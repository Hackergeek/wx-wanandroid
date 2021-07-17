// pages/user/user.js
const api = require('../../api/api.js');

Page({

  /**
   * Page initial data
   */
  data: {
    head:"/images/user_head.png",
    userInfo:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  bindLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  bindHead: function() {
    if(!this.data.userInfo) {
      wx.showToast({
        title: '还没登录',
        icon: 'none'
      })
      return
    }
    wx.showActionSheet({
      itemList: ["查看我的头像", "从相册选择上传"],
      success: res=> {
          let index = res.tapIndex;
          if(index == 0) {
            wx.previewImage({
              urls: [this.data.head[0]],
            })
          } else if(index  == 1) {
            wx.chooseImage({
              count: 1,
              sizeType:["compressed"],
              sourceType:["album","camera"],
              success: res=> {
                this.setData({
                  head: res.tempFilePaths
                })
              }
            })
          }
      }
    })
  },

  bindLogout:function() {
    if(!this.data.userInfo) {
      wx.showToast({
        title: '还没登录',
        icon: 'none'
      })
      return
    }
    api.logout().then(res=> {
      wx.removeStorageSync('userInfo')
      wx.removeStorageSync('cookie')
      this.setData({
        userInfo:wx.getStorageSync('userInfo'),
        head: "/images/user_head.png"
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})