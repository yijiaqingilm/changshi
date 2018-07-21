<template>
    <label class='work-order-tab' :class="[{'is-checked':label===model}]">
        {{title}}
        <input type="radio" @change="handleChange" class="base-tab-input" :value="label" v-model="model">
    </label>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      label: {},
      title: {},
      active: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        _parent: null
      }
    },
    methods: {
      handleChange () {
        this.$nextTick(() => {
          this.$emit('input', this.model)
          this.isGroup && this._parent.$emit('input', this.model)
        })
      }
    },
    computed: {
      isGroup () {
        if (this.$parent.$options.componentName === 'BaseTabs') {
          this._parent = this.$parent
          return true
        } else {
          return false
        }
      },
      model: {
        get () {
          return this.isGroup ? this._parent.value : this.value
        },
        set (val) {
          this.$emit('input', val)
          this.isGroup && this._parent.$emit('input', val)
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseTabsCtrl.scss";
</style>
