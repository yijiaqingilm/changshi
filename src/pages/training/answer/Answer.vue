<template>
    <f7-page class='answer'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>答题</f7-nav-center>
        </f7-navbar>
        <section v-if="paper">
            <header>
                答题进度 {{paper}}
            </header>
            <section>
                <f7-tabs animated>
                    <f7-tab class="tab-0" active>
                        <section class='subject'>
                            <header class='s-title'>1.xxx</header>
                            <section class='s-body'>
                                <f7-list form>
                                    <f7-list-item checkbox name="t-c-1" value="A" title="Checkbox A"></f7-list-item>
                                    <f7-list-item checkbox name="t-c-1" value="B" title="Checkbox B"></f7-list-item>
                                    <f7-list-item checkbox name="t-c-1" value="C" title="Checkbox C"></f7-list-item>
                                </f7-list>
                            </section>
                            <footer class='s-footer'>
                                <div>回答正确，正确答案：A</div>
                                <div>答案解析：xxx</div>
                            </footer>
                        </section>
                    </f7-tab>
                    <f7-tab class="tab-1">
                        <section class='subject'>
                            <header class='s-title'>2.xxx</header>
                            <section class='s-body'>
                                <f7-list form>
                                    <f7-list-item checkbox name="t-c-2" value="A1" title="Checkbox Ax"></f7-list-item>
                                    <f7-list-item checkbox name="t-c-2" value="B1" title="Checkbox Bx"></f7-list-item>
                                    <f7-list-item checkbox name="t-c-2" value="C2" title="Checkbox Cx"></f7-list-item>
                                </f7-list>
                            </section>
                            <footer class='s-footer'>
                                <div>回答正确，正确答案：B</div>
                                <div>答案解析：xxx</div>
                            </footer>
                        </section>
                    </f7-tab>
                </f7-tabs>
            </section>
            <footer>
                <f7-button v-show="showPrev()" @click="doPrev()">上一题</f7-button>
                <f7-button v-show="showNext()" @click="doNext()">下一题</f7-button>
                <f7-button v-show="showRes()" @click="doAnswer()">确认</f7-button>
                <f7-button v-show="showSubmit()" @click="doAnswerSubmit()">提交</f7-button>
            </footer>
        </section>
    </f7-page>
</template>

<script>
  import { mapState } from 'vuex'
  import { globalConst as native } from '../../../lib/const'

  export default {
    name: 'answer',
    methods: {
      showPrev () {
        return this.paper.currentProgress !== 0
      },
      showNext () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress + 1] && subjects[currentProgress].hasAnswer
      },
      showRes () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress] && !subjects[currentProgress].hasAnswer
      },
      showSubmit () {
        let {currentProgress, subjects} = this.paper
        return currentProgress === subjects.length - 1 && subjects[currentProgress].hasAnswer
      },
      doAnswer () {
        // 回答逻辑
        this.$store.dispatch({
          type: native.doAnswer,
        })
      },
      doPrev () {
        this.paper.currentProgress--
        this.$f7.showTab(`.tab-${this.paper.currentProgress}`)
      },
      doNext () {
        this.paper.currentProgress++
        this.$f7.showTab(`.tab-${this.paper.currentProgress}`)
      },
      doAnswerSubmit () {
        console.log('提交试卷')
      }
    },
    computed: {
      ...mapState({
        paper ({answer}) {
          return answer.paper
        }
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>