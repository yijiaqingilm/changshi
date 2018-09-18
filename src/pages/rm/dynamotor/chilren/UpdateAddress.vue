<template>
    <div class='update-address' v-if="dy && dy.code">
        <div class='group'>
            <base-form-group class='title' label="当前发电机存放点" isTitle>
                {{dy.work_base?'固定油机':'仓库'}}
            </base-form-group>
            <base-form-group :label="dy.province+dy.city+dy.district+'('+dy.work_base+')'"></base-form-group>
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
                    {{nowAddressInfo || '选择区域'}}
                </div>
                <div v-if="point==addressStatus.static">
                    <div v-if='workBaseList && workBaseList.length>0'>
                        <div>
                            <base-select v-model='workBase'
                                         text="请选择站点"
                                         :data="workBaseList"
                                         @change="changePoint"
                                         nodeKey="id"
                                         widthAuto
                                         nodeLabel="work_base"></base-select>
                        </div>
                        <div>
                            <div @click="openAutoComplate" class='mt-15'>
                                <input type="text" class='s-input' readonly v-model="workBaseName" placeholder="请搜索站点">
                            </div>
                            <div class='mt-15'>
                                <input class='s-input' placeholder="请从上方选择或搜索站点" type="text" readonly
                                       v-model="workBaseName">
                            </div>
                        </div>
                    </div>
                    <div class='hint' v-else>
                        当前地址没有可选站点
                    </div>
                </div>
            </section>
            <f7-block class='group'>
                <f7-button big full active @click="submit">调整位置</f7-button>
            </f7-block>
        </div>
    </div>
    <f7-block v-else>
        <div class='hint text-center'>请扫描发电机编码</div>
    </f7-block>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'
  import emitter from 'mixins/emitter'
  import { mapState } from 'vuex'
  import { bus } from 'src/main'

  let addressStatus = {
    store: 0,
    static: 1
  }
  let addressInfo = [
    {key: addressStatus.store, value: '存放仓库'},
    {key: addressStatus.static, value: '固定油机'}
  ]
  export default {
    data () {
      return {
        addressStatus,
        addressInfo,
        point: addressStatus.store,
        adress: '',
        workBase: '',
        workBaseName: '',
        workBaseList: [],
      }
    },
    mixins: [emitter],
    created () {
      let {province, city, district} = this.nowAddress
      if (province && city && district) {
        this.loadBaseWork()
      }
      bus.$on('changeNowCity', () => {
        this.loadBaseWork()
      })
      bus.$on('changeSearchValue', (searchValue) => {
        this.workBaseName = searchValue
      })
      bus.$on('autocomplateChange', (value) => {
        this.changePoint(value)
      })
    },
    methods: {
      changePoint (value) {
        this.workBase = value.id
        this.workBaseName = value.work_base
        let {provinceName, cityName, districtName} = this.activeAddress
        this.$emit('changeWorkBase', {
          workBase: this.workBase,
          province: provinceName,
          city: cityName,
          district: districtName,
          client: this.client,
          major: this.major
        })
      },
      openAutoComplate () {
        bus.$emit('openAutoComplate', this.workBaseName, this.getJobPointList)
      },
      submit () {
        if (!this.nowAddressInfo) {
          this.$f7.alert('请选择最新存放地址', modalTitle)
          return
        }
        if (this.point === addressStatus.static && !this.workBase) {
          this.$f7.alert('请选择站点', modalTitle)
          return
        }
        this.$f7.confirm('是否确认调整位置？', modalTitle, () => {
          let {province, city, district} = this.nowAddress
          this.$store.dispatch({
            type: native.doDynamotorUpdate,
            code: this.dy.code,
            province,
            city,
            district,
            work_base: this.workBase
          }).then(() => {
            this.$f7.alert('提交成功', modalTitle)
          }).catch((error) => {
            this.$f7.alert(error, modalTitle)
          })
        })
      },
      openNowCityPicker () {
        if (!this.dyCode) {
          this.$f7.alert('请先扫描发电机编码', modalTitle)
          return
        }
        this.dispatchMethod('dynamotor', 'openNowCityPicker')
      },
      loadBaseWork () {
        let {province, city, district} = this.nowAddress
        if (!province || !city || !district || !this.dyCode) {
          return
        }
        this.$store.dispatch({
          type: native.doWorkBaseDynamotor,
          province,
          city,
          district,
          code: this.dyCode,
        }).then(({data}) => {
          let workBase = data.work_base
          if (workBase && Array.isArray(workBase)) {
            this.workBaseList = workBase
          }
        })
      },
      getJobPointList () {
        let {province, city, district} = this.nowAddress
        if (!province || !city || !district || !this.dyCode) {
          return
        }
        return this.$store.dispatch({
          type: native.doWorkBaseDynamotor,
          province,
          city,
          district,
          code: this.dyCode,
          name: this.workBaseName
        })
      },
    },
    computed: {
      ...mapState({
        dyInfo: ({rm}) => rm.dyInfo,
        dy: ({base}) => base.dy,
        dyCode: ({rm}) => rm.dyCode,
        activeAddress: ({base}) => base.activeAddress,
        nowAddress: ({rm}) => rm.dyInfo.nowAddress
      }),
      nowAddressInfo () {
        let {province, city, district} = this.nowAddress
        return province + city + district
      },
    },
    destroyed () {
      bus.$off('changeNowCity')
      bus.$off('changeSearchValue')
      bus.$off('autocomplateChange')
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../../css/updateAddress.scss";
</style>

