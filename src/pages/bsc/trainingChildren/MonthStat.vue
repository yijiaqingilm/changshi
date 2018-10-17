<template>
    <div>
        <header><span class="mark">*</span>查询时间</header>
        <div class='time-group'>
            <div>
                <base-date-picker v-model="dayDate" text="请选择开始时间"
                                  :mode="dateType.yearAndMonth"></base-date-picker>
            </div>
        </div>
        <div class='combo'>
            <base-work-base :hasClient="false" :hasWorkBase="false" :hasMajor="false" @changeWorkBase="changeWorkBase"
                            :mode="baseWorkMode.list"></base-work-base>
        </div>
        <line-10></line-10>
        <chart :options="options"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { clientValue, dateType, baseWorkMode, globalConst as native } from 'lib/const'
  import emitter from 'mixins/emitter'
  import { bus } from 'src/main'
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'
  import { pluckArray } from 'lib/utils'

  export default {
    mixins: [emitter],
    created () {
    },
    data () {
      let options = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['在职人数', '练习人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '在职人数',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '练习人数',
            type: 'line',
            stack: '总量',
            data: []
          },
        ]
      }

      return {
        baseWorkMode,
        dateType,
        clientValue,
        dayDate: '',
        options,
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
      showPopup () {
        bus.$emit('openCityPicker')
      },
      changeWorkBase (result) {
        this.query = result
        this.doStatics()
      },
      doStatics () {
        let {
          province,
          city,
          district,
        } = this.query
        if (!this.dayDate) {
          return
        }
        this.$store.dispatch({
          type: native.doTrainSubjectTrainMonth,
          province,
          city,
          district,
          month: this.dayDate
        }).then(({data}) => {
          let days = pluckArray(data, 'day')
          let onjobs = pluckArray(data, 'onjob')
          let amounts = pluckArray(data, 'amount')
          let rates = pluckArray(data, 'rate')
          this.options.xAxis.data = days
          this.options.series[0].data = onjobs
          this.options.series[1].data = amounts
        })
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        trainDayStat: ({bsc}) => bsc.trainDayStat,
      }),
      currentAddress () {
        let currentAddress = this.activeAddress.provinceName + this.activeAddress.cityName + this.activeAddress.districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
    components: {BaseWorkBase},
    watch: {
      'dayDate': {
        handler: function (nowDayDate, oldDayDate) {
          if (nowDayDate && nowDayDate !== oldDayDate) {
            this.doStatics()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "dayStat.scss";
</style>
