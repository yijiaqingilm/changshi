<template>
    <div class='update-status' v-if="dy && dy.code">
        <base-form-group class='title' label="发电机状态" isTitle></base-form-group>
        <base-radio-group v-model="dy.status">
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
    <f7-block v-else>
        <div class='hint text-center'>请扫描发电机编码</div>
    </f7-block>
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
      }
    },
    created () {
    },
    methods: {
      submit () {
        this.$store.dispatch({
          type: native.doDynamotorUpdateStatus,
          status: this.dy.status,
          code: this.dyCode
        })
      }
    },
    computed: {
      ...mapState({
        dyCode: ({rm}) => rm.dyCode,
        dy: ({base}) => base.dy,
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .update-status {
        padding: 35px;
    }
</style>
