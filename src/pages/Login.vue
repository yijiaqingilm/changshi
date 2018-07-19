<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-center>登陆</f7-nav-center>
        </f7-navbar>
        <f7-block class="text-center">
            <input type="text" v-model='user.username'>
            <input type="text" v-model='user.password'>
            <f7-button @click="login">提交</f7-button>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'
  export default {
    data () {
      return {
        user: {
          username: 'dfasdafd',
          password: '123456'
        }
      }
    },
    methods: {
      login(){
        this.$store.dispatch({
          type: native.doLogin,
          ...this.user
        }).then(() => {
          this.$router.loadPage('/home')
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
