// components/bar/bar.js
Component({
  /**
   * Component properties
   */
  properties: {
    barInfo:  {
      type:Object,
      value:null,
      observer : function(newValue, oldValue) {
        console.log("监听数据改变：",newValue, oldValue)
      }
    }
  },

  externalClasses: ['barclass'],

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    bindSearch:function() {
      this.triggerEvent("Search", {name:"skyward"}, {});
    },
    test:function() {
      console.log("通过对象调用")
    }
  },
})
