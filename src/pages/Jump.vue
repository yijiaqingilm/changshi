<template>
    <f7-page>
        <f7-block class="loading">
            <f7-preloader size="20px"></f7-preloader>
            <br>
            <div>加载中</div>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        const {token, dobind, hashUrl, userCode} = this.$route.query
        const {commit} = this.$store
        if (!token) {
          this.$router.reloadPage(`/error?message=${encodeURIComponent('无效的访问来源，请从微信菜单进入')}`)
          return
        }
        // 需要绑定
        if (dobind && JSON.parse(dobind)) {
          let [baseUrl, hUrl] = bindUrl.split('#')
          let state = {type: 'dobind', maimengToken: userCode, hashUrl}
          location.replace(baseUrl + '&state=' + encodeURIComponent(JSON.stringify(state)) + '#' + hUrl)
          return
        }
        commit('doAlreadyBind', {token, userCode})
        if (!hashUrl) {
          this.$router.reloadPage('/home')
        } else {
          this.$router.load({
            url: hashUrl,
            reload: true
          })
        }
      })
    }
  }

</script>
<style lang="scss" scoped type="text/css">
    .loading {
        text-align: center;
    }
</style>
