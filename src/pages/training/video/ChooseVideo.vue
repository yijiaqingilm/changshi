<template>
    <f7-page class=''>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>视频选择</f7-nav-center>
        </f7-navbar>
        <section>
            <f7-block-title class="header">{{name}}专业题库</f7-block-title>
            <section v-for="(videoInfo,index) in videoList" @click="goBegin(videoInfo)">
                <f7-card>
                    <f7-card-content :inner="false">
                        <img class='video-img' :src="videoInfo.img" alt="">
                    </f7-card-content>
                    <f7-card-footer>视频{{index+1}} <span>进入视频培训 &gt;&gt;</span></f7-card-footer>
                </f7-card>
            </section>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native, trainObj, trainModes, modalTitle } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'beginAnswer',
    data () {
      return {
        videoList: [],
        name: ''
      }
    },
    created () {
      if (this.$route.options && this.$route.options.query) {
        this.name = this.$route.options.query.name
      }
      this.$store.dispatch({
        type: native.doVideoList,
        refid: this.currentSubject.levelId
      }).then((data) => {
        this.videoList = data.data
      })
    },
    computed: {
      ...mapState({currentSubject: ({answer}) => answer.currentSubject})
    },
    methods: {
      goBegin (videoInfo) {
        let {commit} = this.$store
        commit(native.resetPaper)
        this.$store.commit(native.setVideoPath, videoInfo.path)
        this.$router.loadPage('/training/begin')
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/chooseVideo.scss";
</style>