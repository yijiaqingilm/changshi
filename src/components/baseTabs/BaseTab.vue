<template>
    <div class='base-tab' @click="_click">
        <div class='tab-icon'><img :src="icon" class='icon' alt=""></div>
        <div class='tab-label'>{{label}}</div>
    </div>
</template>

<script>
  export default {
    props: {
      icon: {},
      label: String
    },
    methods: {
      _click () {
        this.$emit('click')
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseTab.scss";
</style>