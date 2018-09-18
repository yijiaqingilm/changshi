<template>
    <f7-page class='video'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center><!--视频答题--></f7-nav-center>
        </f7-navbar>
        <section>
            <header>
                <div class='v-h-title'>
                    已观看时间：{{currentTime}}分钟
                </div>
                <div>
                    <div class='dplayer'></div>
                </div>
            </header>
            <div @click="hidePauseBtn">暂停</div>
            <div @click="play()">播放</div>
            <template v-if='isShow'>
                <section v-if="paper">
                    <header>
                        <div class='progress'>
                            <f7-progressbar :progress="paperProgres"></f7-progressbar>
                        </div>
                        <div class='step'><span
                                class='current'>{{paper.currentProgress}}</span><span>/{{paper.count}}</span>
                        </div>
                    </header>
                    <section>
                        <f7-tabs animated v-if="paper.subjects && paper.subjects.length>0">
                            <f7-tab v-for="(subject,index) in paper.subjects"
                                    :key="index" :class="['tab-'+(index+1)]">
                                <section class='subject'>
                                    <section class='s-body'>
                                        <f7-block-title>{{index+1}}.{{subject.title}}</f7-block-title>
                                        <f7-list form no-hairlines no-hairlines-between>
                                            <template v-if="subject.sort===subjectStatus.checkSubject">
                                                <base-checkbox-group v-model="subject.answer">
                                                    <base-checkbox v-for="(item,itemIndex) in subject.items"
                                                                   :name="'t-c-'+index"
                                                                   no-border
                                                                   :disabled="subject.hasAnswer"
                                                                   :label="item.id"
                                                                   :title="item.chacter+'.'+item.name"
                                                                   :key="itemIndex"></base-checkbox>
                                                </base-checkbox-group>
                                            </template>
                                            <template v-else>
                                                <f7-list-item v-for="(item,itemIndex) in subject.items"
                                                              :key="itemIndex"
                                                              radio
                                                              @change="handleChangeAnswer(subject,item)"
                                                              :name="'t-c-'+index"
                                                              :disabled="subject.hasAnswer"
                                                              :checked="subject.answer===item.id"
                                                              :value="item.id"
                                                              :title="item.chacter+'.'+item.name"></f7-list-item>
                                            </template>
                                        </f7-list>
                                    </section>
                                    <line-10></line-10>
                                    <footer class='tab-footer' v-show="subject.hasAnswer">
                                        <div v-if="subject.isRight">回答正确，正确答案：{{subject.rightAnswer}}</div>
                                        <div v-else>回答错误，正确答案:{{subject.rightAnswer}}</div>
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
                        <f7-block class='footer-button'>
                            <f7-button active full big v-show="showPrev()" @click="doPrev()">上一题</f7-button>
                            <f7-button active full big v-show="showNext()" @click="doNext()">下一题</f7-button>
                            <f7-button active full big v-show="showRes()" @click="doAnswer()">确认</f7-button>
                            <f7-button active full big v-show="showSubmit()" @click="doAnswerSubmit()">提交</f7-button>
                        </f7-block>
                    </footer>
                </section>
                <footer>
                    <f7-button @click="doAnswer()">确认</f7-button>
                </footer>
            </template>
        </section>
    </f7-page>
</template>

<script>
  // import VueDPlayer from 'vue-dplayer'
  import DPlayer from 'dplayer'
  import { subjectStatus, globalConst as native, modalTitle, trainModes } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'videoMain',
    data () {
      return {
        isShow: false,
        dp: null,
        currentTime: 0,
        step: 2,
        subjectStatus,

      }
    },
    created () {
      this.loadSubject()
    },
    methods: {
      loadSubject () {
        return this.$store.dispatch({
          type: native.doGetMovie,
          page: this.paper.currentProgress,
          movie_id: this.paper.refId
        })
      },
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
          answer,
          refid: this.paper.refId
        })
      },
      doPrev () {
        this.paper.currentProgress--
        this.$f7.showTab(`.tab-${this.paper.currentProgress}`)
      },
      doNext () {
        this.paper.currentProgress++
        this.loadSubject()
        this.$f7.showTab(`.tab-${this.paper.currentProgress}`)

      },
      doAnswerSubmit () {
        let {score, consumetime} = this.paper
        this.$f7.alert(`<div>用时：${consumetime}分钟</div><div>得分：${score}分</div>`, '提交成功！', () => {
          this.$router.loadPage('/training/home/' + trainModes.answer)
        })
      },
      pause () {
        this.dp.pause()
      },
      hidePauseBtn () {
        this.dp.pause()
        this.$$('.dplayer  .dplayer-play-icon').hide()
      },
      play () {
        this.$$('.dplayer  .dplayer-play-icon').show()
        this.dp.play()
      },
      showSubject () {
        this.hidePauseBtn()
      }
    },
    mounted () {
      this.$nextTick(() => {
        let dplayerWrap = document.querySelectorAll('.dplayer')
        this.dp = new DPlayer({
          container: dplayerWrap[dplayerWrap.length - 1],
          autoplay: false,
          theme: '#FADFA3',
          loop: true,
          lang: 'zh-cn',
          screenshot: true,
          hotkey: true,
          preload: 'auto',
          logo: 'logo.png',
          volume: 0.7,
          mutex: true,
          video: {
            url: 'https://lightsns.oss-cn-qingdao.aliyuncs.com/demo_video.mp4',
            pic: require('../../../assets/icon_add.png'),
            type: 'auto'
          },
        })
        this.$$('.dplayer  .dplayer-setting').hide()
        this.$$('.dplayer .dplayer-full').hide()
        this.dp.on('timeupdate', () => {
          this.currentTime = Math.floor(this.dp.video.currentTime / 60)
        })
      })
    },
    computed: {
      paperProgres () {
        let {currentProgress, count} = this.paper
        return (currentProgress / count) * 100
      },
      ...mapState({
        paper ({answer}) {
          return answer.paper
        }
      })
    },
    watch: {
      currentTime (nowTime, oldTime) {
        if (nowTime % this.step === 0) {
          this.showSubject()
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>