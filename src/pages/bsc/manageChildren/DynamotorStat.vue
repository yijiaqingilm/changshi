<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择时间"
                       @click="openDyDatePicker"
                       :value="dyDate">
            </div>
        </div>
        <div class='combo'>
            <base-form-group class="mt-15" label="地址选择：">
                <span class='s-select' @click="showPopup">{{currentAddress}}</span>
            </base-form-group>
            <base-form-group class="mt-15" label="客户选择：">
                <base-select v-model="dyStat.client" text="请选择客户" :data="clientValue"></base-select>
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
    created () {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: 'red'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销2',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
        ]
      }
    },
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
      openDyDatePicker (event) {
        this.dispatchMethod('manage-bsc', 'openDyDatePicker', event)
      },
      openVeDatePicker (event) {
        this.dispatchMethod('manage-bsc', 'openVeDatePicker', event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        dyStat: ({bsc}) => bsc.dyStat,
      }),
      dyDate () {
        return this.dyStat.date && moment(this.dyStat.date).format('YYYY-MM')
      },
      currentAddress () {
        let currentAddress = this.activeAddress.provinceName + this.activeAddress.cityName + this.activeAddress.districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dynamotor.scss";
</style>
