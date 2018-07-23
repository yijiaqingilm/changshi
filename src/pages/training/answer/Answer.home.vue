<template>
    <f7-page >
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>在线答题</f7-nav-center>
        </f7-navbar>
        <section>
            <tabs-ctrl v-model="answerType" @change="showTab">
                <tab v-for="(type,index) in types" :key="index" :title="type.label" :label="type.value"></tab>
            </tabs-ctrl>
            <f7-tabs animated>
                <f7-tab v-for="(type,index) in types"
                        :key="index"
                        :class="{['tab-'+type.value]:true}"
                        :active="answerType===type.value">
                    <keep-alive>
                        <component :is="'typeView_'+ type.value"></component>
                    </keep-alive>
                </f7-tab>
            </f7-tabs>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import TabsCtrl from 'components/baseTabsCtrl/BaseTabs.vue'
  import Tab from 'components/baseTabsCtrl/BaseTab.vue'
  import Skill from './chilren/AnswerSkill.vue'
  import Manage from './chilren/AnswerManage.vue'
  const typeStatus = {
    skill: 0,
    manage: 1,
  }
  const types = [
    {value: typeStatus.skill, label: '技能培训类题库'},
    {value: typeStatus.manage, label: '管理培训类题库'}
  ]
  export default {
    name: '',
    data () {
      return {
        types,
        answerType: typeStatus.skill
      }
    },
    created () {
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
      [`typeView_${typeStatus.skill}`]: Skill,
      [`typeView_${typeStatus.manage}`]: Manage,
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>