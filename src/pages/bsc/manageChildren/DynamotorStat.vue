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
        <chart :options="options"></chart>
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
    },
    data () {
      return {
        clientValue,
        options: {
          title: {
            text: '堆叠区域图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [

            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },

              data: [820, 932, 901, 934, 1290, 1330, 1320]
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
