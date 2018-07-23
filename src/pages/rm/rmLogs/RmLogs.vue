<template>
    <f7-page class=''>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>记录管理</f7-nav-center>
        </f7-navbar>
        <section>
            <tabs-ctrl v-model="logType" @change="showTab">
                <tab v-for="(type,index) in logTypes" :key="index" :title="type.label" :label="type.value"></tab>
            </tabs-ctrl>
            <f7-tabs animated>
                <f7-tab v-for="(type,index) in logTypes"
                        :key="index"
                        :class="{['tab-'+type.value]:true}"
                        :active="logType===type.value">
                    <keep-alive>
                        <component :is="'logsView_'+ type.value"></component>
                    </keep-alive>
                </f7-tab>
            </f7-tabs>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import DyLogs from './chilren/DynamotorLogs.vue'
  import VeLogs from './chilren/VehicleLogs.vue'
  const logsTypeStatus = {
    dy: 0,
    ve: 1,
  }
  const logTypes = [
    {value: logsTypeStatus.dy, label: '发电机记录'},
    {value: logsTypeStatus.ve, label: '车辆记录'},
  ]
  export default {
    name: 'workOrder',
    data () {
      return {
        logTypes,
        logsTypeStatus,
        logType: logsTypeStatus.dy
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
      TabsCtrl,
      Tab,
      [`logsView_${logsTypeStatus.dy}`]: DyLogs,
      [`logsView_${logsTypeStatus.ve}`]: VeLogs,
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>