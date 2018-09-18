<template>
    <f7-page class=''>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>{{title}}</f7-nav-center>
        </f7-navbar>
        <begin-panel :title='trainObj[currentSubject.trainType].value'
                     :level="paper.title"
                     :count="paper.count"
                     :score="paper.score"
                     :type="paper.sType"
                     :dateTime="paper.expTime"
                     :submitText="submitText"
                     @submit="begin">
        </begin-panel>
    </f7-page>
</template>

<script>
  import { globalConst as native, trainObj, trainModes } from 'lib/const'
  import BeginPanel from 'components/answerBeginPanel/AnswerBeginPanel.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'beginAnswer',
    data () {
      return {
        trainObj,
        title: '',
        submitText: ''
      }
    },
    created () {
      let {levelId, trainType, major} = this.currentSubject
      console.log(this.currentSubject, 'currentSubject')
      switch (this.currentTrainMode) {
        case trainModes.test:
          this.title = '进入考试'
          this.submitText = '开始考试'
          this.$store.dispatch({
            type: native.doGetExmInfo,
            refid: levelId,
            category: trainType
          })
          break
        case trainModes.video:
          this.title = '进入视频培训'
          this.submitText = '观看视频'
          this.$store.dispatch({
            type: native.doTrainSubject2Movie,
            refid: levelId,
            category: trainType
          })
          break
        case trainModes.answer:
        default:
          this.title = '进入答题'
          this.submitText = '开始答题'
          this.$store.dispatch({
            type: native.doTrainSubject,
            refid: levelId,
            category: trainType
          })
          break
      }
    },
    computed: {
      ...mapState({
        currentTrainMode: ({answer}) => answer.currentTrainMode,
        currentSubject: ({answer}) => answer.currentSubject,
        paper: ({answer}) => answer.paper,
      })
    },
    methods: {
      begin () {
        this.$store.commit(native.doSetQuizBeginTime)
        switch (this.currentTrainMode) {
          case trainModes.test:
            this.$router.loadPage('/training/test')
            break
          case trainModes.video:
            this.$router.loadPage('/training/video')
            break
          case trainModes.answer:
          default:
            this.$router.loadPage('/training/answer')
            break
        }
      }
    },
    components: {BeginPanel}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>