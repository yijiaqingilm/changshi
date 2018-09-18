<template>
    <div class='wrap'>
        <section class="list-item" @click="_click">
            <header>{{title}}</header>
            <section class='item-wrap'>
                <div>开卷时间：{{startTime}}</div>
                <div>交卷时间：{{endTime}}</div>
                <div>限时：{{limit}}分钟</div>
            </section>
            <span class="gt"></span>
        </section>
        <line-10></line-10>
    </div>
</template>

<script>
  export default {
    props: {
      title: String,
      startTime: [String, Number],
      endTime: [String, Number],
      limit: [String, Number]
    },
    name: '',
    methods: {
      _click () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "testListItem.scss";
</style>