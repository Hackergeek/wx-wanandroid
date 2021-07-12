// components/button/button.js
Component({
  /**
   * Component properties
   */
  properties: {
    hotKeyList:Object
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
    bindHotKey:function(event) {
        this.triggerEvent("key", {dataset:event.currentTarget.dataset}, {})
    }
  }
})
