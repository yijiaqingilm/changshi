<template>
    <section>
        <answer-tabs>
            <answer-tab v-for="(train,index) in trainMajorList" :key="index" @click="goChooseLevel(train)">
                {{train.name}}
            </answer-tab>
        </answer-tabs>
    </section>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, trainTypeStatus } from 'lib/const'
  export default {
    data () {
      return {
        trainMajorList: []
      }
    },
    created () {
      this.$store.dispatch({
        type: native.doTrainMajor,
        category: trainTypeStatus.skill
      }).then(({data}) => {
        this.trainMajorList = data
      })
    },
    methods: {
      goChooseLevel (train) {
        // this.$router.loadPage()
        this.$router.load({
          url: `/training/answer/chooseLevel/${trainTypeStatus.skill}/${train.id}`,
          query: {name: train.name}
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
