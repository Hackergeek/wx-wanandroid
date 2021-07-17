// components/project/project.js
Component({
  /**
   * Component properties
   */
  properties: {
    articleList:Object
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    bindArticle:function(event) {
      let url = event.currentTarget.dataset.url
      wx.navigateTo({
        url: '/pages/web/web?url=' + url,
      })
    },
    catchCollect:function() {
      console.log("点击收藏")
    }
  }
})
