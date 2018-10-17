<template>
    <div>
        <header><span class="mark">*</span>查询时间</header>
        <div class='time-group'>
            <div>
                <base-date-picker v-model="startTime" text="请选择时间"
                                  :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>
            <!--<div>
                <base-date-picker v-model="endTime" text="请选择结束时间"
                                  :mode="dateType.yearAndMonthAndDay"></base-date-picker>
            </div>-->
        </div>
        <div class='combo'>
            <base-work-base @changeWorkBase="changeWorkBase" :mode="baseWorkMode.list"
                            :hasWorkBase="false"></base-work-base>
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
  import { majorValue, clientValue, baseWorkMode, globalConst as native, dateType } from 'lib/const'
  import emitter from 'mixins/emitter'
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'

  export default {
    mixins: [emitter],
    data () {
      return {
        dateType,
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
            orient: 'horizontal',
            left: 'left',
            data: ['非常好', '好', '良好', '合格', '不合格']
          },
          color: ['#6dc394', '#a1d57d', '#91b0e8', '#dec562', '#ee8787'],
          series: [
            {
              name: '维护点运行状况统计',
              type: 'pie',
              radius: '40%',
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
        },
        startTime: '',
        endTime: '',
        query: {
          workBase: '',
          client: '',
          province: '',
          city: '',
          district: '',
          major: ''
        },
      }
    },
    methods: {
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
          major
        } = this.query
        if (!this.startTime || !client) {
          return
        }
        this.$store.dispatch({
          type: native.doStaticsRunStatus,
          province,
          city,
          district,
          client,
          day: this.startTime,
          major
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
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        anchorStat: ({bsc}) => bsc.anchorStat
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
    },
    components: {BaseWorkBase}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "orderStat.scss";
</style>
