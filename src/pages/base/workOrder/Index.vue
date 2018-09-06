<template>
    <f7-page class='work-order'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>我的工单</f7-nav-center>
        </f7-navbar>
        <h-list>
            <h-list-item desc="工单总数" :title="statics.total"></h-list-item>
            <h-list-item desc="未归档工单" :title="statics.unariched"></h-list-item>
            <h-list-item desc="待审核工单" :title="statics.approve"></h-list-item>
            <h-list-item desc="已归档工单" :title="statics.ariched"></h-list-item>
        </h-list>
        <section>
            <tabs-ctrl v-model="workOrderType" @change="showTab">
                <tab v-for="(type,index) in workOrderTypes" :key="index" :title="type.label" :label="type.value"></tab>
            </tabs-ctrl>
            <f7-tabs animated>
                <f7-tab v-for="(type,index) in workOrderTypes"
                        :key="index"
                        :class="{['tab-'+type.value]:true}"
                        :active="workOrderType===type.value">
                    <component :is="'orderTypeView_'+ type.value"></component>
                </f7-tab>
            </f7-tabs>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native, workOrderTypes, workOrderTypeStatus } from 'lib/const'
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import ViewDone from './chilren/WorkOrderDone'
  import ViewReview from './chilren/WorkOrderReview'
  import ViewUndone from './chilren/WorkOrderUndone'
  import { mapState } from 'vuex'

  export default {
    name: 'workOrder',
    data () {
      return {
        workOrderTypes,
        workOrderType: workOrderTypeStatus.undone
      }
    },
    created () {
      this.$store.dispatch({
        type: native.doWorkNumberStatics
      })
    },
    computed: {
      ...mapState({
        statics: ({base}) => base.workNumberStatics
      })
    },
    methods: {
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    components: {
      TabsCtrl,
      Tab,
      [`orderTypeView_${workOrderTypeStatus.done}`]: ViewDone,
      [`orderTypeView_${workOrderTypeStatus.review}`]: ViewReview,
      [`orderTypeView_${workOrderTypeStatus.undone}`]: ViewUndone,
    },
  }
</script>

<style lang="scss" scoped type="text/css">
</style>