<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择开始时间" :value="startTime"
                       @click="openStartTime">
            </div>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择结束时间" :value="endTime"
                       @click="openEndTime">
            </div>
        </div>
        <div class='combo'>
            <base-form-group class="mt-15" label="地址选择：">
                <span class='s-select' @click="showPopup">{{currentAddress}}</span>
            </base-form-group>
            <base-form-group class="mt-15" label="客户选择：">
                <base-select v-model="orderStat.client" text="请选择客户" :data="clientValue"></base-select>
            </base-form-group>
            <base-form-group class="mt-15" label="专业选择:">
                <base-select v-model="orderStat.major" text="请选择专业" :data="majorValue"></base-select>
            </base-form-group>
            <base-form-group class="mt-15" label="站点选择:">
                <base-select v-model="orderStat.client" text="请选择站点" :data="clientValue"></base-select>
            </base-form-group>
        </div>
        <line-10></line-10>
        <chart :options="options"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { majorValue, clientValue } from 'lib/const'
  import emitter from 'mixins/emitter'
  import moment from 'lib/moment'

  export default {
    mixins: [emitter],
    data () {
      return {
        clientValue,
        majorValue,
        options: {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 10,
            top: 20,
            bottom: 20,
            data: ['直接访问1', '邮件营销2', '联盟广告2', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问1'},
                {value: 310, name: '邮件营销1'},
                {value: 234, name: '联盟广告2'},
                {value: 135, name: '视频广告2'},
                {value: 1548, name: '搜索引擎'}
              ],
              /* label: {
                normal: {
                  position: 'inner'
                }
              },*/
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      openStartTime (event) {
        this.dispatchMethod('base-bsc', 'openStartTime', event)
      },
      openEndTime (event) {
        this.dispatchMethod('base-bsc', 'openEndTime', event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        orderStat: ({bsc}) => bsc.orderStat,
      }),
      startTime () {
        return this.orderStat.startDate && moment(this.orderStat.startDate).format('YYYY-MM-DD')
      },
      endTime () {
        return this.orderStat.endDate && moment(this.orderStat.endDate).format('YYYY-MM-DD')
      },
      currentAddress () {
        let currentAddress = this.activeAddress.provinceName + this.activeAddress.cityName + this.activeAddress.districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "orderStat.scss";
</style>
