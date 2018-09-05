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
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['在职人数', '练习人数', '参训率']
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '在职人数',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '练习人数',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '参训率',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
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
          client,
          province,
          city,
          district,
        } = this.query
        if (!this.dayDate || !client) {
          return
        }
        this.$store.dispatch({
          type: native.doTrainSubjectTrainMonth,
          province,
          city,
          district,
          client,
          month: this.dayDate
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
