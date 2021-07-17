// pages/login/login.js
const api = require('../../api/api.js');

Page({

  /**
   * Page initial data
   */
  data: {
    username:'',
    password:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  bindNameInput:function(event) {
    this.setData({
      username:event.detail.value
    })
  },

  bindPasswordInput:function(event) {
    this.setData({
      password:event.detail.value
    })
  },

  bindLogin:function() {
    api.login({
      username:this.data.username,
      password:this.data.password
    }).then(res => {
      wx.setStorageSync('userInfo', res.data)
      wx.navigateBack()
    })
  },
  bindWechatLogin: function() {
    wx.getSetting({
      success: res => {
        console.log("wx.getSetting:", res)
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log("获取登录信息:",res)
            }          
          })
        } else {
          wx.openSetting({
            success: res=> {
              console.log("openSetting:",res)
            }
          })
        }
      }
    })
    wx.getUserInfo({
      success: res => {
        console.log("获取登录信息",res)
      }
    })
  },

  bindRegister:function() {
    wx.navigateTo({
      url: '/pages/register/register',
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