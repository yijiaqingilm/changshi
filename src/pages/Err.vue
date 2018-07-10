<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-center>错误</f7-nav-center>
        </f7-navbar>
        <f7-block class="text-center">
            <div><i class="icon-jmui icon-jmui-error"></i></div>
            <div>{{msg}}</div>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msg: '无效的访问页面'
      }
    },
    created () {
      if (this.$route.query && this.$route.query.message) {
        this.msg = this.$route.query.message
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
