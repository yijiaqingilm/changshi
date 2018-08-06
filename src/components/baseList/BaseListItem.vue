<template>
    <div>
        <div class='list-item'>
            <div class='item-ctrl' @click="_click">
                <template v-if="itemType===baseListTypes.workOrder">
                    <div>工单：{{workName}}</div>
                    <div>工单号：{{workNo}}</div>
                    <div>客户：{{workClient}}</div>
                    <div>专业：{{workMajor}}</div>
                    <div>类别：{{workSort}}</div>
                    <div>作业点：{{workPoint}}</div>
                    <div v-if='workCreateTime'>创建时间：{{workCreateTime}}</div>
                    <div v-if='workCheckTime'>提交审核时间：{{workCheckTime}}</div>
                    <div v-if='workPassTime'>审核归档时间：{{workPassTime}}</div>
                </template>
                <template v-if="itemType===baseListTypes.questionOrder">
                    <div>工单：{{workName}}</div>
                    <div>工单号：{{workNo}}</div>
                    <div>问题数：{{questionCount}}个</div>
                    <div>问题级别：{{questionLevel}}</div>
                </template>
                <template v-if="itemType===baseListTypes.sysOrder">
                    <div>待审核工单：{{workName}}</div>
                    <div>工单号：{{workNo}}</div>
                    <div>客户：{{workClient}}</div>
                    <div>专业：{{workMajor}}</div>
                    <div>作业点：{{workPoint}}</div>
                </template>
                <template v-if="itemType===baseListTypes.veLogs">
                    <div>记录：{{workName}}</div>
                    <div>车辆信息：{{veInfo}}</div>
                    <div>使用时间：{{veStartTime}}至{{veEndTime}}</div>
                    <div>行驶总路程：{{vePath}}公里</div>
                    <div>总费用：￥{{veTotal}}</div>
                </template>
                <template v-if="itemType===baseListTypes.dyLogs">
                    <div>记录：{{workName}}</div>
                    <div>发电机编号：{{dyCode}}</div>
                    <div>操作：{{dyHandle}}</div>
                    <div>使用时间：{{dyStartTime}} 至{{dyEndTime}}</div>
                    <div>发电时长：{{dyTime}}</div>
                </template>
                <span v-if="hasDetail" class='item-ctrl-gt'></span>
            </div>
            <div class='item-action' v-if="showAction">
                <template v-if="itemType===baseListTypes.workOrder">
                    <div>
                        <base-icon @click="workOrderDel" label="作废" iconName='void'></base-icon>
                    </div>
                    <div>
                        <base-icon @click="workOrderEdit" label="编辑" iconName='edit'></base-icon>
                    </div>
                    <div>
                        <base-icon @click="workOrderApply" label="提交审核" iconName='check'></base-icon>
                    </div>
                </template>
                <template v-if="itemType===baseListTypes.sysOrder">
                    <div class='sys-buttons'>
                        <div>
                            <f7-button color="gray" @click="handleApply(0)">审核不通过</f7-button>
                        </div>
                        <div>
                            <f7-button active full @click="handleApply(1)">审核通过</f7-button>
                        </div>
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
      hasDetail: {
        type: Boolean,
        default: true
      },
      showAction: {
        type: Boolean,
        default: false
      },
      workId: {},
      workName: {},
      workNo: {},
      workClient: {},
      workMajor: {},
      workPoint: {},
      workSort: {},
      workCreateTime: {},
      workCheckTime: {},
      workPassTime: {},
      questionCount: {},
      questionLevel: {},

      veInfo: {},
      veStartTime: {},
      veEndTime: {},
      vePath: {},
      veTotal: {},
      dyCode: {},
      dyHandle: {},
      dyStartTime: {},
      dyEndTime: {},
      dyTime: {}
    },
    name: '',
    data () {
      return {
        itemType: baseListTypes.workOrder,
        baseListTypes
      }
    },
    created () {
      this.itemType = this.$parent.$props.type
    },
    methods: {
      _click () {
        this.$emit('click')
      },
      handleApply (value) {
        value ? this.$emit('apply:pass') : this.$emit('apply:noPass')
      },
      workOrderApply () {
        this.$emit('workOrder:apply')
      },
      workOrderDel () {
        this.$emit('workOrder:del')
      },
      workOrderEdit () {
        this.$emit('workOrder:edit')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseList.scss";
</style>