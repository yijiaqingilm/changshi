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
                            @click="goDetail(work)"
                            v-for="(work,index) in workList"
                            :key="index"
                            :workName="work.id"
                            :workNo="work.number"
                            :workClient="work.client"
                            :workMajor="work.major"
                            :workSort="work.work_sort"
                            :workCreateTime="work.created_at"
                            :workPoint="work.work_base"
                            @apply:noPass="handleApplyNoPass(work,index)"
                            @apply:pass="handleApplyPass(work,index)">
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
        page: 1,
        query: {
          workBase: '',
          client: '',
          province: '',
          city: '',
          district: '',
          major: ''
        }
      }
    },
    methods: {
      goDetail (order) {
        this.$router.loadPage(`/base/workOrder/detail/${order.id}`)
      },
      changeWorkBase (result) {
        let {workBase, client, province, city, district, major} = result
        this.query = {
          workBase,
          client,
          province,
          city,
          district,
          major
        }
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
      handleApplyNoPass (work, index) {
        this.$f7.confirm('是否确认审核不通过', modalTitle, () => {
          this.$store.dispatch({
            type: native.doWorkNumberDeny,
            work_id: work.id
          }).then(() => {
            this.workList.splice(index, 1)
          })
        })
      },
      handleApplyPass (work, index) {
        this.$f7.confirm('是否确认审核通过', modalTitle, () => {
          this.$store.dispatch({
            type: native.doWorkNumberAccess,
            work_id: work.id
          }).then(() => {
            this.workList.splice(index, 1)
          })
        })
      },
      loadData ($state) {
        let {workBase, client, major, province, city, district} = this.query
        this.$store.dispatch({
          type: native.doWorkNumberManage,
          page: this.page,
          work_base: workBase,
          client,
          major,
          province,
          city,
          district
        }).then(({data}) => {
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