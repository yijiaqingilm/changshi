<template>
    <div class='work-order-undone'>
        <base-list>
            <base-list-item
                    v-for="(order,index) in workList"
                    :key="index"
                    @click="goDetail(order)"
                    @workOrder:del="hanleDel(order,index)"
                    @workOrder:edit="handleEdit(order,index)"
                    @workOrder:apply="handleApply(order,index)"
                    showAction
                    :workName="order.id"
                    :workNo="order.number"
                    :workClient="order.client"
                    :workMajor="order.major"
                    :workCreateTime="order.created_at"
                    :workSort="order.work_sort"
                    :workPoint="order.work_base">
            </base-list-item>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </div>
</template>
<script>
  import { globalConst as native, pageSize, workOrderTypeStatus, modalTitle } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
  import { mapState } from 'vuex'
  import { bus } from 'src/main'

  export default {
    name: '',
    data () {
      return {
        page: 1,
        workList: [],
      }
    },
    methods: {
      goDetail (order) {
        this.$router.loadPage(`/base/workOrder/detail/${order.id}`)
      },
      hanleDel (order = {}, index) {
        this.$f7.confirm('是否确定该工单作废？', modalTitle, () => {
          this.$store.dispatch({
            type: native.doWorkNumberCancel,
            work_id: order.id
          }).then((data) => {
            this.statics.unariched--
            this.statics.total--
            this.workList.splice(index, 1)
          }).catch((error) => {
            this.$f7.alert(error, modalTitle)
          })
        })
      },
      handleEdit (order = {}, index) {
        this.$router.loadPage(`/base/workOrder/edit/${order.id}`)
      },
      handleApply (order = {}, index) {
        if (order.is_leave_question === 'Y') {
          this.$f7.alert('该工单存在遗留问题，不能提交审核', modalTitle)
          return
        }
        this.$f7.confirm('请确认所有填报信息完整再提交审核？', modalTitle, () => {
          this.$store.dispatch({
            type: native.doWorkNumberApprove,
            work_id: order.id
          }).then((data) => {
            this.workList.splice(index, 1)
            this.statics.approve++
            this.statics.unariched--
            console.log('emit??===>>')
            bus.$emit(native.clearReviewOrder)
          }).catch((error) => {
            this.$f7.alert(error, modalTitle)
          })
        })
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doWorkNumber,
          page: this.page,
          approve: workOrderTypeStatus.undone
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
    computed: {
      ...mapState({
        statics: ({base}) => base.workNumberStatics
      })
    },
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>