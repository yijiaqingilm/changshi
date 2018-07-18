<template>
    <span class="base-icon" :class="'icon-'+iconName">{{label}}</span>
</template>

<script>
  export default {
    props: {
      label: String,
      iconName: String
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
@import "./baseIcon.scss";
</style>