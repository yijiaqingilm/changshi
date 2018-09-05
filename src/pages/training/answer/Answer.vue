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
                                        {{subject.answer}}
                                        <base-checkbox-group v-model="subject.answer">
                                            <base-checkbox v-for="(item,itemIndex) in subject.items"
                                                           :name="'t-c-'+index"
                                                           no-border
                                                           :label="item.id"
                                                           :title="item.name"
                                                           :key="itemIndex"></base-checkbox>
                                        </base-checkbox-group>
                                    </template>
                                    <template v-else>
                                        <f7-list-item v-for="(item,itemIndex) in subject.items"
                                                      :key="itemIndex"
                                                      radio
                                                      v-model="subject.answer"
                                                      @change="handleChangeAnswer(subject,item)"
                                                      :name="'t-c-'+index"
                                                      :value="item.id"
                                                      :title="item.name"></f7-list-item>
                                    </template>
                                </f7-list>
                            </section>
                            <line-10></line-10>
                            <footer class='tab-footer' v-show="subject.hasAnswer">
                                <div>回答正确，正确答案：B</div>
                                <div>回答错误，正确答案：B</div>
                                <div class='f-resolve'>
                                    <div>答案解析：</div>
                                    <div>{{subject.resolve}}</div>
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
  import { globalConst as native, subjectStatus, modalTitle } from 'lib/const'

  export default {
    name: 'answer',
    data () {
      return {
        subjectStatus,
        test: ['A']
      }
    },
    created () {
      this.$store.dispatch({
        type: native.doGetSubject,
        page: this.paper.currentProgress
      })
    },
    methods: {
      handleChangeAnswer (subject, item) {
        console.log('subject,', subject)
        console.log('item==>', item)
        subject.answer = item.id
      },
      changeItem (e) {
        console.log('log==>', e)
      },
      showPrev () {
        return this.paper.currentProgress !== 1
      },
      showNext () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress] && subjects[currentProgress - 1].hasAnswer
      },
      showRes () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress - 1] && !subjects[currentProgress - 1].hasAnswer
      },
      showSubmit () {
        let {currentProgress, subjects} = this.paper
        return currentProgress === subjects.length && subjects[currentProgress - 1].hasAnswer
      },
      doAnswer () {
        // 回答逻辑
        let {currentProgress, subjects} = this.paper
        let answer = false
        let subject = subjects[currentProgress - 1]
        // 当前选择回答的id
        let currentAnswer = subject.answer
        // 获取当前选择的题目
        let checkedAnswer = subject.items.filter((item) => {
          switch (subject.sort) {
            case subjectStatus.checkSubject:
              return currentAnswer ? currentAnswer.includes(item.id) : false
            case subjectStatus.radioSubject:
            case subjectStatus.switchSubject:
              return currentAnswer === item.id
          }
        })
        if (!checkedAnswer || checkedAnswer.length === 0) {
          this.$f7.alert('请选择答案', modalTitle)
          return
        }
        answer = !checkedAnswer.some((item) => item.enabled >>> 0 === 0)
        this.$store.dispatch({
          type: native.doAnswer,
          page: currentProgress,
          answer
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