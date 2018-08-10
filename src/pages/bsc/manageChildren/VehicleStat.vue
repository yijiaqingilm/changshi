<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择时间" :value="veDate"
                       @click="openVeDatePicker">
            </div>
        </div>
        <div class='combo'>
            <base-form-group class="mt-15" label="地址选择：">
                <span class='s-select' @click="showPopup">{{currentAddress}}</span>
            </base-form-group>
            <base-form-group class="mt-15" label="客户选择：">
                <base-select v-model="veStat.client" text="请选择客户" :data="clientValue"></base-select>
            </base-form-group>
        </div>
        <line-10></line-10>
        <chart :options="options"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { clientValue, globalConst as native } from 'lib/const'
  import emitter from 'mixins/emitter'
  import moment from 'lib/moment'

  export default {
    mixins: [emitter],
    data () {
      return {
        clientValue,
        carList: [],
        options: {
          title: {
            text: ''
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
      openVeDatePicker (event) {
        this.dispatchMethod('manage-bsc', 'openVeDatePicker', event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      doStaticsCar () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (!provinceName || !cityName || !districtName || !this.veDate || !this.veStat.client) {
          return
        }
        this.$store.dispatch({
          type: native.doStaticsCar,
          province: provinceName,
          city: cityName,
          district: districtName,
          month: this.veDate,
          client: this.veStat.client
        }).then(({data}) => {
          this.carList = data
          let dataX = []
          let dataY = []
          this.carList.map((row) => {
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
        veStat: ({bsc}) => bsc.veStat,
      }),
      veDate () {
        return this.veStat.date && moment(this.veStat.date).format('YYYY-MM')
      },
      currentAddress () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (provinceName && cityName && districtName) {
          this.doStaticsCar()
        }
        let currentAddress = provinceName + cityName + districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
    /* watch: {
       'veStat': {
         handler (nowClient, oldClient) {
           this.doStaticsCar()
         },
         deep: true
       }
     }*/
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dynamotor.scss";
</style>
