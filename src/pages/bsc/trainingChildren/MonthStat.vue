<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择时间" :value="monthDate"
                       @click="openMonthDatePicker">
            </div>
        </div>
        <div class='combo'>
            <base-form-group class="mt-15" label="地址选择：">
                <span class='s-select' @click="showPopup">{{currentAddress}}</span>
            </base-form-group>
            <base-form-group class="mt-15" label="客户选择：">
                <base-select v-model="trainMonthStat.client" text="请选择客户" :data="clientValue"></base-select>
            </base-form-group>
        </div>
        <line-10></line-10>
        <chart :options="polar"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { clientValue } from 'lib/const'
  import emitter from 'mixins/emitter'
  import moment from 'lib/moment'

  export default {
    mixins: [emitter],
    data () {
      return {
        clientValue,
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
      openMonthDatePicker (event) {
        this.dispatchMethod('training-bsc', 'openMonthDatePicker', event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        trainMonthStat: ({bsc}) => bsc.trainMonthStat,
      }),
      monthDate () {
        return this.trainMonthStat.date && moment(this.trainMonthStat.date).format('YYYY-MM')
      },
      currentAddress () {
        let currentAddress = this.activeAddress.provinceName + this.activeAddress.cityName + this.activeAddress.districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dayStat.scss";
</style>
