<template>
    <div class='update-status'>
        <base-form-group class='title' label="发电机状态" isTitle></base-form-group>
        <base-radio-group v-model="status">
            <base-radio v-for="(info,index) in dyInfo"
                        :label="info.key"
                        name="info"
                        :key="index">
                {{info.value}}
            </base-radio>
        </base-radio-group>
        <f7-block>
            <f7-button full active big @click="submit">提交</f7-button>
        </f7-block>
    </div>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import { bus } from 'src/main'

  let dyStatus = {
    right: 1,
    waitMaintenace: 3,
    lose: 4,
    junk: 2,
    waitDispose: 5
  }
  let dyInfo = [
    {key: dyStatus.right, value: '正常'},
    {key: dyStatus.waitMaintenace, value: '待维修'},
    {key: dyStatus.lose, value: '丢失'},
    {key: dyStatus.junk, value: '待报废'},
    {key: dyStatus.waitDispose, value: '待处理'}
  ]
  export default {
    data () {
      return {
        dyStatus,
        dyInfo,
        status: dyStatus.right
      }
    },
    created () {
      bus.$on('changeDyStatus', (status) => {
        console.log('changeDy', status)
        this.status = status
      })
    },
    methods: {
      submit () {
        this.$store.dispatch({
          type: native.doDynamotorUpdateStatus,
          status: this.status,
          code: this.dy.code
        })
      }
    },
    computed: {
      ...mapState({
        dy: ({base}) => base.dy
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .update-status {
        padding: 35px;
    }
</style>
