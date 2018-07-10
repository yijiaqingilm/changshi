<template>
    <f7-page class='home'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>麦芽同盟会</f7-nav-center>
        </f7-navbar>
        <section>
            <header class='h-header'>
                <div class='h-title'>
                    <div>mingc</div>
                    <div>退出</div>
                </div>
                <div class='h-banner'>
                    xxx
                </div>
            </header>
            <section class='h-module'>
                <header class='m-header'>基础维护</header>
                <section class='m-body'>
                    <div>作业填报</div>
                    <div>我的工单</div>
                    <div>遗留问题工单</div>
                </section>
            </section>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import Vue from 'vue'

  export default {
    data () {
      return {}
    },
    created () {
      console.log('测试', __DEBUG__)
    },
    methods: {},
    computed: {},
    components: {}

  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>
