<template>
    <div class='list-item' @click="_click">
        <div class='item-ctrl'>
            <div>工单：{{workName}}</div>
            <div>工单号：{{workNo}}</div>
            <div>客户：{{workClient}}</div>
            <div>专业：{{workMajor}}</div>
            <div>作业点：{{workPoint}}</div>
        </div>
        <div class='item-action' v-if="showAction">
            <div>作废</div>
            <div>编辑</div>
            <div>提交审核</div>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      showAction: {
        type: Boolean,
        default: false
      },
      workId: {},
      workName: String,
      workNo: String,
      workClient: String,
      workMajor: String,
      workPoint: String,
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

</style>