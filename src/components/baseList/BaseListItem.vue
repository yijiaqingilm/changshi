<template>
    <div>
        <div class='list-item'>
            <div class='item-ctrl' @click="_click">
                <div>工单：{{workName}}</div>
                <div>工单号：{{workNo}}</div>
                <template v-if="itemType===baseListTypes.workOrder">
                    <div>客户：{{workClient}}</div>
                    <div>专业：{{workMajor}}</div>
                    <div>作业点：{{workPoint}}</div>
                    <div v-if='workCreateTime'>创建时间：{{workCreateTime}}</div>
                    <div v-if='workCheckTime'>提交审核时间：{{workCheckTime}}</div>
                    <div v-if='workPassTime'>审核归档时间：{{workPassTime}}</div>
                </template>
                <template v-if="itemType===baseListTypes.questionOrder">
                    <div>问题数：{{questionCount}}个</div>
                    <div>问题级别：{{questionLevel}}</div>
                </template>
                <span class='item-ctrl-gt'></span>
            </div>
            <div class='item-action' v-if="showAction">
                <template v-if="itemType===baseListTypes.workOrder">
                    <div>
                        <base-icon label="作废" iconName='void'></base-icon>
                    </div>
                    <div>
                        <base-icon label="编辑" iconName='edit'></base-icon>
                    </div>
                    <div>
                        <base-icon label="提交审核" iconName='check'></base-icon>
                    </div>
                </template>
            </div>
        </div>
        <line-10></line-10>
    </div>
</template>
<script>
  import { baseListTypes } from 'lib/const'

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
      workPassTime: String,
      questionCount: String,
      questionLevel: String
    },
    name: '',
    data () {
      return {
        itemType: baseListTypes.workOrder,
        baseListTypes
      }
    },
    created () {
      console.log('获取父元素对象', this.$parent)
      this.itemType = this.$parent.$props.type
    },
    methods: {
      _click () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseList.scss";
</style>