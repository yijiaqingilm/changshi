<template>
    <div class='base-title'>
        <div class='before'></div>
        <div class='center'>{{title}}</div>
        <div class='after'></div>
    </div>
</template>

<script>
  export default {
    props: {
      title: String
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseTitle.scss";
</style>