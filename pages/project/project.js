// pages/project/project.js
const api = require('../../api/api.js');
Page({

  /**
   * Page initial data
   */
  data: {
    projectList: [],
    category: [],
    swiperIndex: 0,
    scrollWidth:0,
    categoryRect:[],
    scrollLeft:0
  },

  bindSwiperChange: function (event) {
    let index = event.detail.current;
    let item = this.data.categoryRect[index]
    let distance = item.left - (this.data.scrollWidth/2 - item.width/2);
    this.setData({
      swiperIndex: index,
      scrollLeft: distance
    })
    if (this.data.projectList[index].datas.length > 0) {
      return;
    }
    this.requestProjectList()
  },

  requestCategory: function () {
    api.projectCategory().then(res => {
      res.data.forEach((item, index) => {
        this.data.projectList[index] = {
          datas: [],
          curPage: 0,
          pageCount: 0
        }
      })
      this.setData({
        category: res.data,
        projectList: this.data.projectList
      })
      this.requestProjectList()
      this.getSize()
    })
  },

  getSize: function () {
    wx.createSelectorQuery().select('.category').boundingClientRect(rect => {
      this.data.scrollWidth = rect.width;
      console.log("getSize:", rect)
    }).exec()
    wx.createSelectorQuery().selectAll('.category-item').boundingClientRect(rects => {
      rects.forEach(rect=>{
        this.data.categoryRect.push(rect)
      })
    }).exec()
  },

  bindCategory: function (event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      swiperIndex: index
    })
  },

  bindLoadMore: function () {
    let index = this.data.swiperIndex
    if (this.data.projectList[index].curPage < this.data.projectList[index].pageCount) {
      this.requestProjectList()
    }
  },

  requestProjectList: function () {
    let index = this.data.swiperIndex;
    let cid = this.data.category[index].id;
    let curPage = this.data.projectList[index].curPage
    api.projectListData(curPage + 1, {
      cid: cid
    }).then(res => {
      this.data.projectList[index].datas.push(...res.data.datas);
      this.data.projectList[index].curPage = res.data.curPage
      this.data.projectList[index].pageCount = res.data.pageCount
      let key = `projectList[${index}]`
      this.setData({
        [key]: this.data.projectList[index]
      })
    })
  },

  // request
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.requestCategory()
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