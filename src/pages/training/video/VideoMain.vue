<template>
    <f7-page class='answer'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>视频答题</f7-nav-center>
        </f7-navbar>
        <section>
            <header>
                <!--<div class='v-h-title'>
                    已观看时间：{{paper.currentVideoTime}}秒
                </div>-->
                <div>
                    <div class='dplayer'></div>
                </div>
            </header>
            <template v-if=' paper && paper.isShowVideo'>
                <!--<header>
                    <div class='progress'>
                        <f7-progressbar :progress="paperProgres"></f7-progressbar>
                    </div>
                    <div class='step'><span
                            class='current'>{{paper.currentProgress}}</span><span>/{{paper.count}}</span>
                    </div>
                </header>-->
                <section class='subject'>
                    <section class='s-body'>
                        <f7-block-title>
                            {{paper.currentProgress}}.{{currentSubject.title}}({{sortText(currentSubject.sort)}})
                        </f7-block-title>
                        <f7-list form no-hairlines no-hairlines-between>
                            <template v-if="currentSubject.sort===subjectStatus.checkSubject">
                                <base-checkbox-group v-model="currentSubject.answer">
                                    <base-checkbox v-for="(item,itemIndex) in currentSubject.items"
                                                   :name="'t-c-'+paper.currentProgress"
                                                   no-border
                                                   :disabled="currentSubject.hasAnswer"
                                                   :label="item.id"
                                                   :title="item.chacter+'.'+item.name"
                                                   :key="itemIndex"></base-checkbox>
                                </base-checkbox-group>
                            </template>
                            <template v-else>
                                <f7-list-item v-for="(item,itemIndex) in currentSubject.items"
                                              :key="itemIndex"
                                              radio
                                              @change="handleChangeAnswer(currentSubject,item)"
                                              :name="'t-c-'+paper.currentProgress"
                                              :disabled="currentSubject.hasAnswer"
                                              :checked="currentSubject.answer===item.id"
                                              :value="item.id"
                                              :title="item.chacter+'.'+item.name"></f7-list-item>
                            </template>
                        </f7-list>
                    </section>
                    <line-10></line-10>
                    <footer class='tab-footer' v-show="currentSubject.hasAnswer">
                        <div class='answer-right' v-if="currentSubject.isRight">
                            回答正确，正确答案：{{currentSubject.rightAnswer}}
                        </div>
                        <div class='answer-left' v-else>回答错误，正确答案:{{currentSubject.rightAnswer}}</div>
                        <div class='f-resolve'>
                            <div>答案解析：</div>
                            <div>{{currentSubject.resolve}}</div>
                        </div>
                    </footer>
                </section>
                <footer>
                    <f7-block class='footer-button'>
                        <f7-button active full big v-show="showNext()" @click="doNext()">继续观看视频</f7-button>
                        <f7-button active full big v-show="showRes()" @click="doAnswer()">确认</f7-button>
                    </f7-block>
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
        dp: null,
        step: 60,
        subjectStatus,
        isLookVideoOver: false
      }
    },
    created () {
      this.$$('.pages .cached').remove()
      if (__DEBUG__) {
        this.step = 15
      } else {
        this.step = Math.floor(60 / this.paper.rate)
      }
      this.loadSubject()
      if (this.paper.currentProgress >= this.paper.count) {
        this.isLookVideoOver = true
      }
    },
    methods: {
      sortText (sort) {
        switch (sort >>> 0) {
          case subjectStatus.checkSubject:
            return '多选题'
          case subjectStatus.switchSubject:
            return '判断题'
          case subjectStatus.radioSubject:
            return '单选题'
        }
      },
      loadSubject () {
        this.$store.dispatch({
          type: native.doGetMovie,
          page: this.paper.currentProgress,
          movie_id: this.paper.movieId
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
        if (subject.sort === subjectStatus.checkSubject && checkedAnswer.length !== subject.items.filter((item) => item.enabled >>> 0 === 1).length) {
          answer = false
        }
        this.$store.dispatch({
          type: native.doVideo,
          page: currentProgress,
          answer,
          refid: this.paper.refId
        })
      },
      showNext () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress - 1].hasAnswer
      },
      showRes () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress - 1] && !subjects[currentProgress - 1].hasAnswer
      },
      doNext () {
        this.play()
        this.paper.isShowVideo = false
        this.paper.videoPlay = true
        if (this.paper.currentProgress < this.paper.count) {
          this.paper.currentProgress++
          this.loadSubject()
        } else {
          this.isLookVideoOver = true
        }

      },
      doAnswerSubmit () {
        let {score, consumetime} = this.paper
        this.$f7.alert(`<div>用时：${consumetime}</div><div>得分：${score}分</div>`, '提交成功！', () => {
          this.$router.loadPage('/training/home/' + trainModes.answer)
        })
      },
      pause () {
        this.dp.pause()
        this.$$('.dplayer-icons-left').hide()
      },
      play () {
        this.dp.play()
        this.$$('.dplayer-icons-left').show()
      },
      showSubject () {
        this.paper.isShowVideo = true
        this.pause()
      }
    },
    mounted () {
      this.$nextTick(() => {
        let dplayerWrap = document.querySelectorAll('.dplayer')
        this.dp = new DPlayer({
          container: dplayerWrap[dplayerWrap.length - 1],
          autoplay: false,
          theme: '#FADFA3',
          loop: false,
          lang: 'zh-cn',
          screenshot: true,
          hotkey: true,
          preload: 'auto',
          // logo: 'logo.png',
          volume: 0.7,
          mutex: true,
          video: {
            // this.paper.moviePath
            // https://lightsns.oss-cn-qingdao.aliyuncs.com/demo_video.mp4
            url: this.paper.moviePath,
            // pic: require('../../../assets/icon_add.png'),
            type: 'auto'
          },
        })
        this.$$('.dplayer  .dplayer-setting').hide()
        this.$$('.dplayer .dplayer-full').hide()
        this.dp.on('timeupdate', () => {
          this.paper.currentVideoTime = Math.floor(this.dp.video.currentTime)
        })
        this.dp.on('ended', () => {
          this.$f7.alert('恭喜您完成视频培训', modalTitle, () => {
            this.$router.loadPage('/training/home/' + trainModes.video)
          })
        })
        this.dp.on('play', () => {
          this.paper.videoPlay ? this.play() : this.pause()
        })
        this.dp.on('canplay', () => {
          this.dp.seek(this.paper.currentVideoTime)
        })
        let layer = document.createElement('div')
        layer.style.position = 'absolute'
        layer.style.bottom = '33px'
        layer.style.width = 'calc(100% - 40px)'
        layer.style.height = '3px'
        layer.style.zIndex = '999'
        layer.style.padding = '5px 0'
        this.$$('.dplayer-controller').append(layer)
        // this.dp.seek(this.paper.currentVideoTime)
        // this.paper.videoPlay ? this.play() : this.pause()
      })
    },
    computed: {
      currentSubject () {
        let {currentProgress, subjects} = this.paper
        return subjects[currentProgress - 1]
      },
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
      'paper.currentVideoTime': {
        handler (nowTime, oldTime) {
          if (nowTime !== 0 && nowTime % this.step === 0 && !this.isLookVideoOver) {
            this.paper.videoPlay = false
            this.showSubject()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/answer.scss";
</style>