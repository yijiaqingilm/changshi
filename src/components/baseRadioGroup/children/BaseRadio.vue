<template>
    <label class='base-radio' :class="[{'is-checked':model===label}]">
        <div class='base-radio-label'>
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </div>
        <input type="radio" v-model="model" :value="label" :name="name" @change="handleChange"
               class="base-radio_original">
    </label>
</template>

<script>
  export default {
    props: {
      value: {},
      name: {
        type: String
      },
      label: {}
    },
    data () {
      return {
        _radioGroup: null
      }
    },
    computed: {
      isGroup () {
        if (this.$parent.$options.componentName === 'baseRadioGroup') {
          this._radioGroup = this.$parent
          return true
        } else {
          return false
        }

      },
      model: {
        get () {
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set (val) {
          if (this.isGroup) {
            this._radioGroup.$emit('input', val)
          } else {
            this.$emit('input', val)
          }
        }
      }
    },
    methods: {
      handleChange () {
        this.$nextTick(() => {
          this.$emit('input', this.model)
          this.isGroup && this._radioGroup.$emit('input', this.model)
        })
      }
    },
    name: 'baseRadio'
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../baseRadio.scss";
</style>