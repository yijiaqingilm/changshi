<template>
    <f7-page class='t-logs'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>培训记录</f7-nav-center>
        </f7-navbar>
        <h-list>
            <h-list-item desc="培训答题次数" title="263" unit="次"></h-list-item>
            <h-list-item desc="视频培训次数" title="263" unit="次"></h-list-item>
            <h-list-item desc="考试次数" title="263" unit="次"></h-list-item>
        </h-list>
        <section>
            <div class='list'>
                <div class="list-item">
                    <div class='item-panal'>
                        <div class='item-title'>
                            <div>答题惩戒</div>
                            <div>88分米</div>
                        </div>
                        <div class='item-subtitle'>2018-07</div>
                    </div>
                    <line-10></line-10>
                </div>
                <div class="list-item">
                    <div class='item-panal'>
                        <div class='item-title'>
                            <div>答题惩戒</div>
                            <div>88分米</div>
                        </div>
                        <div class='item-subtitle'>2018-07</div>
                    </div>
                    <line-10></line-10>
                </div>
            </div>
        </section>
    </f7-page>
</template>

<script>
  export default {
    name: 'training-logs',
    data () {
      return {}
    },
    created () {
    },
    methods: {},
    mounted () {
    },
    watch: {}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/training.scss";
</style>