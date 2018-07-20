<template>
    <div class='work-order-tabs'>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      value: {}
    },
    componentName: 'BaseTabs',
    data () {
      return {}
    },
    watch: {
      value (nowValue, oldValue) {
        if (nowValue !== oldValue) {
          this.$emit('change', nowValue)
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseTabsCtrl.scss";
</style>
