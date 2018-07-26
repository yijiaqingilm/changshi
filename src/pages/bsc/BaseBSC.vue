<template>
    <f7-page class='base-bsc'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>基础维护数据</f7-nav-center>
        </f7-navbar>
        <tabs-ctrl v-model="currentType" @change="showTab">
            <tab v-for="(type,index) in types" :key="index" :title="type.label" :label="type.value"></tab>
        </tabs-ctrl>
        <f7-tabs animated>
            <f7-tab v-for="(type,index) in types"
                    :key="index"
                    :class="{['tab-'+type.value]:true}"
                    :active="currentType===type.value">
                <keep-alive>
                    <component :is="'typeView_'+ type.value"></component>
                </keep-alive>
            </f7-tab>
        </f7-tabs>
        <div slot="fixed">
            <datetime ref="startDate" :displayValue.sync="orderStat.displayStartDate" class="time-input"
                      placeholder="请选择开始时间" v-model='orderStat.startDate'
                      :format="dateTimeFormat"
                      type="date"
                      :phrases="dateTimePhrases"></datetime>
            <datetime ref="endDate" :displayValue.sync="orderStat.displayEndDate" placeholder="请选择结束时间"
                      v-model='orderStat.endDate' :format="dateTimeFormat"
                      type="date"
                      :phrases="dateTimePhrases"></datetime>
            <datetime ref="startAnchorDate" :displayValue.sync="anchorStat.displayStartDate" class="time-input"
                      placeholder="请选择开始时间" v-model='anchorStat.startDate'
                      :format="dateTimeFormat"
                      type="date"
                      :phrases="dateTimePhrases"></datetime>
            <datetime ref="endAnchorDate" :displayValue.sync="anchorStat.displayEndDate" placeholder="请选择结束时间"
                      v-model='anchorStat.endDate' :format="dateTimeFormat"
                      type="date"
                      :phrases="dateTimePhrases"></datetime>
        </div>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import Vue from 'vue'
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import AnchorStat from './baseChildren/AnchorStat.vue'
  import OrderStat from './baseChildren/OrderStat.vue'

  const typeStatus = {
    order: 0,
    anchor: 1,
  }
  const types = [
    {value: typeStatus.order, label: '工单统计'},
    {value: typeStatus.anchor, label: '维护点运行状态'},
  ]
  export default {
    componentName: 'base-bsc',
    data () {
      return {
        currentType: typeStatus.order,
        types,
        polar: {
          title: {
            text: '工单统计',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
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
    created () {
    },
    methods: {
      openStartTime (event) {
        console.log('触发')
        this.$refs.startDate.open(event)
      },
      openEndTime (event) {
        this.$refs.endDate.open(event)
      },
      openAnchorStartTime (event) {
        this.$refs.startAnchorDate.open(event)
      },
      openAnchorEndTime (event) {
        this.$refs.endAnchorDate.open(event)
      },
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    computed: {
      ...mapState({
        dateTimePhrases: ({base}) => base.dateTimeConfig.options.phrases,
        dateTimeFormat: ({base}) => base.dateTimeConfig.format,
        orderStat: ({bsc}) => bsc.orderStat,
        anchorStat: ({bsc}) => bsc.anchorStat
      })
    },
    components: {
      TabsCtrl,
      Tab,
      [`typeView_${typeStatus.order}`]: OrderStat,
      [`typeView_${typeStatus.anchor}`]: AnchorStat,
    }

  }
</script>
<style lang="scss" scoped type="text/css">
</style>
