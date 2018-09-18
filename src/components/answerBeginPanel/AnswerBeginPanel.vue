<template>
    <div class='answer-panel'>
        <header>
            <div class='title'>{{title}}</div>
            <div class='level'>{{level}}</div>
        </header>
        <section>
            <div>本套题 题数：{{count}}题 总分：{{score}}分</div>
            <div>题目类型：{{type}}</div>
            <div>预计答题时间：{{dateTime}}分钟</div>
        </section>
        <footer>
            <f7-button @click="submit" active full big>{{submitText}}</f7-button>
        </footer>
    </div>
</template>

<script type="text/ecmascript-6">
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
      return {}
    },
    methods: {
      submit () {
        this.$emit('submit')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "answerBeginPanel.scss";
</style>
