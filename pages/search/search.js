// pages/search/search.js
const api = require('../../api/api.js');
Page({

  /**
   * Page initial data
   */
  data: {
    hotkeyList:[],
    content: "",
    showSearchResult: false,
    searchData: {
      curPage: 0,
      pageCount:0,
      datas: []
    },
    searchHistoryList:[]
  },

  requestHotkey:function() {
    api.hotkey().then(res => {
        this.setData({
          hotkeyList:res.data
        })
    })
  },

  requestSearch: function() {
    let curPage = this.data.searchData.curPage
    api.search(curPage, {
      k:this.data.content
    }).then(res => {
      this.data.searchData.datas.push(...res.data.datas)
      this.data.searchData.curPage = res.data.curPage
      this.data.searchData.pageCount = res.data.pageCount
      if(this.data.searchData.datas.length == 0) {
        wx.showToast({
          title: '没有找到相关数据',
          icon:none
        });
      }
      this.setData( {
        searchData:this.data.searchData,
        showSearchResult: true
      })
    })
    this.saveHistory()
  },

  bindCleanSearchHistory: function() {
    wx.removeStorage({
      key: 'searchHistoryList',
      success: res => {
        this.setData({
          searchHistoryList:[]
        })
      }
    })
  },

  bindClean:function() {
    this.setData({
      content:''
    })
  },

  saveHistory: function() {
    let searchHistoryList = this.data.searchHistoryList;
    searchHistoryList.forEach((item, index) => {
      if(item.name == this.data.content) {
        searchHistoryList.splice(index, 1)
      }
    });
    let history ={};
    history.name = this.data.content;
    searchHistoryList.unshift(history);
    if(searchHistoryList.length > 20) {
      searchHistoryList.splice(20, 1)
    }
    this.setData( {
      searchHistoryList:searchHistoryList
    })
    wx.setStorage({
      key: "searchHistoryList",
      data: searchHistoryList
    })
  },

  bindCancelSearch: function() {
    this.setData({
      showSearchResult:false
    })
  },

  bindInput: function(event) {
    this.setData({
      content: event.detail.value
    })
  },

  bindSearch: function(event) {
    if(this.data.content.length == 0) {
      wx.showToast({
        title: '请输入关键字',
        icon:none
      })
      return;
    }
    this.setData({
      searchData: {
        curPage: 0,
        pageCount:0,
        datas: []
      }
    })
    this.requestSearch()
  
  },

  bindRecord:function(event) {
    this.setData({
      content:event.detail.dataset.content,
      searchData: {
        curPage: 0,
        pageCount:0,
        datas: []
      }
    })
    this.requestSearch()
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.requestHotkey()
    wx.getStorage({
      key:'searchHistoryList',
      success: res=> {
        this.setData({
          searchHistoryList: res.data
        })
      }
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
    if(this.data.showSearchResult) {
      if(this.data.searchData.curPage < this.data.searchData.pageCount) {
        this.requestSearch()
      }
    }
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})