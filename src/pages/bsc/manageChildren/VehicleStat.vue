<template>
    <div>
        <header><span class="mark">*</span>查询时间</header>
        <div class='time-group'>
            <div>
                <base-date-picker v-model="veDate" text="请选择时间"
                                  :mode="dateType.yearAndMonth"></base-date-picker>
            </div>
        </div>
        <div class='combo'>
            <base-work-base :hasWorkBase="false" :hasMajor="false"
                            @changeWorkBase="changeWorkBase"
                            :mode="baseWorkMode.list"></base-work-base>
        </div>
        <line-10></line-10>
        <template v-if="options.series[0].data.length>0">
            <chart :options="options"></chart>
        </template>
        <template v-else>
            <div class='text-center hint'>请筛选条件后查询数据</div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { clientValue, globalConst as native, dateType, baseWorkMode } from 'lib/const'
  import emitter from 'mixins/emitter'
  import { bus } from 'src/main'
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'

  export default {
    mixins: [emitter],
    data () {
      return {
        baseWorkMode,
        dateType,
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
        },
        veDate: '',
        query: {
          workBase: '',
          client: '',
          province: '',
          city: '',
          district: '',
          major: ''
        }
      }
    },
    methods: {
      changeWorkBase (result) {
        this.query = result
        this.doStaticsCar()
      },
      showPopup () {
        bus.$emit('openCityPicker')
      },
      doStaticsCar () {
        let {
          client,
          province,
          city,
          district,
        } = this.query
        if (!this.veDate || !client) {
          return
        }
        this.$store.dispatch({
          type: native.doStaticsCar,
          province,
          city,
          district,
          month: this.veDate,
          client
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
      currentAddress () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (provinceName && cityName && districtName) {
          this.doStaticsCar()
        }
        let currentAddress = provinceName + cityName + districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
    components: {BaseWorkBase},
    watch: {
      'veDate': {
        handler (nowVeDate, oldVeDate) {
          if (nowVeDate && nowVeDate !== oldVeDate) {
            this.doStaticsCar()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dynamotor.scss";
</style>
