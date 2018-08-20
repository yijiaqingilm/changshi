<template>
    <f7-page class='home'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>发电机管理</f7-nav-center>
        </f7-navbar>
        <base-form-group class="title" label="发电机编码" isTitle>
            <scan-input v-model="dyCode" @scan="scanDynamotor" placeholder="请扫描或输入编号"></scan-input>
        </base-form-group>
        <line-10></line-10>
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
        <div slot="fixed">
            <city-select @cityInfo="cityInfo"
                         :provinceId="provinceId"
                         :cityId="cityId"
                         :districtId="districtId"
                         ref="citySelect">
            </city-select>
        </div>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import UpdateAddress from './chilren/UpdateAddress.vue'
  import UpdateStatus from './chilren/UpdateStatus.vue'
  import CitySelect from 'components/baseCitySelect/CitySelect'
  import { modalTitle, globalConst as native } from 'lib/const'
  import { bus } from 'src/main'
  import { wxScanQRCode } from 'lib/utils'

  const ammeterTypesStatus = {
    updateAddress: 0,
    updateStatus: 1
  }
  const ammeterTypes = [
    {key: ammeterTypesStatus.updateAddress, value: '修订地址'},
    {key: ammeterTypesStatus.updateStatus, value: '变更状态'},
  ]
  export default {
    componentName: 'dynamotor',
    data () {
      return {
        ammeterTypes,
        ammeterType: ammeterTypesStatus.updateAddress,
        provinceId: '',
        cityId: '',
        districtId: ''
      }
    },
    methods: {
      getDy (code) {
        this.$store.state.rm.dyCode = code
        this.$store.dispatch({
          type: native.doGetDynamotor,
          code
        }).catch((err) => {
          this.$store.commit(native.clearDy)
          this.$f7.alert(err, modalTitle)
        })
      },
      scanDynamotor (code) {
        if (__DEBUG__) {
          code = '12345'
        }
        this.getDy(code)
      },
      cityInfo (cityInfo) {
        this.$store.commit(native.changeDyAddress, cityInfo)
      },
      openNowCityPicker () {
        this.$refs.citySelect.open()
      },
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    computed: {
      ...mapState({
        dyInfo: ({rm}) => rm.dyInfo,
        dyCode: ({rm}) => rm.dyCode
      })
    },
    components: {
      CitySelect,
      TabsCtrl,
      Tab,
      [`ammeterView_${ammeterTypesStatus.updateAddress}`]: UpdateAddress,
      [`ammeterView_${ammeterTypesStatus.updateStatus}`]: UpdateStatus
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .title {
        margin: 40px 30px;
    }

    .update-address-wrap {
        padding: 0 30px;
    }

    .base-radio-group {
        padding: 0 30px;
    }
</style>
