<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择开始时间"
                       @click="openStartTime"
                       :value="startTime">
            </div>
            <div>
                <input type="text" readonly class='time-input' placeholder="请选择结束时间"
                       :value="endTime"
                       @click="openEndTime">
            </div>
        </div>
        <div class='combo'>
            <base-work-base @changeWorkBase="changeWorkBase" :mode="baseWorkMode.list"
                            :hasWorkBase="false"></base-work-base>
        </div>
        <line-10></line-10>
        <chart :options="options"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { majorValue, clientValue, baseWorkMode, globalConst as native } from 'lib/const'
  import emitter from 'mixins/emitter'
  import moment from 'lib/moment'
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'

  export default {
    mixins: [emitter],
    data () {
      return {
        clientValue,
        baseWorkMode,
        options: {
          title: {
            text: '维护点运行状况统计',
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
            data: ['非常好', '好', '良好', '合格', '不合格']
          },
          series: [
            {
              name: '工单统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
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
      changeWorkBase (result) {
        this.doStatics(result)
      },
      doStatics (result) {
        let {
          client,
          province,
          city,
          district,
          major
        } = result
        this.$store.dispatch({
          type: native.doStaticsRunStatus,
          province,
          city,
          district,
          client,
          major,
          start_date: this.startTime,
          end_date: this.endTime
        }).then(({data}) => {
          let {stat1, stat2, stat3, stat4, stat5} = data
          this.options.series[0].data = [
            {value: stat1, name: '非常好'},
            {value: stat2, name: '好'},
            {value: stat3, name: '良好'},
            {value: stat4, name: '合格'},
            {value: stat5, name: '不合格'},
          ]
        })
      },
      openStartTime (event) {
        this.dispatchMethod('base-bsc', 'openAnchorStartTime', event)
      },
      openEndTime (event) {
        this.dispatchMethod('base-bsc', 'openAnchorEndTime', event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        anchorStat: ({bsc}) => bsc.anchorStat
      }),
      startTime () {
        return this.anchorStat.startDate && moment(this.anchorStat.startDate).format('YYYY-MM-DD')
      },
      endTime () {
        return this.anchorStat.endDate && moment(this.anchorStat.endDate).format('YYYY-MM-DD')
      },
    },
    components: {BaseWorkBase}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "orderStat.scss";
</style>
