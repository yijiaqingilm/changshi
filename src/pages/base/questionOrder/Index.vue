<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>遗留问题工单({{total}})</f7-nav-center>
        </f7-navbar>
        <div class='detail-header'>
            <base-work-base @changeWorkBase="changeWorkBase" hasLevel></base-work-base>
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
            <div v-if="!isLoadData" class='hint text-center'>请选择作业作业点查询数据</div>
            <infinite-loading v-else ref="loadComponent" @infinite="loadData">
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
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'

  export default {
    name: '',
    data () {
      return {
        listType: baseListTypes.questionOrder,
        quesitonList: [],
        page: 1,
        workBaseList: [],
        isLoadData: false,
        query: {
          workBase: '',
          client: '',
          province: '',
          city: '',
          district: '',
          major: ''
        },
        total: 0
      }
    },
    methods: {
      changeWorkBase (result) {
        let {workBase, client, province, city, district, major, level} = result
        this.query = {
          workBase,
          client,
          province,
          city,
          district,
          major,
          level
        }
        if (!this.isLoadData) {
          this.isLoadData = true
          this.$nextTick(() => {
            this.$refs.loadComponent.attemptLoad()
          })
        } else {
          this.page = 1
          this.quesitonList = []
          this.$refs.loadComponent.$emit('$InfiniteLoading:reset')
        }

      },
      goDetail (order = {}) {
        this.$router.loadPage(`/base/questionOrder/detail/${order.id}`)
      },
      loadData ($state) {
        let {workBase, client, major, province, city, district, level} = this.query
        this.$store.dispatch({
          type: native.doLeaveQuestion,
          page: this.page,
          work_base: workBase,
          client,
          major,
          province,
          city,
          district,
          level
        }).then(({data}) => {
          console.log('data', data)
          let items = data.items
          this.total = data.num
          if (Array.isArray(items) && items.length > 0) {
            this.quesitonList = this.quesitonList.concat(items)
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
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
    },
    components: {InfiniteLoading, BaseWorkBase}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/questionOrder.scss";
</style>