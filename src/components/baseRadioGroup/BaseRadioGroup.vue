<template>
    <div class="base-radio-group">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      value: {}
    },
    componentName: 'baseRadioGroup',
    name: 'base-radio-group'
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseRadio.scss";
</style>