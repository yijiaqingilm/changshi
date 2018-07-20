<template>
    <div class='base-question-group'>
        <slot></slot>
        <div class='base-question-add' @click="handleAdd">
            <base-tab label="添加问题" :icon="iconSrc.iconAdd"></base-tab>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BaseTab from 'components/baseTabs/BaseTab.vue'

  let iconAdd = require('../../assets/icon_add.png')
  export default {
    props: {
      questionGroup: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        iconSrc: {
          iconAdd
        }
      }
    },
    methods: {
      handleAdd () {
        this.$emit('handleAdd')
      }
    },
    components: {BaseTab}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseQuestion.scss";
</style>
