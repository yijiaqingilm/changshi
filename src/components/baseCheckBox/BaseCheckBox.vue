<template>
    <li>
        <label class="label-checkbox item-content" :class="{'no-border':noBorder}">
            <!-- Checked by default -->
            <input v-model="model" type="checkbox" @change="handleChange" :disabled="disabled" :name="name"
                   :value="label">
            <div class="item-media">
                <i class="icon icon-form-checkbox"></i>
            </div>
            <div class="item-inner">
                <div class="item-title">{{title}}</div>
            </div>
        </label>
    </li>
</template>

<script>
  export default {
    props: {
      value: {},
      title: [String, Number],
      label: [String, Number, Boolean],
      name: [String, Number],
      noBorder: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    name: '',
    data () {
      return {
        _checkboxGroup: null
      }
    },
    created () {
    },
    computed: {
      isGroup () {
        if (this.$parent.$options.componentName === 'baseCheckBoxGroup') {
          this._checkboxGroup = this.$parent
          return true
        } else {
          return false
        }

      },
      model: {
        get () {
          return this.isGroup ? this._checkboxGroup.value : this.value
        },
        set (val) {
          if (this.isGroup) {
            this._checkboxGroup.$emit('input', val)
          } else {
            this.$emit('input', val)
          }
        }
      }
    },
    methods: {
      handleChange () {
        this.$emit('input', this.model)
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>