<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回"></f7-nav-left>
            <f7-nav-center>收益明细</f7-nav-center>
        </f7-navbar>
        <f7-list media-list>
            <f7-list-item v-for="(income,index) in incomeList"
                          :key="index"
                          :subtitle="income.createdAt | dateFormat"
                          :title="itemTitle(income)">
                <div slot="after" class="unit">
                    <div v-if="income.source===incomeStatus.reading">
                        {{income.amount}}麦豆
                    </div>
                    <div v-else>
                        {{income.amount}}元
                    </div>
                </div>
            </f7-list-item>
        </f7-list>
        <infinite-loading @infinite="loadData">
            <div slot="no-result">没有数据</div>
            <div slot="no-more">没有更多数据</div>
        </infinite-loading>
    </f7-page>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import { globalConst as native, pageSize, incomeStatusInfo, incomeStatus, orderStatus } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: '',
    data () {
      return {
        page: 1,
        incomeList: [],
        incomeStatus,
        incomeStatusInfo
      }
    },
    created () {

    },
    methods: {
      itemTitle (income) {
        let prefix = ''
        switch (income.status) {
          case orderStatus.undone:
            prefix = '<span class="order_undone">在途</span>'
            break
          case orderStatus.lose:
            prefix = '<span class="order_lose">失效</span>'
            break
          case orderStatus.complete:
          default:
            break
        }
        return `${prefix}订单号：<span class='order_number'>${income.sourceInfo}</span>`
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doIncomeList,
          page: this.page
        }).then(({data}) => {
          console.log('data', data)
          if (Array.isArray(data) && data.length > 0) {
            this.incomeList = this.incomeList.concat(data)
            $state.loaded()
            this.page += 1
          } else {
            $state.complete()
          }
          if (data.length < pageSize) {
            $state.complete()
          }
        })
      }
    },
    computed: {
      ...mapState({})
    },
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">
    .unit {
        color: green;
    }
</style>