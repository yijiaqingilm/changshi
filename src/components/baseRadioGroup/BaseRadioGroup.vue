<template>
    <div class="base-radio-group " :class="{'between':between}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      between: {
        type: Boolean,
        default: false
      },
      value: {}
    },
    componentName: 'baseRadioGroup',
    name: 'base-radio-group'
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseRadio.scss";
</style>