<template>
    <section>
        <answer-tabs>
            <answer-tab v-for="(item,index) in dataList" :key="index" @click="goChooseLevel(item)">
                {{item.name}}
            </answer-tab>
        </answer-tabs>
    </section>
</template>

<script>
  import { globalConst as native, trainTypeStatus, trainModes } from 'lib/const'

  export default {
    props: {
      type: [Number, String],
      mode: [Number, String]
    },
    data () {
      return {
        dataList: []
      }
    },
    created () {
      let queryType = ''
      switch (this.mode >>> 0) {
        case trainModes.video:
          queryType = native.doTrainMajor2Movie
          break
        case trainModes.test:
        case trainModes.answer:
        default:
          queryType = native.doTrainMajor
      }
      this.$store.dispatch({
        type: queryType,
        category: this.type
      }).then(({data}) => {
        this.dataList = data
      })
    },
    methods: {
      goChooseLevel (item) {
        this.$router.load({
          url: `/training/chooseLevel/${this.type}/${item.id}`,
          query: {name: item.name}
        })
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .form-group {
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        padding: 30px;
    }
</style>