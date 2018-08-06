<template>
    <div>
        <base-list :type="type">
            <base-list-item v-for="(dy,index) in dynamotorList"
                            :workName="dy.id"
                            :dyCode="dy.powercode"
                            :dyHandle="dy.action"
                            :dyStartTime="dy.start_time"
                            :dyEndTime="dy.end_time"
                            :dyTime="dy.end_time"
                            :key="index" :hasDetail="false">
            </base-list-item>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </div>
</template>

<script type="text/ecmascript-6">
  import { baseListTypes, globalConst as native, pageSize } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
    // 状态：1使用，2修订地址，3变更状态
  export default {
    data () {
      return {
        type: baseListTypes.dyLogs,
        page: 1,
        dynamotorList: []
      }
    },
    methods: {
      loadData ($state) {
        this.$store.dispatch({
          type: native.doDynamotorHistory,
          page: this.page,

        }).then(({data}) => {
          console.log('data', data)
          if (Array.isArray(data) && data.length > 0) {
            this.dynamotorList = this.dynamotorList.concat(data)
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
