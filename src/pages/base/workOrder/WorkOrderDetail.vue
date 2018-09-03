<template>
    <f7-page class='work-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>工单详情</f7-nav-center>
        </f7-navbar>
        <section v-if="workOrder">
            <section class='detail-wrap'>
                <base-form-group label="工单号：" :item="workOrder.number"></base-form-group>
                <base-form-group label="客户：" :item="workOrder.client"></base-form-group>
                <base-form-group label="专业：" :item="workOrder.major"></base-form-group>
                <base-form-group label="作业点：" :ellipsis="false" >{{workOrder.work_base}}</base-form-group>
                <base-form-group label="包年/按次：" :item="workOrder.work_type"></base-form-group>
                <base-form-group label="作业类别：" :item="workOrder.work_sort"></base-form-group>
                <base-form-group label="开始时间：" :item="workOrder.start_date"></base-form-group>
                <base-form-group label="结束时间：" :item="workOrder.end_date"></base-form-group>
                <base-form-group label="劳务费：" :item="workOrder.fee"></base-form-group>
                <base-form-group label="关联工单号："
                                 :item="workOrder.ref_work_number && workOrder.ref_work_number"></base-form-group>
                <base-form-group label="作业内容：" :item="workOrder.content"></base-form-group>
                <base-form-group label="是否存在问题：" :item="workOrder.is_leave_question==='Y'?'存在':'不存在'"></base-form-group>
            </section>
            <line-10></line-10>
            <section class='detail-wrap' v-for="(ammeter,index) in workOrder.ammeter" :key="index">
                <base-form-group :label="'电表'+ammeter.id" isTitle></base-form-group>
                <base-form-group label="电表编号：" :item="ammeter.meter_code"></base-form-group>
                <base-form-group label="抄表时间：" :item="ammeter.table_time"></base-form-group>
                <base-form-group label="上次抄表数：" :item="ammeter.fast_num"></base-form-group>
                <base-form-group label="本期抄表数：" :item="ammeter.last_num"></base-form-group>
                <base-form-group label="使用度数：" :item="ammeter.use_num"></base-form-group>
                <base-form-group label="电表照：">
                    <img :src="ammeter.img" alt="" class='ammeter_img'>
                </base-form-group>
            </section>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'work-order-detail',
    data () {
      return {
        orderDetail: {
          id: ''
        }
      }
    },
    async created () {
      if (this.$route.params) {
        this.orderDetail.id = this.$route.params.id
      }
      await this.$store.dispatch({
        type: native.doWorkNumberDetail,
        work_id: this.orderDetail.id
      })
    },
    computed: {
      ...mapState({
        workOrder ({base}) {
          return base.workOrder[this.orderDetail.id]
        }
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .detail-wrap {
        padding: 30px;
    }

    .fo-form-group {
        margin: 0;
    }

    .ammeter_img {
        width: 200px;
        height: 200px;
    }
</style>