<template>
    <div>
        <base-list :type="type">
            <base-list-item :hasDetail="false"></base-list-item>
        </base-list>
    </div>
</template>

<script type="text/ecmascript-6">
  import { baseListTypes } from 'lib/const'
  export default {
    data () {
      return {
        type: baseListTypes.veLogs
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>
