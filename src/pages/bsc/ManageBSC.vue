<template>
    <f7-page class='base-bsc'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>资源管理数据</f7-nav-center>
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
            <datetime ref="dyDate" :displayValue.sync="dyStat.displayStartDate" class="time-input"
                      placeholder="请选择时间" v-model='dyStat.date'
                      :format="dateTimeFormat"
                      type="date"
                      :phrases="dateTimePhrases"></datetime>
            <datetime ref="veDate" :displayValue.sync="veStat.displayEndDate" placeholder="请选择时间"
                      v-model='veStat.date' :format="dateTimeFormat"
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
  import DynamotorStat from './manageChildren/DynamotorStat.vue'
  import VehicleStat from './manageChildren/VehicleStat.vue'

  const typeStatus = {
    dy: 0,
    ve: 1,
  }
  const types = [
    {value: typeStatus.dy, label: '发电机'},
    {value: typeStatus.ve, label: '车辆'},
  ]
  export default {
    componentName: 'manage-bsc',
    data () {
      return {
        currentType: typeStatus.dy,
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
    mounted(){
      this.$nextTick(() => {
        this.$$('.pages .cached').remove()
      })
    },
    methods: {
      openDyDatePicker (event) {
        console.log('触发')
        this.$refs.dyDate.open(event)
      },
      openVeDatePicker (event) {
        console.log('???')
        this.$refs.veDate.open(event)
      },
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    computed: {
      ...mapState({
        dateTimePhrases: ({base}) => base.dateTimeConfig.options.phrases,
        dateTimeFormat: ({base}) => base.dateTimeConfig.format,
        dyStat: ({bsc}) => bsc.dyStat,
        veStat: ({bsc}) => bsc.veStat
      })
    },
    components: {
      TabsCtrl,
      Tab,
      [`typeView_${typeStatus.dy}`]: DynamotorStat,
      [`typeView_${typeStatus.ve}`]: VehicleStat,
    }

  }
</script>
<style lang="scss" scoped type="text/css">
</style>
