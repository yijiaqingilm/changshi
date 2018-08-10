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
        <chart :options="options" v-if="dyList && dyList.length>0"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { clientValue, globalConst as native } from 'lib/const'
  import emitter from 'mixins/emitter'
  import moment from 'lib/moment'

  export default {
    mixins: [emitter],
    created () {
    },
    data () {
      return {
        dyList: [],
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
            data: []
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
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [

            {
              name: '使用次数',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },

              data: []
            }
          ]
        }

      }
    },
    methods: {
      openDyDatePicker (event) {
        this.dispatchMethod('manage-bsc', 'openDyDatePicker', event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      doStaticsPower () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (!provinceName || !cityName || !districtName || !this.dyDate || !this.dyStat.client) {
          return
        }
        this.$store.dispatch({
          type: native.doStaticsPower,
          province: provinceName,
          city: cityName,
          district: districtName,
          month: this.dyDate,
          client: this.dyStat.client
        }).then(({data}) => {
          this.dyList = data
          let dataX = []
          let dataY = []
          this.dyList.map((row) => {
            dataX.push(row.day)
            dataY.push(row.use_num)
          })
          this.options.xAxis[0].data = dataX
          this.options.series[0].data = dataY
        })
      }
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
        let {provinceName, cityName, districtName} = this.activeAddress
        if (provinceName && cityName && districtName) {
          this.doStaticsPower()
        }
        let currentAddress = provinceName + cityName + districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
    /* watch: {
      'dyStat': {
        handler (nowClient, oldClient) {
          this.doStaticsPower()
        },
        deep: true
      }
    }*/
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dynamotor.scss";
</style>
