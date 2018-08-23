<template>
    <f7-page class='answer'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>答题</f7-nav-center>
        </f7-navbar>
        <!--{{paper}}-->
        <section v-if="paper">
            <header>
                <div class='progress'>
                    <f7-progressbar :progress="20"></f7-progressbar>
                </div>
                <div class='step'><span class='current'>{{paper.currentProgress}}</span><span>/{{paper.count}}</span>
                </div>
            </header>
            <section>
                <f7-tabs animated v-if="paper.subjects &&paper.subjects.length>0">
                    <f7-tab v-for="(subject,index) in paper.subjects"
                            :key="index" :class="['tab-'+index]">
                        <section class='subject'>
                            <section class='s-body'>
                                <f7-block-title>{{index+1}}.{{subject.title}}</f7-block-title>
                                <f7-list form no-hairlines no-hairlines-between>
                                    <template v-if="subject.sort===subjectStatus.checkSubject">
                                        <f7-list-item v-for="(item,index) in subject.items" :key="index"
                                                      no-border
                                                      checkbox
                                                      :name="'t-c-'+index"
                                                      v-model="subject.answer"
                                                      :value="item.id"
                                                      :title="item.name"></f7-list-item>
                                    </template>
                                    <template v-else>
                                        {{test}} <!-- v-model="test"-->
                                        <f7-list-item v-for="(item,itemIndex) in subject.items" :key="itemIndex"
                                                      no-border
                                                      checkbox
                                                      v-model="test"
                                                      @change="changeItem(item)"
                                                      :name="'t-c-'+index"
                                                      :value="item.id"
                                                      :title="item.name"></f7-list-item>
                                        <!--<f7-list-item required radio name="tst" value="a"
                                                      title="Checkbox C"></f7-list-item>
                                        <f7-list-item required radio name="tst" value="C"
                                                      title="Checkbox C"></f7-list-item>
                                        <f7-list-item checkbox name="t-c-1" value="B" title="Checkbox B"></f7-list-item>
                                        <f7-list-item checkbox name="t-c-1" value="C" title="Checkbox C"></f7-list-item>-->
                                    </template>
                                </f7-list>
                            </section>
                            <line-10></line-10>
                            <footer class='tab-footer' v-show="subject.hasAnswer">
                                <div>回答正确，正确答案：B</div>
                                <div class='f-resolve'>
                                    <div>答案解析：</div>
                                    <div>xxx</div>
                                </div>
                            </footer>
                        </section>
                    </f7-tab>
                </f7-tabs>
            </section>
            <footer>
                <f7-block>
                    <f7-button v-show="showPrev()" @click="doPrev()">上一题</f7-button>
                    <f7-button v-show="showNext()" @click="doNext()">下一题</f7-button>
                    <f7-button active full big v-show="showRes()" @click="doAnswer()">确认</f7-button>
                    <f7-button v-show="showSubmit()" @click="doAnswerSubmit()">提交</f7-button>
                </f7-block>
            </footer>
        </section>
    </f7-page>
</template>

<script>
  import { mapState } from 'vuex'
  import { globalConst as native, subjectStatus } from '../../../lib/const'

  export default {
    name: 'answer',
    data () {
      return {
        subjectStatus,
        test: '123'
      }
    },
    created () {
      this.$store.dispatch({
        type: native.doGetSubject,
        page: this.paper.currentProgress
      })
    },
    methods: {
      changeItem (e) {
        console.log('log==>', e)
      },
      showPrev () {
        return this.paper.currentProgress !== 1
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
        let {currentProgress} = this.paper
        this.$store.dispatch({
          type: native.doAnswer,
          page: currentProgress,
          answer: true
        }).then(() => {

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
    @import "../../../css/answer.scss";
</style>