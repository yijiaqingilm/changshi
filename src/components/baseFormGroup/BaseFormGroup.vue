<template>
    <section class='fo-form-group'>
        <div class="s-label" :class="{title:isTitle}"><span v-if='mark' class="mark">*</span>{{label}}</div>
        <div class="s-item" @click='_click'>
            <slot></slot>
            <template v-if="!$slots.default">
                <div class='s-text'>{{item}}</div>
            </template>
        </div>
    </section>
</template>

<script>
  export default {
    props: {
      label: String,
      isTitle: {
        type: Boolean,
        default: false
      },
      mark: {
        type: Boolean,
        default: false
      },
      item: {}
    },
    methods: {
      _click () {
        this.$emit('click')
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseFormGroup.scss";
</style>