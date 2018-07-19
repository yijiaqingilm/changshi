<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>遗留问题工单</f7-nav-center>
        </f7-navbar>
        <header class='detail-header'>
            <div>
                <div class="s-select">选择区域</div>
            </div>
            <div>
                <div class="s-select">作业点</div>
            </div>
        </header>
        <base-list :type="listType">
            <base-list-item questionCount="5" questionLevel="嘻嘻嘻"></base-list-item>
            <base-list-item questionCount="5" questionLevel="嘻嘻嘻"></base-list-item>
        </base-list>
    </f7-page>
</template>

<script>
  import { baseListTypes } from 'lib/const'

  export default {
    name: '',
    data () {
      return {
        listType: baseListTypes.questionOrder
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/questionOrder.scss";
</style>