<template>
    <div class='h-list-item'>
        <div v-if="!$slots.title">
            {{title}}
        </div>
        <slot v-else name="title"></slot>
        <div v-if="!$slots.desc">{{desc}}</div>
        <slot v-else name="desc"></slot>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String,
      desc: String
    },
    data () {
      return {}
    },
    created(){
      console.log('created', this.$slots.title)
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./workOrderChilren.scss";
</style>
