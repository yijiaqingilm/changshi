<template>
    <div class='base-question-group'>
        <slot></slot>
        <footer>
            <base-tabs>
                <base-tab label="添加电表" @click="addAmmeter" :icon="iconSrc.iconAdd"></base-tab>
            </base-tabs>
        </footer>
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
      },
      addAmmeter () {
        this.$emit('addAmmeter')
      }
    },
    components: {BaseTab}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseAmmeter.scss";
</style>
