<template>
    <div class='base-tab' @click="_click">
        <div class='tab-icon'>
            <img :src="icon" class='icon' alt="">
            <f7-badge v-if="badge" color="red" class="base-tab-badge">{{badge}}</f7-badge>
        </div>
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
      link: {},
      badge: {
        type: [Number, String],
        default: 0
      }
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