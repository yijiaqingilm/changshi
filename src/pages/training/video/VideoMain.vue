<template>
    <f7-page class='video'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center><!--视频答题--></f7-nav-center>
        </f7-navbar>
        <section>
            <header>
                <div class='v-h-title'>
                    已观看时间：xxx分钟
                </div>
                <div>
                    <d-player ref="player"></d-player>
                </div>
            </header>
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
  import VueDPlayer from 'vue-dplayer'

  export default {
    name: 'videoMain',
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      play () {
        console.log('play callback')
      }
    },
    mounted () {
      const player = this.$refs.player.dp
      console.log('this.', this.$refs.player)
      player.play()
      setTimeout(() => {
        player.pause()
      }, 2000)
    },
    components: {'d-player': VueDPlayer}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>