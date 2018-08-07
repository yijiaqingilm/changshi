<template>
    <div class='update-address'>
        <div class='group'>
            <base-form-group class='title' label="发电机存放点" isTitle></base-form-group>
            <base-radio-group v-model="point">
                <base-radio v-for="(info,index) in addressInfo"
                            :label="info.key"
                            name="info"
                            :key="index">
                    {{info.value}}
                </base-radio>
            </base-radio-group>
            <section class='update-address-wrap'>
                <div class='s-select' @click="openOriCityPicker">
                    {{dyInfo.oriAddress || '选择区域'}}
                </div>
                <!-- <div class='s-select'>
                     作业点
                 </div>-->
                <div class='s-select'>
                    请选择存放仓库
                </div>
            </section>
        </div>
        <line-10></line-10>
        <div class='group'>
            <base-form-group class='title' label="发电机最新存放点" isTitle></base-form-group>
            <base-radio-group class='mt-40' v-model="point">
                <base-radio v-for="(info,index) in addressInfo"
                            :label="info.key"
                            name="info"
                            :key="index">
                    {{info.value}}
                </base-radio>
            </base-radio-group>
            <section class='update-address-wrap'>
                <div class='s-select' @click="openNowCityPicker">
                    {{dyInfo.nowAddress || '选择区域'}}
                </div>
                <div class='s-select' v-if="point==addressStatus.static">
                    作业点
                </div>
            </section>
            <f7-block class='group'>
                <f7-button big full active>开始调整/介绍调整</f7-button>
            </f7-block>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'
  import emitter from 'mixins/emitter'
  import { mapState } from 'vuex'

  let addressStatus = {
    store: 0,
    static: 1
  }
  let addressInfo = [
    {key: addressStatus.store, value: '存放仓库'},
    {key: addressStatus.static, value: '固定机油'}
  ]
  export default {
    data () {
      return {
        addressStatus,
        addressInfo,
        point: addressStatus.store,
        adress: ''
      }
    },
    mixins: [emitter],
    methods: {
      openOriCityPicker () {
        this.dispatchMethod('dynamotor', 'openOriCityPicker')
      },
      openNowCityPicker () {
        this.dispatchMethod('dynamotor', 'openNowCityPicker')
      },
    },
    computed: {
      ...mapState({
        dyInfo: ({rm}) => rm.dyInfo
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../../css/updateAddress.scss";
</style>
