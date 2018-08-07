<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>工单管理</f7-nav-center>
        </f7-navbar>
        <div class='detail-header'>
            <base-work-base @changeWorkBase="changeWorkBase"></base-work-base>
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
            <div v-if="!isLoadData" class='hint text-center'>请选择作业作业点查询数据</div>
            <infinite-loading v-else ref="loadComponent" @infinite="loadData">
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
  import BaseWorkBase from 'components/baseWorkBase/BaseWorkBase'
  import { modalTitle } from '../../lib/const'

  export default {
    name: '',
    data () {
      return {
        listType: baseListTypes.sysOrder,
        workList: [],
        isLoadData: false,
        workBase: ''
      }
    },
    methods: {
      changeWorkBase (result) {
        let {workBase} = result
        this.workBase = workBase
        if (!this.isLoadData) {
          this.isLoadData = true
          this.$nextTick(() => {
            this.$refs.loadComponent.attemptLoad()
          })
        } else {
          this.page = 1
          this.workList = []
          this.$refs.loadComponent.$emit('$InfiniteLoading:reset')
        }

      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      handleApplyNoPass (value) {
        this.$f7.confirm('是否确认审核通过', modalTitle, () => {
          console.log('value', value)
          this.$store.dispatch({
            type: native.doWorkNumberAccess,
            work_id: 'xxx'
          })
        })

      },
      handleApplyPass (value) {
        this.$f7.confirm('是否确认审核不通过', modalTitle, () => {
          console.log('value', value)
          this.$store.dispatch({
            type: native.doWorkNumberDeny,
            work_id: 'xxx'
          })
        })
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doWorkNumberManage,
          page: this.page,
          work_base: this.workBase,
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
    components: {InfiniteLoading, BaseWorkBase}
  }
</script>

<style lang="scss" scoped type="text/css">
</style>