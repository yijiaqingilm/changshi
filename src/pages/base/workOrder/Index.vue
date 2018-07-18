<template>
    <f7-page class='work-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>我的工单</f7-nav-center>
        </f7-navbar>
        <h-list>
            <h-list-item desc="工单总数" title="263"></h-list-item>
            <h-list-item desc="未归档工单" title="263"></h-list-item>
            <h-list-item desc="待审核工单" title="263"></h-list-item>
            <h-list-item desc="已归档工单" title="263"></h-list-item>
        </h-list>
        <section>
            <tabs v-model="workOrderType" @change="showTab">
                <tab v-for="(type,index) in workOrderTypes" :key="index" :title="type.value" :label="type.key"></tab>
            </tabs>
            <f7-tabs animated>
                <f7-tab v-for="(type,index) in workOrderTypes"
                        :key="index"
                        :class="{['tab-'+type.key]:true}"
                        :active="workOrderType===type.key">
                    <component :is="'orderTypeView_'+ type.key"></component>
                </f7-tab>
            </f7-tabs>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native, workOrderTypes, workOrderTypeStatus } from 'lib/const'
  import HList from './chilren/HList.vue'
  import HListItem from './chilren/HListItem.vue'
  import Tabs from './chilren/WorkOrderTabs'
  import Tab from './chilren/WorkOrderTab'
  import ViewDone from './chilren/WorkOrderDone'
  import ViewReview from './chilren/WorkOrderReview'
  import ViewUndone from './chilren/WorkOrderUndone'

  export default {
    name: 'workOrder',
    data () {
      return {
        workOrderTypes,
        workOrderType: workOrderTypeStatus.undone
      }
    },
    created () {
    },
    computed: {},
    methods: {
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    components: {
      HList,
      HListItem,
      Tabs,
      Tab,
      [`orderTypeView_${workOrderTypeStatus.done}`]: ViewDone,
      [`orderTypeView_${workOrderTypeStatus.review}`]: ViewReview,
      [`orderTypeView_${workOrderTypeStatus.undone}`]: ViewUndone,
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>