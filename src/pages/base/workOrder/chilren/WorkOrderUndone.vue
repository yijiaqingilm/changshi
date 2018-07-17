<template>
    <div class='work-order-undone'>
        <list>
            <list-item
                    @click="goDetail"
                    showAction
                    workName="工单1"
                    workNo="工单号"
                    workClient="客户"
                    workMajor="专业"
                    workPoint="作业点">
            </list-item>
        </list>
    </div>
</template>

<script>
  import List from './WorkOrderList'
  import ListItem from './WorkORderListItem'

  export default {
    name: '',
    methods: {
      goDetail () {

      }
    },
    components: {List, ListItem}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>