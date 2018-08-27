<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>{{title}}</f7-nav-center>
        </f7-navbar>
        <section>
            <tabs-ctrl v-model="answerType" @change="showTab">
                <tab v-for="(type,index) in trainTypes" :key="index" :title="type.label" :label="type.value"></tab>
            </tabs-ctrl>
            <f7-tabs animated>
                <f7-tab v-for="(type,index) in trainTypes"
                        :key="index"
                        :class="{['tab-'+type.value]:true}"
                        :active="answerType===type.value">
                    <keep-alive>
                        <train-child-panel :type='type.value' :mode="trainType"></train-child-panel>
                    </keep-alive>
                </f7-tab>
            </f7-tabs>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native, trainTypeStatus, trainTypes, trainModes } from 'lib/const'
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import TrainChildPanel from 'section/train/TrainChildPanel'

  export default {
    name: '',
    data () {
      return {
        trainModes,
        trainTypes,
        answerType: trainTypeStatus.skill,
        trainType: trainModes.answer,
        title: ''
      }
    },
    created () {
      this.trainType = this.$route.params.trainType >>> 0
      switch (this.trainType) {
        case trainModes.test:
          this.title = '考试'
          break
        case trainModes.video:
          this.title = '在线视频'
          break
        case trainModes.answer:
        default:
          this.title = '在线答题'
          break
      }
      this.$store.commit(native.setTrainMode, this.trainType)
    },
    computed: {},
    methods: {
      showTab (value) {
        this.$f7.showTab(`.tab-${value}`)
      }
    },
    components: {
      TabsCtrl,
      Tab,
      TrainChildPanel,
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>