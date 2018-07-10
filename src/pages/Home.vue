<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>麦芽同盟会</f7-nav-center>
        </f7-navbar>
        <f7-list media-list>
            <f7-list-item
                    :media="profileAvatar"
                    :subtitle="profileSubTitle"
                    :title="'会员名称：'+ profile.nickName">
            </f7-list-item>
        </f7-list>
        <f7-block>
            <home-list>
                <home-list-item title="可提现金额">
                    <div slot="after" class="active">
                        <span class='strong'>{{profile.order_balance}}<span>元</span></span>
                    </div>
                </home-list-item>
                <home-list-item title="累计收益总金额" :after="profile.order_amount+'<span>元</span>'"></home-list-item>
                <home-list-item title="已待结算金额" after="2540<span>元</span>"></home-list-item>
                <home-list-item title="已提现金额" :after="profile.order_used+'<span>元</span>'"></home-list-item>
            </home-list>
        </f7-block>
        <f7-list>
            <f7-list-item title="收益明细" link='/income'></f7-list-item>
            <f7-list-item title="推荐文章" link='/article/list'></f7-list-item>
            <f7-list-item title="规则说明" link='/rule'></f7-list-item>
            <f7-list-item title="申请提现" link='/deposit'></f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import HomeList from 'components/homeList/HomeList'
  import HomeListItem from 'components/homeList/chilren/Item'
  import { dataFormat } from 'lib/utils'
  import Vue from 'vue'

  export default {
    data () {
      return {
        io: null
      }
    },
    created () {
      this.$store.dispatch({
        type: native.doLoadProfile
      })
    },
    methods: {},
    computed: {
      profileAvatar () {
        let avatarUrl = this.profile.avatar || require('assets/avatar.png')
        return `<img src="${avatarUrl}" class="media_img">`
      },
      profileSubTitle () {
        return `<div>合伙人编号：${this.profile.userId}</div><div>加入时间：${dataFormat(this.profile.createdAt)}</div>`
      },
      ...mapState({
        profile: ({profile}) => profile.profile
      })
    },
    components: {HomeListItem, HomeList}

  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>
