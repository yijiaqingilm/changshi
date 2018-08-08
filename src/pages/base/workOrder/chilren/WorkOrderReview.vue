<template>
    <div class='work-order-review'>
        <base-list>
            <base-list-item
                    v-for="(order,index) in workList"
                    :key="index"
                    @click="goDetail(order)"
                    :workName="order.id"
                    :workNo="order.number"
                    :workClient="order.client"
                    :workMajor="order.major"
                    :workCheckTime="order.approve_at"
                    :workPoint="order.work_base">
            </base-list-item>
            <infinite-loading ref="loadComponent" @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </div>
</template>
<script>
  import { globalConst as native, pageSize, workOrderTypeStatus } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
  import { mapState } from 'vuex'
  import { bus } from 'src/main'

  export default {
    name: '',
    data () {
      return {
        workList: [],
        page: 1
      }
    },
    created () {
      bus.$on([native.clearReviewOrder], () => {
        this.resetData()
      })
    },
    methods: {
      goDetail (order) {
        this.$router.loadPage(`/base/workOrder/detail/${order.id}`)
      },
      resetData () {
        this.$refs.loadComponent.$emit('$InfiniteLoading:reset')
        this.page = 1
        this.workList = []
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doWorkNumber,
          page: this.page,
          approve: workOrderTypeStatus.review
        }).then(({data}) => {
          console.log('data', data)
          if (Array.isArray(data) && data.length > 0) {
            this.workList = this.workList.concat(data)
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
    computed: {},
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>