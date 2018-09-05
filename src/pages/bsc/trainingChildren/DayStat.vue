<template>
    <div>
        <header><span class="mark">*</span>查询时间</header>
        <div class='time-group'>
            <div>
                <base-date-picker v-model="dayDate" text="请选择开始时间"
                                  :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>
        </div>
        <div class='combo'>
            <base-work-base :hasWorkBase="false" :hasMajor="false" @changeWorkBase="changeWorkBase"
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

  export default {
    mixins: [emitter],
    created () {
    },
    data () {
      let options = {
        title: {
          text: '在线培训日统计图',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['在线答题', '视频培训', '考试']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['人数', '次数']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        color: ['#6dc394', '#dec562', '#ee8787'],
        series: [
          {
            name: '在线答题',
            type: 'bar',
            data: [1, 2],
          },
          {
            name: '视频培训',
            type: 'bar',
            data: [4, 5],
          },
          {
            name: '考试',
            type: 'bar',
            data: [7, 8],
          }
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
          client,
          province,
          city,
          district,
        } = this.query
        if (!this.dayDate || !client) {
          return
        }
        this.$store.dispatch({
          type: native.doTrainSubjectTrainDay,
          province,
          city,
          district,
          client,
          day: this.dayDate
        }).then(({data}) => {
          let {leave, ariched, approve, unariched} = data
          this.options.series[0].data = [
            {value: leave, name: '遗留工单'},
            {value: ariched, name: '已归档工单'},
            {value: approve, name: '待审核工单'},
            {value: unariched, name: '未归档工单'}
          ]
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
