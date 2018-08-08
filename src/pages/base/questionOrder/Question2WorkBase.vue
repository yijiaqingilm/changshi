<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>遗留问题工单</f7-nav-center>
        </f7-navbar>
        <div class='detail-header'>
        </div>
        <base-list :type="listType">
            <base-list-item v-for="(question,index) in quesitonList"
                            :key="index"
                            :workName="question.id"
                            :workNo="question.number"
                            :questionCount="question.num"
                            :questionLevel="question.level"
                            :workCreateTime="question.created_at"
                            @click="goDetail(question)"></base-list-item>
            <infinite-loading ref="loadComponent" @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </f7-page>
</template>

<script>
  import { baseListTypes, globalConst as native, pageSize } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
  import { mapState } from 'vuex'

  export default {
    name: '',
    data () {
      return {
        listType: baseListTypes.questionOrder,
        quesitonList: [],
        page: 1,
        workBaseList: [],
        workBase: '',
      }
    },
    created () {
      if (this.$route.params) {
        this.workBase = this.$route.params.id
      }
    },
    methods: {
      goDetail (order = {}) {
        this.$router.loadPage(`/base/questionOrder/detail/${order.id}`)
      },
      loadData ($state) {
        let {workBase} = this
        this.$store.dispatch({
          type: native.doLeaveQuestion,
          page: this.page,
          work_base: workBase,
        }).then(({data}) => {
          console.log('data', data)
          if (Array.isArray(data) && data.length > 0) {
            this.quesitonList = this.quesitonList.concat(data)
            $state.loaded()
            this.page += 1
          } else {
            $state.complete()
          }
          if (data.length < pageSize) {
            $state.complete()
          }
        })
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
    },
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/questionOrder.scss";
</style>