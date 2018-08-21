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
            <div><input class='login-pwd' placeholder='请输入密码' type="password" v-model='user.password'></div>
        </section>
        <footer>
            <f7-button big full active @click="login" class='login-submit'>登录</f7-button>
        </footer>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'
  import { Validator } from 'lib/custom_validator'
  import { LocalCache } from 'lib/utils'

  export default {
    data () {
      return {
        user: {
          username: 'adddd',
          password: '123456'
        },
        errors: null,
        validator: null,
      }
    },
    methods: {
      login () {
        let {username, password} = this.user
        this.validator.validateAll({
          username,
          password,
        })
        //  校验信息
        if (this.errors.errors.length > 0) {
          this.$f7.alert(this.errors.errors[0].msg, modalTitle)
          return
        }
        this.$store.dispatch({
          type: native.doLogin,
          username,
          password
        }).then(() => {
          LocalCache.set('username', username)
          LocalCache.set('password', password)
          this.$router.reloadPage('/home')
        }).catch((error) => {
          this.$f7.alert(error, modalTitle)
        })
      }
    },
    created () {
      this.user.username = LocalCache.get('username')
      this.user.password = LocalCache.get('password')
      this.validator = new Validator({
        username: 'required',
        password: 'required',
      })
      this.$set(this, 'errors', this.validator.errorBag)
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
