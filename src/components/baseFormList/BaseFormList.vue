<template>
    <div class='base-form-list'>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    .base-form-list {
        display: flex;
        width: 100%;
        padding: 30px;
        flex-wrap: wrap;
        border-bottom: 1px solid #999999; /*no*/
    }

</style>