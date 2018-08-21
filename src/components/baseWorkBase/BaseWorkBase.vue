<template>
    <div class='base-work-base' v-if="mode===baseWorkMode.base">
        <div class="city">
            <div><span class='s-select' @click="showPopup">{{currentAddress}}</span></div>
        </div>
        <div>
            <base-select v-model="client" text="请选择客户" :data="clientValue"></base-select>
        </div>
        <div v-if='majorValue.length>0'>
            <base-select v-model="major" text="请选择专业" :data="majorValue"></base-select>
        </div>
        <div class='point' v-if="hasWorkBase">
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
    <div class='base-work-base' v-else>
        <base-form-group class="mt-15" label="地址选择：">
            <span class='s-select' @click="showPopup">{{currentAddress}}</span>
        </base-form-group>
        <base-form-group class="mt-15" label="客户选择：">
            <base-select v-model="client" text="请选择客户" :data="clientValue"></base-select>
        </base-form-group>
        <base-form-group v-if='majorValue.length>0' class="mt-15" label="专业选择:">
            <base-select v-model="major" text="请选择专业" :data="majorValue"></base-select>
        </base-form-group>
        <template v-if="hasWorkBase">
            <template v-if='workBaseList && workBaseList.length>0'>
                <base-form-group class="mt-15" label="站点选择:">
                    <base-select v-model='workBase'
                                 text="请选择作业点"
                                 :data="workBaseList"
                                 nodeKey="id"
                                 @change="changePoint"
                                 nodeLabel="work_base"></base-select>
                </base-form-group>
            </template>
            <div v-else class='hint'>
                当前条件没有可选择的作业点
            </div>
        </template>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import {
    globalConst as native,
    clientValue,
    majorValue,
    client as clientObj,
    major as majorObj,
    baseWorkMode
  } from 'lib/const'
  // major=2,client=1
  export default {
    props: {
      mode: {
        type: Number,
        default: baseWorkMode.base
      },
      hasWorkBase: {
        type: Boolean,
        default: true
      }
    },
    name: '',
    data () {
      return {
        baseWorkMode,
        workBaseList: [],
        workBase: '',
        client: '',
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
        let {provinceName, cityName, districtName} = this.activeAddress
        this.$emit('changeWorkBase', {
          workBase: this.workBase, province: provinceName,
          city: cityName,
          district: districtName,
          client: this.client,
          major: this.major
        })
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
        if (!this.client) {
          return []
        }
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
          this.hasWorkBase && this.loadBaseWork()
          this.$emit('changeWorkBase', {
            province: provinceName,
            city: cityName,
            district: districtName,
            client: this.client,
            major: this.major
          })
        }
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "./baseWorkBase.scss";
</style>