// pages/register/register.js
const api = require('../../api/api.js');

Page({

  /**
   * Page initial data
   */
  data: {
    username:'',
    password:'',
    repassword:''
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
  bindPwdInput:function(event) {
    this.setData({
      password:event.detail.value
    })
  },
  bindRePwdInput:function(event) {
    this.setData({
      repassword:event.detail.value
    })
  },

  bindRegister: function() {
    api.register({
      username:this.data.username,
      password:this.data.password,
      repassword:this.data.repassword
    }).then(res => {
      wx.setStorageSync('userInfo', res.data)
      wx.navigateBack({
        delta: 2,
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