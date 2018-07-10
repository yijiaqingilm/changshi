<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回"></f7-nav-left>
            <f7-nav-center>收益说明</f7-nav-center>
        </f7-navbar>
        <f7-block class="rule">
            <div>订单收益是指：麦芽推广者通过分享商品推广文章，带有自己ID链接分享后，被分享者下单购买推文中的商品，麦芽退推广者可获得该笔订单的佣金。</div>
            <br>
            <div> 佣金结算公式为：</div>
            <div>佣金 = 商品商城价格（也可能是VIP价）- 商品成本价</div>
            <br>
            <div>以：图书《First Dictionary5000词》举例说明</div>
            <table></table>
            <div class='rule-table'>
                <div class='thead'>
                    <div>成本价</div>
                    <div>商城价</div>
                    <div>VIP价</div>
                </div>
                <div class='tbody'>
                    <div>83.00</div>
                    <div>128.00</div>
                    <div>108.00</div>
                </div>
            </div>
            <div>推广者可获得：</div>
            <div>佣金(元) =128.00（或108.00）- 83.00 = 45（或25）</div>
            <br/>
            <br/>
            <br/>
            <div>VIP指绑定点读笔用户，</div>
            <div>VIP价指点读笔绑定用户享有价；</div>
            <header class="header">如若，下单用户为绑定点读笔用户(即vip用户)：</header>
            <div>1、属于代理商的推广：代理商获得100%的佣金，即45元（其中20%佣金在代理商店铺结算）</div>
            <div>2、不属于代理商的推广：代理商获得20%的佣金，其他归推广者所有，即45-45*20%=36元</div>
            <br/>
            <br/>
            <header class="header">订单收益明细中：</header>
            <div>已结算的收益：是指购买用户确认收货且7天后，佣金会结算到推广者的账号里。</div>
            <div>在途的收益：是指购买用户订单商品未确认收货及确认收货未满7天。</div>
            <div>失效的收益：是指购买用户订单商品取消及商品退换货。</div>
        </f7-block>
    </f7-page>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../css/rule.scss";
</style>