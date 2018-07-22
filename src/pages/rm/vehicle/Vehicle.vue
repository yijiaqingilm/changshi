<template>
    <f7-page class='vehicle'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>发电机管理</f7-nav-center>
        </f7-navbar>
        <header>
            <hint>提示：出车及收车信息根据触发‘出车’及‘收车’按键时自动生成</hint>
            <base-form-group class="title" label="发电机编码" isTitle>
                <input type="text" readonly @click="scanCode" placeholder='请扫描' class='s-scan'>
            </base-form-group>
        </header>
        <section class='info-panel'>
            <header>出车信息</header>
            <section class='panel-context'>
                <base-form-group label="出车时间">
                    xxxxxx
                </base-form-group>
                <base-form-group label="出车位置">
                    xxxxx
                </base-form-group>
            </section>
        </section>
        <section class='info-panel'>
            <header>出车信息</header>
            <section class='panel-context'>
                <base-form-group label="出车时间">
                    xxxxxx
                </base-form-group>
                <base-form-group label="出车位置">
                    xxxxx
                </base-form-group>
            </section>
        </section>
        <section class='context'>
            <base-form-group label="出车里程数" isTitle>
                <input type="text" class='s-input' placeholder='请输入里程数'>
            </base-form-group>
            <base-form-group label="加油费用" isTitle>
                <input type="text" class='s-input' placeholder='请输入加油费用，无填0'>
            </base-form-group>
            <base-form-group label="路桥费用" isTitle>
                <input type="text" class='s-input' placeholder='请输入路桥费用，无填0'>
            </base-form-group>
            <base-form-group label="维修费用" isTitle>
                <input type="text" class='s-input' placeholder='请输入维修费用，无填0'>
            </base-form-group>
            <base-form-group label="其他费用" isTitle>
                <input type="text" class='s-input' placeholder='请输入其他费用，无填0'>
            </base-form-group>
            <base-form-group label="收车里程数" isTitle>
                <input type="text" class='s-input' placeholder='请输入里程数'>
            </base-form-group>
            <base-form-group label="行驶总路程" isTitle>
                xxxx 公里
            </base-form-group>
            <base-form-group label="总费用" isTitle>
                ￥ xxxx
            </base-form-group>
        </section>
        <section class='footer'>
            <f7-button big full active>出车</f7-button>
            <f7-button big full active>收车</f7-button>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import Hint from 'components/hint/Hint.vue'
  export default {
    data () {
      return {}
    },
    methods: {
      scanCode(){
        let code = ''
        if (__DEBUG__) {
          code = '123'
        }
        this.$store.dispatch({
          type: native.doGetDynamotor,
          code
        }).then(({data}) => {
          console.log('data', data)
        }).catch((err) => {
          this.$f7.alert(err, modalTitle)
        })
      }
    },
    components: {Hint}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/vehicle.scss";
</style>
