<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>遗留问题工单</f7-nav-center>
        </f7-navbar>
        <header class='detail-header'>
            <div>
                <div class="s-select">选择区域</div>
            </div>
            <div>
                <div class="s-select">作业点</div>
            </div>
        </header>
        <base-list :type="listType">
            <base-list-item @click="goDetail()" questionCount="5" questionLevel="嘻嘻嘻"></base-list-item>
            <base-list-item questionCount="5" questionLevel="嘻嘻嘻"></base-list-item>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </f7-page>
</template>

<script>
  import { baseListTypes, globalConst as native } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    name: '',
    data () {
      return {
        listType: baseListTypes.questionOrder,
        quesitonList: [],
        page: 1
      }
    },
    methods: {
      goDetail(order = {}){
        if (__DEBUG__) {
          order.id = 1
        }
        this.$router.loadPage(`/base/questionOrder/detail/${order.id}`)
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doLeaveQuestion,
          page: this.page,
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
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/questionOrder.scss";
</style>