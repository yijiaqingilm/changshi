<template>
    <f7-page class='home'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>长实智能维护</f7-nav-center>
        </f7-navbar>
        <section>
            <header class='h-header' v-if="sessionKey">
                <div class='h-avatar'>
                    <img src="../assets/icon_avatar.png" class='avatar' alt="">
                </div>
                <div class='h-title'>
                    <div>{{userInfo.empcode}}</div>
                    <div>{{userInfo.realname}}</div>
                </div>
                <div class='h-exit' @click="logout">
                    退出<span class='gt'></span>
                </div>
            </header>
            <header class='h-header' v-else>
                <div class='h-avatar'>
                    <img src="../assets/icon_avatar.png" class='avatar' alt="">
                </div>
                <div class='h-title'>
                    未登录
                </div>
                <div class='h-exit' @click="login">
                    登录<span class='gt'></span>
                </div>
            </header>
            <line-10></line-10>
            <template v-if="isManage">
                <section>
                    <base-title title="操作管理"></base-title>
                    <base-tabs>
                        <base-tab link="/sys/index" label="工单管理" :icon="iconSrc.mOrder"></base-tab>
                    </base-tabs>
                </section>
                <section>
                    <base-title title="数据统计"></base-title>
                    <base-tabs>
                        <base-tab label="基础维护数据" link="/bsc/base" :icon="iconSrc.mWeihu"></base-tab>
                        <base-tab label="资源管理数据" link="/bsc/manage" :icon="iconSrc.mZiyuan"></base-tab>
                        <base-tab label="在线培训数据" link="/bsc/train" :icon="iconSrc.mPeixun"></base-tab>
                    </base-tabs>
                </section>
            </template>
            <section>
                <base-title title="基础维护"></base-title>
                <base-tabs>
                    <base-tab label="作业填报" link="/base/fillOrder/index" :icon="iconSrc.orderAdd"></base-tab>
                    <base-tab label="我的工单" link="/base/workOrder/index" :icon="iconSrc.myOrder"></base-tab>
                    <base-tab label="遗留问题工单" link="/base/questionOrder/index" :icon="iconSrc.question"></base-tab>
                </base-tabs>
            </section>
            <section>
                <base-title title="资源管理"></base-title>
                <base-tabs>
                    <base-tab label="发电机管理" link="/rm/dynamotor" :icon="iconSrc.dynamo"></base-tab>
                    <base-tab label="车辆管理" link="/rm/vehicle" :icon="iconSrc.vehicle"></base-tab>
                    <base-tab label="记录管理" link="/rm/logs" :icon="iconSrc.logs"></base-tab>
                </base-tabs>
            </section>
            <section>
                <base-title title="在线培训"></base-title>
                <base-tabs>
                    <base-tab label="在线答题" link="/training/answer/main" :icon="iconSrc.online"></base-tab>
                    <base-tab label="在线视频" :icon="iconSrc.video"></base-tab>
                    <base-tab label="考试" :icon="iconSrc.test"></base-tab>
                    <base-tab label="培训记录" link="/training/logs" :icon="iconSrc.train"></base-tab>
                </base-tabs>
            </section>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native, modalTitle } from 'lib/const'
  import Vue from 'vue'
  import BaseTitle from 'components/baseTitle/BaseTitle'
  import BaseTabs from 'components/baseTabs/BaseTabs'
  import BaseTab from 'components/baseTabs/BaseTab'
  import globalMixin from 'mixins/globalMixin'

  export default {
    mixins: [globalMixin],
    data () {
      return {
        iconSrc: {
          orderAdd: require('../assets/icon_order_add.png'),
          myOrder: require('../assets/icon_order.png'),
          question: require('../assets/icon_question.png'),
          dynamo: require('../assets/icon_dynamo.png'),
          vehicle: require('../assets/icon_vehicle.png'),
          logs: require('../assets/icon_jilu.png'),
          online: require('../assets/icon_online.png'),
          video: require('../assets/icon_video.png'),
          train: require('../assets/icon_train.png'),
          test: require('../assets/icon_test.png'),

          mOrder: require('../assets/icon_m_order.png'),
          mPeixun: require('../assets/icon_m_peixun.png'),
          mWeihu: require('../assets/icon_m_weihu.png'),
          mZiyuan: require('../assets/icon_m_ziyuan.png')
        }
      }
    },
    created () {
    },
    methods: {
      login () {
        this.$router.reloadPage('/login')
      },
      logout () {
        this.$f7.confirm('确定退出登录？', modalTitle, () => {
          this.$store.commit(native.logout)
        })
      }
    },
    computed: {
      ...mapState({
        userInfo: ({auth}) => auth.userInfo,
        isManage: ({auth}) => auth.isManage,
        sessionKey: ({auth}) => auth.sessionKey
      })
    },
    components: {BaseTitle, BaseTabs, BaseTab}

  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>
