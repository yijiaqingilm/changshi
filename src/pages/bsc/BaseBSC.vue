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
    mounted(){
      this.$nextTick(() => {
        this.$$('.pages .cached').remove()
      })
    },
    methods: {
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    computed: {
      ...mapState({})
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
