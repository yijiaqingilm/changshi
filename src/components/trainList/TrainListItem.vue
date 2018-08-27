<template>
    <div class="list-item">
        <div class='item-panal'>
            <div class='item-title'>
                <div>{{title}}</div>
                <div>{{scope}}分</div>
            </div>
            <div class='item-subtitle'>{{subTitle}}</div>
        </div>
        <line-10></line-10>
    </div>
</template>

<script>
  export default {
    props: {
      title: String,
      scope: [String, Number],
      subTitle: [String, Number]
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "trainListItem.scss";
</style>