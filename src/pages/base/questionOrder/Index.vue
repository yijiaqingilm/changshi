<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>遗留问题工单</f7-nav-center>
        </f7-navbar>
        <div class='detail-header'>
            <div class="city">
                <div><span class='s-select' @click="showPopup">{{currentAddress}}</span></div>
            </div>
            <div class='point'>
                <div v-if='workBaseList && workBaseList.length>0'>
                    <base-select v-model='workBase'
                                 text="请选择作业点"
                                 :data="workBaseList"
                                 nodeKey="id"
                                 @change="changePoint"
                                 nodeLabel="work_base"></base-select>
                </div>
                <div v-else class='hint'>
                    没有可选择的作业点
                </div>
            </div>
        </div>
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
        workBaseList: []
      }
    },
    methods: {
      changePoint () {
        this.page = 1
        this.quesitonList = []
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      goDetail (order = {}) {
        if (__DEBUG__) {
          order.id = 1
        }
        this.$router.loadPage(`/base/questionOrder/detail/${order.id}`)
      },
      resetData () {
        console.log('nowAddress')
        this.page = 1
        this.questionList = []
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doLeaveQuestion,
          page: this.page,
          work_id: 1,
          province: this.activeAddress.provinceName,
          city: this.activeAddress.cityName,
          district: this.activeAddress.districtName
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
      changePointList () {
        let {provinceName, cityName, districtName} = this.activeAddress
        if (!provinceName || !cityName || !districtName) {
          return
        }
        this.$store.dispatch({
          type: native.doGetWorkBase,
          province: provinceName,
          city: cityName,
          district: districtName,
        }).then((data) => {
          let workBase = data.data.work_base
          if (workBase && Array.isArray(workBase)) {
            this.workBaseList = workBase
          }
        })
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
      currentAddress () {
        let {provinceName, cityName, districtName} = this.activeAddress
        let currentAddress = provinceName + cityName + districtName
        if (provinceName && cityName && districtName) {
          this.changePointList()
        }
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    },
    watch: {
      'activeAddress': {
        handler: function (nowAddress, oldAddress) {
          this.resetData()
        },
        deep: true
      }
    },
    components: {InfiniteLoading}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/questionOrder.scss";
</style>