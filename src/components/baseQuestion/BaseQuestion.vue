<template>
    <div class='base-question-group'>
        <div class='base-question'>
            <div class='title'>
                <div>问题1</div>
                <div>
                    <base-icon iconName="del" label="删除"></base-icon>
                </div>
            </div>
            <div class='fo-form-group'>
                <div class='s-label'>遗留问题级别：</div>
                <div class='s-item'>
                    <span class='s-select'>test</span>
                    <input type="hidden">
                </div>
            </div>
            <div>
                <header>遗留问题:</header>
                <div>
                    <textarea class='s-textarea' placeholder='请填写遗留问题内容'></textarea>
                </div>
            </div>
            <div></div>
        </div>
        <div class='base-question-add'>
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
    components: {BaseTab}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseQuestion.scss";
</style>
