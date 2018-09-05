<template>
    <div>
        <header><span class="mark">*</span>查询时间</header>
        <div class='time-group'>
            <div>
                <base-date-picker v-model="dyDate" text="请选择时间" :mode="dateType.yearAndMonth"></base-date-picker>
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
            <div class='text-center hint'>暂无数据或者筛选条件后查询数据</div>
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
    created () {
    },
    data () {
      return {
        baseWorkMode,
        dateType,
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
        },
        dyDate: '',
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
        this.doStaticsPower()
      },
      showPopup () {
        bus.$emit('openCityPicker')
      },
      doStaticsPower () {
        let {
          client,
          province,
          city,
          district,
        } = this.query
        if (!this.dyDate || !client) {
          return
        }
        this.$store.dispatch({
          type: native.doStaticsPower,
          province,
          city,
          district,
          month: this.dyDate,
          client
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
      currentAddress () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (provinceName && cityName && districtName) {
          this.doStaticsPower()
        }
        let currentAddress = provinceName + cityName + districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
    components: {BaseWorkBase},
    watch: {
      'dyDate': {
        handler (nowDyDate, oldDyDate) {
          if (nowDyDate && nowDyDate !== oldDyDate) {
            this.doStaticsPower()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dynamotor.scss";
</style>
