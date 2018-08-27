<template>
    <f7-page class=''>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>进入答题</f7-nav-center>
        </f7-navbar>
        <begin-panel :title='trainObj[currentSubject.trainType].value'
                     :level="paper.title"
                     :count="paper.count"
                     :score="paper.score"
                     :type="paper.sType"
                     :dateTime="paper.expTime"
                     @beginAnswer="beginAnswer">
        </begin-panel>
    </f7-page>
</template>

<script>
  import { globalConst as native, trainObj } from 'lib/const'
  import BeginPanel from 'components/answerBeginPanel/AnswerBeginPanel.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'beginAnswer',
    data () {
      return {
        trainObj
      }
    },
    created () {
      let {levelId, trainType, major} = this.currentSubject
      this.$store.dispatch({
        type: native.doTrainSubject,
        refid: levelId,
        category: trainType
      })
    },
    computed: {
      ...mapState({
        currentSubject: ({answer}) => answer.currentSubject,
        paper: ({answer}) => answer.paper
      })
    },
    methods: {
      beginAnswer () {
        this.$router.loadPage('/training/answer')
        console.log('开始 答题')
      }
    },
    components: {BeginPanel}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>