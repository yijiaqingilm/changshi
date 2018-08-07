<template>
    <div class='base-form-list-item' :class="{'title':isTitle}">
        <div>{{title}}{{label}}</div>
        <div v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      title: {},
      label: {},
      isTitle: {
        type: Boolean,
        default: false
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseFormListItem.scss";
</style>