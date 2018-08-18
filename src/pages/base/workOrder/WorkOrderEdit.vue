<template>
    <f7-page class='work-order-edit'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>编辑工单</f7-nav-center>
        </f7-navbar>
        <section v-if='workOrder'>
            <section class='detail-wrap'>
                <base-form-group label="工单号：" :item="workOrder.number"></base-form-group>
                <base-form-group label="客户：" :item="workOrder.client"></base-form-group>
                <base-form-group label="专业：" :item="workOrder.major"></base-form-group>
                <base-form-group label="作业点：" :item="workOrder.work_base"></base-form-group>
                <base-form-group label="包年/按次：" :item="workOrder.work_type"></base-form-group>
                <base-form-group label="作业类别：" :item="workOrder.work_sort"></base-form-group>
                <base-form-group label="开始时间：" :item="workOrder.start_date"></base-form-group>
                <base-form-group label="结束时间：" :item="workOrder.end_date"></base-form-group>
                <base-form-group label="关联工单号："
                                 :item="workOrder.ref_work_number && workOrder.ref_work_number"></base-form-group>
                <base-form-group label="是否存在问题：" :item="workOrder.is_leave_question==='Y'?'存在':'不存在'"></base-form-group>
            </section>
            <line-10></line-10>
            <section class='edit-context'>
                <base-form-group label="作业内容" isTitle>
                    <textarea class='s-textarea' v-model="order.content" placeholder='请输入作业内容'></textarea>
                </base-form-group>
                <base-form-group class="mt-20" label="劳务费用">
                    <input type="text" class='s-input' v-model="order.fee" placeholder='请输入劳务费用'><span
                        class='unit'>元</span>
                </base-form-group>
                <f7-block>
                    <f7-button big full active @click="save">保存</f7-button>
                </f7-block>
            </section>
        </section>
    </f7-page>
</template>

<script>
  import { modalTitle, globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'work-order-edit',
    data () {
      return {
        order: {
          content: '',
          fee: '',
          id: ''
        }
      }
    },
    async created () {
      if (this.$route.params) {
        this.order.id = this.$route.params.id
      }
      await this.$store.dispatch({
        type: native.doWorkNumberDetail,
        work_id: this.order.id
      })
      this.order.content = this.workOrder.content
      this.order.fee = this.workOrder.fee
    },
    methods: {
      save () {
        console.log('save')
        let {content, fee, id} = this.order
        this.$store.dispatch({
          type: native.doWorkNumberUpdate,
          content,
          fee,
          work_id: id
        }).then(() => {
          console.log('保存成功')
          this.$f7.alert('修改成功', modalTitle)
          this.workOrder.content = this.order.content
          this.workOrder.fee = this.order.fee
        }).catch((err) => {
          this.$f7.alert(err, modalTitle)
        })
      }
    },
    computed: {
      ...mapState({
        workOrder ({base}) {
          return base.workOrder[this.order.id]
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

    .edit-context {
        padding: 30px;
    }
</style>