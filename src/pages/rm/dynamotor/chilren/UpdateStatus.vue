<template>
    <div>
        <base-form-group class="title" label="发电机编码" isTitle>
            <input type="text" placeholder='请扫描'>
        </base-form-group>
        <line-10></line-10>
        <base-form-group class='title' label="发电机存放点" isTitle></base-form-group>
        <base-radio-group v-model="status">
            <base-radio v-for="(info,index) in dyInfo"
                        :label="info.key"
                        name="info"
                        :key="index">
                {{info.value}}
            </base-radio>
        </base-radio-group>
        <line-10></line-10>
    </div>
</template>

<script type="text/ecmascript-6">
  let dyStatus = {
    right: 0,
    waitMaintenace: 1,
    lose:2,
    junk:3
  }
  let dyInfo = [
    {key: dyStatus.right, value: '正常'},
    {key: dyStatus.waitMaintenace, value: '待维修'},
    {key: dyStatus.lose, value: '丢失'},
    {key: dyStatus.junk, value: '待报废'},
  ]
  export default {
    data () {
      return {
        dyStatus,
        dyInfo,
        status: dyStatus.right
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>
