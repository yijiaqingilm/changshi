<template>
    <span @click="_click" class="base-icon" :class="'icon-'+iconName">{{label}}</span>
</template>

<script>
  export default {
    props: {
      label: String,
      iconName: String
    },
    name: '',
    methods: {
      _click () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseIcon.scss";
</style>