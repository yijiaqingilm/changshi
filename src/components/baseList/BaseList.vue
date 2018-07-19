<template>
    <div class='list'>
        <slot></slot>
    </div>
</template>

<script>
  import { baseListTypes } from 'lib/const'

  export default {
    props: {
      type: {
        type: Number,
        default: function () {
          return baseListTypes.workOrder
        }
      }
    },
    name: 'BaseList',
    componentName: 'BaseList'
  }
</script>

<style lang="scss" scoped type="text/css">
</style>