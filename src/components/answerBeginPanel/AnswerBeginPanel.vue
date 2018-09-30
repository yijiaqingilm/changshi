<template>
    <div class='answer-panel'>
        <header>
            <div class='title'>{{title}}</div>
            <div class='level'>{{level}}</div>
        </header>
        <section v-if="currentTrainMode===trainModes.test">
            <div>开卷时间：{{testTime.startTime}}</div>
            <div>交卷时间：{{testTime.endTime}}</div>
        </section>
        <section>
            <div>本套题 题数：{{count}}题<span v-if='score&&score>0'>总分：{{score}}分</span></div>
            <div>题目类型：{{type}}</div>
            <div v-if="currentTrainMode===trainModes.test">预计答题时间：{{dateTime}}分钟</div>
            <div v-else-if="currentTrainMode===trainModes.video">视频时长：{{dateTime}}</div>
            <div v-else></div>
        </section>
        <footer>
            <f7-button @click="submit" active full big>{{submitText}}</f7-button>
        </footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { trainModes } from 'lib/const'

  export default {
    props: {
      title: {},
      level: {},
      count: {},
      score: {},
      type: {},
      dateTime: {},
      submitText: {
        type: String,
        default: '开始答题'
      }
    },
    data () {
      return {
        trainModes
      }
    },
    methods: {
      submit () {
        this.$emit('submit')
      }
    },
    computed: {
      ...mapState({
        currentTrainMode: ({answer}) => answer.currentTrainMode,
        testTime: ({answer}) => answer.testTime
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "answerBeginPanel.scss";
</style>
