<template>
    <div>
        <base-list :type="type">
            <base-list-item :hasDetail="false"
                            :key="index"
                            :workName="car.id"
                            :veInfo="car.carnumber"
                            :veStartTime="car.out"
                            :veEndTime="car.retract"
                            :vePath="car.mileage"
                            :veTotal="car.totalfee"
                            v-for="(car,index) in carList">
            </base-list-item>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </base-list>
    </div>
</template>

<script type="text/ecmascript-6">
  import InfiniteLoading from 'vue-infinite-loading'
  import { baseListTypes, globalConst as native, pageSize } from 'lib/const'

  export default {
    data () {
      return {
        type: baseListTypes.veLogs,
        carList: [],
        page: 1
      }
    },
    methods: {
      loadData ($state) {
        this.$store.dispatch({
          type: native.doCarHistory,
          page: this.page,

        }).then(({data}) => {
          console.log('data', data)
          if (Array.isArray(data) && data.length > 0) {
            this.carList = this.carList.concat(data)
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
