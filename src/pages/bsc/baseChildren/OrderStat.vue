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
        <chart :options="polar"></chart>
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
        polar: {
          title: {
            text: '工单统计',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}个 ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['已归档工单', '未归档工单', '待审核工单']
          },
          series: [
            {
              name: '工单统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '已归档工单'},
                {value: 310, name: '未归档工单'},
                {value: 234, name: '待审核工单'},
              ],
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
