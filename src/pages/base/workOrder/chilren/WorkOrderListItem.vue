<template>
    <div class='list-item' @click="_click">
        <div class='item-ctrl'>
            <div>工单：{{workName}}</div>
            <div>工单号：{{workNo}}</div>
            <div>客户：{{workClient}}</div>
            <div>专业：{{workMajor}}</div>
            <div>作业点：{{workPoint}}</div>
            <div v-if='workCreateTime'>创建时间：{{workCreateTime}}</div>
            <div v-if='workCheckTime'>提交审核时间：{{workCheckTime}}</div>
            <div v-if='workPassTime'>审核归档时间：{{workPassTime}}</div>
            <span class='item-ctrl-gt'></span>
        </div>
        <div class='item-action' v-if="showAction">
            <div>
                <base-icon label="作废" iconName='void'></base-icon>
            </div>
            <div>
                <base-icon label="编辑" iconName='edit'></base-icon>
            </div>
            <div>
                <base-icon label="提交审核" iconName='check'></base-icon>
            </div>
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
      workCreateTime: String,
      workCheckTime: String,
      workPassTime: String
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
    @import "workOrderChilren.scss";
</style>