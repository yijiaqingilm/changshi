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
            <section v-if='isShow' class='subject'>
                <div>答题进度：1 -9</div>
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
            <footer>
                <f7-button @click="doAnswer()">确认</f7-button>
            </footer>
        </section>
    </f7-page>
</template>

<script>
  // import VueDPlayer from 'vue-dplayer'
  import DPlayer from 'dplayer'

  export default {
    name: 'videoMain',
    data () {
      return {
        isShow: false,
        dp: null,
        currentTime: 0,
        step: 2

      }
    },
    created () {
    },
    methods: {
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
        this.dp = new DPlayer({
          container: document.querySelector('.dplayer'),
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