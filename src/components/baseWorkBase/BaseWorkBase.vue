<template>
    <div class='base-work-base'>
        <div class="city">
            <div><span class='s-select' @click="showPopup">{{currentAddress}}</span></div>
        </div>
        <div>
            <base-select v-model="client" text="请选择客户" :data="clientValue"></base-select>
        </div>
        <div>
            <base-select v-model="major" text="请选择专业" :data="majorValue"></base-select>
        </div>
        <div class='point'>
            <template v-if='workBaseList && workBaseList.length>0'>
                <base-select v-model='workBase'
                             text="请选择作业点"
                             :data="workBaseList"
                             nodeKey="id"
                             @change="changePoint"
                             nodeLabel="work_base"></base-select>
            </template>
            <div v-else class='hint'>
                当前条件没有可选择的作业点
            </div>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { globalConst as native, clientValue, majorValue, client as clientObj, major as majorObj } from 'lib/const'
  // major=2,client=1
  export default {
    name: '',
    data () {
      return {
        workBaseList: [],
        workBase: '',
        client: clientObj.mobile,
        major: '',
        clientValue,
      }
    },
    methods: {
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      changePoint (value) {
        this.jobPoint = value.displayValue
        this.$emit('changeWorkBase', {workBase: this.workBase})
      },
      loadBaseWork () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (!provinceName || !cityName || !districtName || !this.client || !this.major) {
          return
        }
        this.$store.dispatch({
          type: native.doGetWorkBase,
          province: provinceName,
          city: cityName,
          district: districtName,
          client: this.client,
          major: this.major,
        }).then((data) => {
          let workBase = data.data.work_base
          if (workBase && Array.isArray(workBase)) {
            this.workBaseList = workBase
          }
        })
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
      }),
      majorValue () {
        /*
          * 客户移动、联通、电信分别对应1线路，2基站，3铁塔，4集团专线，5室分及WLAN，然后
          * 铁塔对应3铁塔、5室分及WLAN、6机房及动力配套
          * */
        let {xianlu, jizhan, ironTower, jtzx, wlan, jf} = majorObj
        switch (this.client) {
          case clientObj.mobile:
          case clientObj.unicorn:
          case clientObj.telecom:
            return majorValue.filter(({value}) => value !== jf)
          case clientObj.ironTower:
            return majorValue.filter(({value}) => value === ironTower || value === wlan || value === jf)
        }
      },
      currentAddress () {
        let {provinceName, cityName, districtName} = this.activeAddress
        let currentAddress = provinceName + cityName + districtName
        if (provinceName && cityName && districtName) {
          this.loadBaseWork()
        }
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseWorkBase.scss";
</style>