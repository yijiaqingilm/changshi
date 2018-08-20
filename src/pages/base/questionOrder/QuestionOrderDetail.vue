<template>
    <f7-page class='question-order-detail'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>工单详情</f7-nav-center>
        </f7-navbar>
        <section v-if="questionOrder">
            <section class='detail-wrap'>
                <base-form-group label="工单号：" :item="questionOrder.number"></base-form-group>
                <base-form-group label="客户：" :item="questionOrder.client"></base-form-group>
                <base-form-group label="专业：" :item="questionOrder.major"></base-form-group>
                <base-form-group label="作业点：" :item="questionOrder.work_base"></base-form-group>
                <base-form-group label="包年/按次：" :item="questionOrder.work_type"></base-form-group>
                <base-form-group label="作业类别：" :item="questionOrder.work_sort"></base-form-group>
                <base-form-group label="开始时间："
                                 :item="questionOrder.start_date"></base-form-group>
                <base-form-group label="结束时间："
                                 :item="questionOrder.end_date"></base-form-group>
                <base-form-group label="劳务费：" :item="questionOrder.fee"></base-form-group>
                <base-form-group label="关联工单号："
                                 :item="questionOrder.ref_work_number && questionOrder.ref_work_number"></base-form-group>
                <base-form-group label="作业内容：" :item="questionOrder.content"></base-form-group>
                <base-form-group label="是否存在问题："
                                 :item="questionOrder.is_leave_question==='Y'?'存在':'不存在'"></base-form-group>
            </section>
            <line-10></line-10>
            <base-form-list v-for="(question,index) in questionOrder.questions" :key="index">
                <base-form-list-item title="问题" :label="question.id" isTitle>
                    <div slot='right' v-if="question.status==='N'">
                        <f7-button active full @click="doQuestion(question)">立即处理</f7-button>
                    </div>
                </base-form-list-item>
                <base-form-list-item title="问题级别：" :label="question.level"></base-form-list-item>
                <base-form-list-item title="遗留问题：" :label="question.question"></base-form-list-item>
                <base-form-list-item title="是否完结：" :label="question.status==='N'?'否':'是'"></base-form-list-item>
            </base-form-list>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native, modalTitle } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'question-order-detail',
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
        type: native.doLeaveQuestionDetail,
        work_id: this.orderDetail.id
      })
    },
    methods: {
      doQuestion (question) {
        console.log('doquestion')
        this.$f7.confirm('是否确认处理该工单遗留问题？', modalTitle, () => {
          this.$store.dispatch({
            type: native.doLeaveQuestionUpdate,
            leave_id: question.id
          }).then(() => {
            question.status = 'Y'
          }).catch((error) => {
            this.$f7.alert(error, modalTitle)
          })
        })
      }
    },
    computed: {
      ...mapState({
        questionOrder ({base}) {
          return base.questionOrder[this.orderDetail.id]
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
</style>