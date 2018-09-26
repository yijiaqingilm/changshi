<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>选择专业级别</f7-nav-center>
        </f7-navbar>
        <section>
            <f7-block-title class="header">{{name}}专业题库</f7-block-title>
            <template v-if="currentTrainMode!==trainModes.test">
                <f7-list>
                    <f7-list-item v-for="(level,index) in levelList" @click="chooseLevel(level)" :key="index" link
                                  :title="level.name"></f7-list-item>
                </f7-list>
            </template>
            <template v-else>
                <list>
                    <list-item v-for="(level,index) in levelList"
                               @click="chooseLevel(level)"
                               :key="index"
                               :title="level.level.name"
                               :startTime="level.start_time"
                               :endTime="level.end_time"
                               :limit="level.limit_long"></list-item>
                </list>
            </template>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native, trainModes } from 'lib/const'
  import { mapState } from 'vuex'
  import TestList from 'components/testList/TestList'
  import TestListItem from 'components/testList/TestListItem'
  import { modalTitle } from '../../lib/const'

  export default {
    name: '',
    data () {
      return {
        trainModes,
        majorId: '',
        categoryId: '',
        name: '',
        levelList: []
      }
    },
    created () {
      this.majorId = this.$route.params.id
      this.categoryId = this.$route.params.typeId
      if (this.$route.options && this.$route.options.query) {
        this.name = this.$route.options.query.name
      }
      switch (this.currentTrainMode) {
        case trainModes.test:
          this.$store.dispatch({
            type: native.doTrainSubjectExm,
            category: this.categoryId,
            major_id: this.majorId
          }).then(({data}) => {
            this.levelList = data
          })
          break
        case trainModes.video:
          this.$store.dispatch({
            type: native.doTrainLevel2Movie,
            category: this.categoryId,
            major_id: this.majorId
          }).then(({data}) => {
            this.levelList = data
          })
          break
        case trainModes.answer:
        default:
          this.$store.dispatch({
            type: native.doTrainLevel,
            category: this.categoryId,
            major_id: this.majorId
          }).then(({data}) => {
            this.levelList = data
          })
          break
      }
    },
    computed: {
      ...mapState({
        currentTrainMode: ({answer}) => answer.currentTrainMode
      })
    },
    methods: {
      chooseLevel (level) {
        let {commit} = this.$store
        commit(native.resetPaper)
        commit(native.setCurrentSubject, {
          levelId: level.refid,
          trainType: this.categoryId,
          major: this.majorId
        })
        if (this.currentTrainMode === trainModes.test) {
          this.$store.dispatch({
            type: native.startTest,
            refid: level.refid
          }).then((data) => {
            let status = data.data
            if (__DEBUG__) {
              this.$router.loadPage('/training/begin')
            }
            if (status === 0) {
              this.$router.loadPage('/training/begin')
            } else if (status === 1) {
              this.$f7.alert('未到考试时间', modalTitle)
            } else {
              this.$f7.alert('已过期考试', modalTitle)
            }

          })
        } else if (this.currentTrainMode === trainModes.video) {
          this.$router.loadPage('/training/chooseVideo')
        } else {
          this.$router.loadPage('/training/begin')
        }

      },
    },
    components: {'list': TestList, 'list-item': TestListItem}
  }
</script>

<style lang="scss" scoped type="text/css">
    .header {
        margin: 0;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: #f5f5f5;
    }
</style>