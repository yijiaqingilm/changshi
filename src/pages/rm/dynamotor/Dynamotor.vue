<template>
    <f7-page class='home'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>发电机管理</f7-nav-center>
        </f7-navbar>
        <base-form-group class="title" label="发电机编码" isTitle>
            <input type="text" v-model="dyCode" readonly @click="scanDynamotor" placeholder='请扫描' class='s-scan'>
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
            <city-select @cityInfo="cityInfo" ref="citySelect"></city-select>
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
        isOri: true,
        dyCode: ''
      }
    },
    methods: {
      getDy (code) {
        this.$store.dispatch({
          type: native.doGetDynamotor,
          code
        }).then(({data}) => {
          console.log('data', data)
          bus.$emit('changeDyStatus', data.status)
        }).catch((err) => {
          this.$f7.alert(err, modalTitle)
        })
      },
      scanDynamotor () {
        if (__DEBUG__) {
          this.dyCode = 'rewrwrwr'
          this.getDy(this.dyCode)
        } else {
          // 扫一扫功能
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              // 扫完 回调 得到二维码
              this.dyCode = result
              this.getDy(result)
            }
          })
        }
      },
      cityInfo (cityInfo) {
        if (this.isOri) {
          this.dyInfo.oriAddress = cityInfo
        } else {
          this.dyInfo.nowAddress = cityInfo
        }
      },
      openNowCityPicker () {
        this.isOri = false
        this.$refs.citySelect.open()
      },
      openOriCityPicker () {
        this.isOri = true
        this.$refs.citySelect.open()
      },
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    computed: {
      ...mapState({
        dyInfo: ({rm}) => rm.dyInfo
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
