<template>
    <div class='work-order-undone'>
        <base-list>
            <base-list-item
                    @click="goDetail"
                    showAction
                    workName="工单1"
                    workNo="工单号"
                    workClient="客户"
                    workMajor="专业"
                    workPoint="作业点">
            </base-list-item>
            <base-list-item
                    @click="goDetail"
                    showAction
                    workName="工单1"
                    workNo="工单号"
                    workClient="客户"
                    workMajor="专业"
                    workPoint="作业点">
            </base-list-item>
        </base-list>
    </div>
</template>

<script>
  export default {
    name: '',
    methods: {
      goDetail () {
        this.$router.loadPage('/base/workOrder/detail/1')
      }
    },
  }
</script>

<style lang="scss" scoped type="text/css">

</style>