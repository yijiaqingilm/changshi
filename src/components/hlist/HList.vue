<template>
    <div class="h-list">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .h-list {
        display: flex;
        width: 100%;
        height: 140px;
        align-items: center;
        background-color: #f5f5f5;
        color: #999;
    }
</style>
