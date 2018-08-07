<template>
    <f7-page class='login'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>登录</f7-nav-center>
        </f7-navbar>
        <header class=''>
            <img src="../assets/logo.jpg" class='logo' alt="">
        </header>
        <section class='content'>
            <div><input class='login-user' placeholder='请输入账号' type="text" v-model='user.username'></div>
            <div><input class='login-pwd' placeholder='请输入密码' type="text" v-model='user.password'></div>
        </section>
        <footer>
            <f7-button big full active @click="login" class='login-submit'>登录</f7-button>
        </footer>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'

  export default {
    data () {
      return {
        user: {
          username: 'dfasdafd',
          password: '890675'
        }
      }
    },
    methods: {
      login () {
        this.$store.dispatch({
          type: native.doLogin,
          ...this.user
        }).then(() => {
          this.$router.reloadPage('/home')
        }).catch((error) => {
          this.$f7.alert(error, modalTitle)
        })
      }
    },
    created () {
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
