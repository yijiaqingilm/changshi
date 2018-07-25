export default {
  methods: {
    dispatchMethod (componentName, methodName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName
      while (parent && (name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        console.log('找到了。', parent)
        parent[methodName](params)
      }
    }
  }
}
