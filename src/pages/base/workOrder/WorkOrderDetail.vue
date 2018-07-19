<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>工单详情</f7-nav-center>
        </f7-navbar>
        <section class='detail-wrap'>
            <base-form-group label="工单号：" item="xxx"></base-form-group>
            <base-form-group label="客户：" item="铁塔"></base-form-group>
            <base-form-group label="专业：" item="铁塔"></base-form-group>
            <base-form-group label="作业点：" item="铁塔"></base-form-group>
            <base-form-group label="包年/按次：" item="铁塔"></base-form-group>
            <base-form-group label="作业类别：" item="铁塔"></base-form-group>
            <base-form-group label="起止时间：" item="铁塔"></base-form-group>
            <base-form-group label="劳务费：" item="铁塔"></base-form-group>
            <base-form-group label="关联工单号：" item="铁塔"></base-form-group>
            <base-form-group label="作业内容：" item="铁塔"></base-form-group>
            <base-form-group label="是否存在问题：" item="铁塔"></base-form-group>
        </section>
        <line-10></line-10>
        <section class='detail-wrap'>
            <base-form-group label="电表1" isTitle></base-form-group>
            <base-form-group label="电表编号：" item="铁塔"></base-form-group>
            <base-form-group label="抄表时间：" item="铁塔"></base-form-group>
            <base-form-group label="上次抄表数：" item="铁塔"></base-form-group>
            <base-form-group label="本期抄表数：" item="铁塔"></base-form-group>
            <base-form-group label="使用度数：" item="铁塔"></base-form-group>
            <base-form-group label="电表照：" item="铁塔"></base-form-group>
        </section>
    </f7-page>
</template>

<script>
  export default {
    name: 'work-order-detail'
  }
</script>

<style lang="scss" scoped type="text/css">
    .detail-wrap {
        padding: 30px;
    }

    .fo-form-group {
        margin: 0;
    }
</style>