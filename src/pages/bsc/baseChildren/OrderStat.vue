<template>
    <div>
        <header><span class="mark">*</span>查询时间</header>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <base-date-picker v-model="startTime" text="请选择开始时间"
                                  :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>
            <div>
                <base-date-picker v-model="endTime" text="请选择结束时间"
                                  :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>
        </div>
        <div class='combo'>
            <base-work-base @changeWorkBase="changeWorkBase" :mode="baseWorkMode.list"></base-work-base>
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
          height: '400px',
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
            orient: 'horizontal',
            left: 10,
            top: 20,
            bottom: 20,
            data: ['遗留工单', '已归档工单', '待审核工单', '未归档工单']
          },
          color: ['#a1d57d', '#6dc394', '#ee8787', '#dec562'],
          series: [
            {
              name: '工单统计',
              type: 'pie',
              radius: '40%',
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
          leave: '',
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
        this.query = result
        this.doStatics()
      },
      doStatics () {
        let {
          workBase,
          client,
          province,
          city,
          district,
          major
        } = this.query
        if (!this.startTime || !this.endTime || !client || !major) {
          return
        }
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
        orderStat: ({bsc}) => bsc.orderStat,
      }),
    },
    watch: {
      'startTime': {
        handler: function (nowStartTime, oldStartTime) {
          if (nowStartTime && nowStartTime !== oldStartTime) {
            this.doStatics()
          }
        }
      },
      'endTime': {
        handler: function (nowEndTime, oldEndTime) {
          if (nowEndTime && nowEndTime !== oldEndTime) {
            this.doStatics()
          }
        }
      }
    },
    components: {BaseWorkBase}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "orderStat.scss";
</style>
