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
  import { globalConst as native } from '../lib/const'

  export default {
    data () {
      return {}
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        const {maimengToken, maiyaToken} = this.$route.query
        let {hashUrl = '/home'} = this.$route.query
        const {commit, dispatch} = this.$store
        dispatch({
          type: native.doWechatBind,
          maimengToken,
          maiyaToken
        }).then(async (data) => {
          let {token, userCode} = data.data
          await commit('doAlreadyBind', {token, userCode})
          /* this.$router.load({
            url: hashUrl,
            reload: true
          })*/
          if (hashUrl === '') {
            hashUrl = '/home'
          }
          this.$router.reloadPage(hashUrl)
        }).catch((error) => {
          console.error('绑定失败', error)
        })
      })
    }
  }

</script>
<style lang="scss" scoped type="text/css">
    .loading {
        text-align: center;
    }
</style>
