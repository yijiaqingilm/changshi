<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <base-date-picker v-model="startTime" text="请选择开始时间" :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>
            <div>
                <base-date-picker v-model="endTime" text="请选择结束时间" :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>
        </div>
        <div class='combo'>
            <base-work-base @changeWorkBase="changeWorkBase" :mode="baseWorkMode.list"></base-work-base>
        </div>
        <line-10></line-10>
        <chart :options="options"></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { majorValue, clientValue, globalConst as native, baseWorkMode, dateType } from 'lib/const'
  import emitter from 'mixins/emitter'
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'

  export default {
    mixins: [emitter],
    data () {
      return {
        dateType,
        baseWorkMode,
        clientValue,
        majorValue,
        options: {
          title: {
            text: '工单统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 10,
            top: 20,
            bottom: 20,
            data: ['工单总数', '已归档工单', '待审核工单', '未归档工单']
          },
          color: ['#a9d08e', '#00b050', '#c40202', '#b4c6e7'],
          series: [
            {
              name: '工单统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              /* label: {
                normal: {
                  position: 'inner'
                }
              },*/
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        staticsWork: {
          total: '',
          ariched: '',
          approve: '',
          unariched: ''
        },
        query: {
          workBase: '',
          client: '',
          province: '',
          city: '',
          district: '',
          major: ''
        },
        startTime: '',
        endTime: ''
      }
    },
    methods: {
      changeWorkBase (result) {
        this.doStatics(result)

      },
      doStatics (result) {
        let {
          workBase,
          client,
          province,
          city,
          district,
          major
        } = result
        this.$store.dispatch({
          type: native.doStaticsWork,
          province,
          city,
          district,
          work_base: workBase,
          client,
          major,
          start_date: this.startTime,
          end_date: this.endTime
        }).then(({data}) => {
          let {total, ariched, approve, unariched} = data
          this.options.series[0].data = [
            {value: total, name: '工单总数'},
            {value: ariched, name: '已归档工单'},
            {value: approve, name: '待审核工单'},
            {value: unariched, name: '未归档工单'}
          ]
        })
      },
      /*  openStartTime (event) {
          this.dispatchMethod('base-bsc', 'openStartTime', event)
        },
        openEndTime (event) {
          this.dispatchMethod('base-bsc', 'openEndTime', event)
        },*/
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        orderStat: ({bsc}) => bsc.orderStat,
      }),
      /* startTime () {
         return this.orderStat.startDate && moment(this.orderStat.startDate).format('YYYY-MM-DD')
       },
       endTime () {
         return this.orderStat.endDate && moment(this.orderStat.endDate).format('YYYY-MM-DD')
       },*/
    },
    components: {BaseWorkBase}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "orderStat.scss";
</style>
