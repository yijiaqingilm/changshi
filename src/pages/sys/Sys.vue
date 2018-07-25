<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>工单管理</f7-nav-center>
        </f7-navbar>
        <div class='detail-header'>
            <div class="city">
                <div><span class='s-select' @click="showPopup">{{currentAddress}}</span></div>
            </div>
            <div class='point'>
                <div class="s-select">作业点</div>
            </div>
        </div>
        <base-list :type="listType">
            <base-list-item showAction
                            @apply:noPass="handleApplyNoPass('test')"
                            @apply:pass="handleApplyPass('test2')">
            </base-list-item>
            <base-list-item showAction
                            @apply:noPass="handleApplyNoPass('test')"
                            @apply:pass="handleApplyPass('test2')">
            </base-list-item>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </f7-page>
</template>

<script>
  import { baseListTypes, globalConst as native, workOrderTypeStatus, pageSize } from 'lib/const'
  import { mapState } from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: '',
    data () {
      return {
        listType: baseListTypes.sysOrder,
        workList: []
      }
    },
    methods: {
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      handleApplyNoPass (value) {
        console.log('value', value)
      },
      handleApplyPass (value) {
        console.log('value', value)
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
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
      currentAddress () {
        let currentAddress = this.activeAddress.provinceName + this.activeAddress.cityName + this.activeAddress.districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      }
    },
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">
</style>