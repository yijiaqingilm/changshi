<template>
    <f7-page class='t-logs'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>培训记录</f7-nav-center>
        </f7-navbar>
        <h-list>
            <h-list-item desc="培训答题次数" :title="statics.train" unit="次"></h-list-item>
            <h-list-item desc="视频培训次数" :title="statics.video" unit="次"></h-list-item>
            <h-list-item desc="考试次数" :title="statics.examination" unit="次"></h-list-item>
        </h-list>
        <section>
            <list>
                <list-item v-for="(item,index) in historyList" :key="index" :title="item.sort.name" :score="item.score"
                           subTitle="2018-01-15"></list-item>
            </list>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </section>
    </f7-page>
</template>

<script>
  import TrainList from 'components/trainList/TrainList'
  import TrainListItem from 'components/trainList/TrainListItem'
  import { globalConst as native, pageSize, arr2obj } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'

  const sorts = {
    train: 0,
    test: 1,
    video: 2
  }
  const sortsValue = [
    {value: sorts.train, label: '答题'},
    {value: sorts.test, label: '考试'},
    {value: sorts.video, label: '视频'},
  ]
  const sortObj = arr2obj(sortsValue, 'value', 'label')
  export default {
    name: 'training-logs',
    data () {
      return {
        sortObj,
        page: 1,
        historyList: [],
        statics: {
          train: 0,
          video: 0,
          examination: 0
        }
      }
    },
    created () {
    },
    methods: {
      loadData ($state) {
        this.$store.dispatch({
          type: native.doTrainSubjectHistory,
          page: this.page,
        }).then(({data}) => {
          let items = data.history
          let {train_ans_num, videotraining, examinationnum} = data.statics
          this.statics = {
            train: train_ans_num,
            video: videotraining,
            examination: examinationnum
          }
          if (Array.isArray(items) && items.length > 0) {
            this.historyList = this.historyList.concat(items)
            $state.loaded()
            this.page += 1
          } else {
            $state.complete()
          }
          if (items.length < pageSize) {
            $state.complete()
          }
        })
      },
    },
    mounted () {
    },
    watch: {},
    components: {'list': TrainList, 'list-item': TrainListItem, InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/training.scss";
</style>