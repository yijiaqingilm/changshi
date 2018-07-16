<template>
    <f7-page class='work-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>我的工单</f7-nav-center>
        </f7-navbar>
        <h-list>
            <h-list-item desc="工单总数">
                <div slot="title"><span>263</span>单</div>
            </h-list-item>
            <h-list-item desc="未归档工单">
                <div slot="title"><span>263</span>单</div>
            </h-list-item>
            <h-list-item desc="待审核工单">
                <div slot="title"><span>263</span>单</div>
            </h-list-item>
            <h-list-item desc="已归档工单">
                <div slot="title"><span>263</span>单</div>
            </h-list-item>
        </h-list>
        <section>
            <base-tabs v-model="workOrderType">
                <tab title="未归档" value="1" active></tab>
                <tab title="待审核" value="2" ></tab>
                <tab title="已归档" value="3" ></tab>
            </base-tabs>
            <f7-tabs animated>
                <f7-tab class="tab-0" active>
                    <section class='subject'>
                        <header class='s-title'>1.xxx</header>
                        <section class='s-body'>
                            <f7-list form>
                                <f7-list-item checkbox name="t-c-1" value="A" title="Checkbox A"></f7-list-item>
                                <f7-list-item checkbox name="t-c-1" value="B" title="Checkbox B"></f7-list-item>
                                <f7-list-item checkbox name="t-c-1" value="C" title="Checkbox C"></f7-list-item>
                            </f7-list>
                        </section>
                        <footer class='s-footer'>
                            <div>回答正确，正确答案：A</div>
                            <div>答案解析：xxx</div>
                        </footer>
                    </section>
                </f7-tab>
                <f7-tab class="tab-1">
                    <section class='subject'>
                        <header class='s-title'>2.xxx</header>
                        <section class='s-body'>
                            <f7-list form>
                                <f7-list-item checkbox name="t-c-2" value="A1" title="Checkbox Ax"></f7-list-item>
                                <f7-list-item checkbox name="t-c-2" value="B1" title="Checkbox Bx"></f7-list-item>
                                <f7-list-item checkbox name="t-c-2" value="C2" title="Checkbox Cx"></f7-list-item>
                            </f7-list>
                        </section>
                        <footer class='s-footer'>
                            <div>回答正确，正确答案：B</div>
                            <div>答案解析：xxx</div>
                        </footer>
                    </section>
                </f7-tab>
            </f7-tabs>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import HList from './chilren/HList.vue'
  import HListItem from './chilren/HListItem.vue'
  export default {
    name: 'workOrder',
    data () {
      return {
        workOrderType: 1
      }
    },
    created () {
    },
    computed: {},
    methods: {},
    mounted () {
    }, components: {HList, HListItem}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>