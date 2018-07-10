<template>
    <f7-block class="err text-center ">
        <div v-if="iconName!==''">
            <span class="iconfont iconfont-big" :class="iconNameValue"></span>
        </div>
        <div class="msg">{{msg}}</div>
        <div v-if="showRefresh">
            <f7-button active @click="onRefresh">刷新</f7-button>
        </div>
    </f7-block>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: {
      msg: {
        type: String,
        default: '遭遇系统异常，请重试'
      },
      showRefresh: {
        type: Boolean,
        default: true
      },
      iconName: {
        type: String,
        default: ''
      }
    },
    created () {
    },
    methods: {
      onRefresh () {
        this.$emit('onRefresh')
      }
    },
    computed: {
      iconNameValue () {
        if (this.iconName === '') {
          return
        }
        return {[`icon-${this.iconName}`]: true}
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "./errorPanel.scss";
</style>
