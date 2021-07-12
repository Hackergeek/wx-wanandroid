// pages/navi/navi.js

const api = require('../../api/api.js');
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    naviData:[],
    selectIndex:0,
    toIndex: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.requestNavi()
  },

  requestNavi:function() {
    api.navi().then(res=> {
      this.data.naviData = res.data;
      api.friend().then(res => {
        let list = [];
        res.data.forEach(item=> {
          list.push( {
            link: item.link,
            title: item.name
          })
        })
        this.data.naviData.unshift({
          articles:list,
          name:"热门网站"
        })
        this.setData({
          naviData:this.data.naviData
        })
      })
    })
  },

  bindName: function(event) {
    console.log(event)
    let index = event.currentTarget.dataset.index;
    let toIndex = '';
    if(index >= 4) {
      toIndex  = `to${index - 4}`;
    }
    this.setData({
      selectIndex:index,
      toIndex:toIndex
    });
  },

  bindTitle:function(event) {
    let link = event.detail.dataset.link;
    wx.navigateTo({
      url: '/pages/web/web?url=' + link,
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