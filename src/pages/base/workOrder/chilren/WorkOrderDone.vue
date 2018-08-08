<template>
    <div class='work-order-review'>
        <base-list>
            <base-list-item
                    v-for="(order,index) in workList"
                    :key="index"
                    @click="goDetail(order)"
                    :workName="order.id"
                    :workNo="order.number"
                    :workSort="order.work_sort"
                    :workClient="order.client"
                    :workMajor="order.major"
                    :workPassTime="order.approve_at"
                    :workPoint="order.work_base_name">
            </base-list-item>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </div>
</template>
<script>
  import { globalConst as native, pageSize, workOrderTypeStatus } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: '',
    data () {
      return {
        page: 1,
        workList: []
      }
    },
    methods: {
      goDetail (order) {
        this.$router.loadPage(`/base/workOrder/detail/${order.id}`)
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doWorkNumber,
          page: this.page,
          approve: workOrderTypeStatus.done

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
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>