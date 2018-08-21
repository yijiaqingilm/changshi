<template>
    <f7-page class=''>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>进入答题</f7-nav-center>
        </f7-navbar>
        <begin-panel title='管理培训类'
                     level="1ji"
                     count="50"
                     score="fenshu"
                     type="多选题，单选题，判断题"
                     dateTime="60"
                     @beginAnswer="beginAnswer">
        </begin-panel>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import BeginPanel from 'components/answerBeginPanel/AnswerBeginPanel.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'beginAnswer',
    data () {
      return {}
    },
    created () {
      let {levelId, trainType, major} =this.currentSubject
      this.$store.dispatch({
        type: native.doTrainSubject,
        level_id: levelId,
        category: trainType
      })
    },
    computed: {
      ...mapState({
        currentSubject: ({answer}) => answer.currentSubject
      })
    },
    methods: {
      beginAnswer(){
        this.$router.loadPage('/training/answer')
        console.log('开始 答题')
      }
    },
    components: {BeginPanel}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>