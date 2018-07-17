<template>
    <div>
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
</style>
