<template>
    <div class='base-tab' @click="_click">
        <div class='tab-icon'><img :src="icon" class='icon' alt=""></div>
        <div class='tab-label'>{{label}}</div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { globalConst as native, modalTitle } from 'lib/const'

  export default {
    props: {
      icon: {},
      label: String,
      link: {}
    },
    methods: {
      _click () {
        if (this.link) {
          console.log('this', this)
          if (!this.sessionKey) {
            this.$f7.alert('请先登录', modalTitle)
            return
          }
          this.$router.loadPage(this.link)
          return
        }
        this.$emit('click')
      }
    },
    name: '',
    computed: {
      ...mapState({
        sessionKey: ({auth}) => auth.sessionKey
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseTab.scss";
</style>