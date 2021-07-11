// components/swiper/swiper.js
Component({
  /**
   * Component properties
   */
  properties: {
    banner:Object
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
    bindBanner:function(event) {
      console.log("点击bindBanner", event)
      let url = event.currentTarget.dataset.url
      wx.navigateTo({
        url: '/pages/web/web?url=' + url,
      })
    }
  }
})
