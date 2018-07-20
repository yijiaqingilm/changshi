<template>
    <f7-page class='home'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>发电机管理</f7-nav-center>
        </f7-navbar>
        <tabs-ctrl v-model="ammeterType" @change="showTab">
            <tab v-for="(type,index) in ammeterTypes" :key="index" :title="type.value" :label="type.key"></tab>
        </tabs-ctrl>
        <f7-tabs animated>
            <f7-tab v-for="(type,index) in ammeterTypes"
                    :key="index"
                    :class="{['tab-'+type.key]:true}"
                    :active="ammeterType===type.key">
                <component :is="'ammeterView_'+ type.key"></component>
            </f7-tab>
        </f7-tabs>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import UpdateAddress from './chilren/UpdateAddress.vue'
  import UpdateStatus from './chilren/UpdateStatus.vue'
  const ammeterTypesStatus = {
    updateAddress: 0,
    updateStatus: 1
  }
  const ammeterTypes = [
    {key: ammeterTypesStatus.updateAddress, value: '修订地址'},
    {key: ammeterTypesStatus.updateStatus, value: '变更状态'},
  ]
  export default {
    data () {
      return {
        ammeterTypes,
        ammeterType: ammeterTypesStatus.updateAddress
      }
    },
    methods: {
      showTab(value){
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    components: {
      TabsCtrl,
      Tab,
      [`ammeterView_${ammeterTypesStatus.updateAddress}`]: UpdateAddress,
      [`ammeterView_${ammeterTypesStatus.updateStatus}`]: UpdateStatus
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>
