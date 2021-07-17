// components/button/button.js
Component({
  /**
   * Component properties
   */
  properties: {
    hotKeyList:Object,
    isTitle:Boolean
  },

  externalClasses:['hover', 'button-border'],

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
