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
                <base-form-group label="作业点：" :ellipsis="false">{{workOrder.work_base}}</base-form-group>
                <base-form-group label="包年/按次：" :item="workOrder.work_type"></base-form-group>
                <base-form-group label="作业类别：" :item="workOrder.work_sort"></base-form-group>
                <!-- <base-form-group label="开始时间：" :item="workOrder.start_date"></base-form-group>
                 <base-form-group label="结束时间：" :item="workOrder.end_date"></base-form-group>
                 <base-form-group label="关联工单号："
                                  :item="workOrder.ref_work_number && workOrder.ref_work_number"></base-form-group>
                 <base-form-group label="是否存在问题：" :item="workOrder.is_leave_question==='Y'?'存在':'不存在'"></base-form-group>-->
            </section>
            <line-10></line-10>
            <section class='edit-context'>
                <base-form-group class="m-40" label="作业起止时间"></base-form-group>
                <div class='time-group'>
                    <span class='time-slash'></span>
                    <div>
                        <input type="text" @click="openStartTime" placeholder="请选择开始时间" class='time-input' readonly
                               v-model="jobCard.displayStartDate">
                    </div>
                    <div>
                        <input type="text" @click="openEndTime" placeholder="请选择结束时间" class='time-input' readonly
                               v-model="jobCard.displayEndDate">
                    </div>
                </div>
            </section>
            <section class='edit-context'>
                <base-form-group label="作业内容" isTitle>
                    <textarea class='s-textarea' v-model="jobCard.content" placeholder='请输入作业内容'></textarea>
                </base-form-group>
                <base-form-group class="mt-20" label="劳务费用">
                    <input type="text" class='s-input' v-model="jobCard.fee" placeholder='请输入劳务费用'><span
                        class='unit'>元</span>
                </base-form-group>
                <base-form-group class="mt-20" label="关联工单号">
                    <input class='s-input' type="text" v-model="jobCard.refWorkNumber" placeholder="请填写甲方关联工单号">
                </base-form-group>
            </section>
            <line-10></line-10>
            <section class='edit-context'>
                <base-form-group class="m-40" label="是否存在遗留问题">
                    <f7-input type="switch" v-model="jobCard.isLeaveQuestion"></f7-input>
                </base-form-group>
            </section>
            <question-group @handleAdd="addQuestion" v-if="jobCard.isLeaveQuestion">
                <question-item v-for="(question,index) in jobCard.leave"
                               :key="index"
                               :index="index+1"
                               @del="handleDelQuestion(question,index)"
                               :level.sync="question.level"
                               :question.sync="question.question">
                </question-item>
            </question-group>
            <div v-if="showDynamotor">
                <line-10></line-10>
                <section class='edit-context'>
                    <base-form-group class="m-40" label="发电机记录" isTitle></base-form-group>
                    <base-form-group class="m-40" label="发电机编号">
                        <scan-input v-model="jobCard.dynamotor.code" @scan="scanDynamotor"
                                    placeholder="请扫描或输入编号"></scan-input>
                    </base-form-group>
                    <base-form-group class="m-40" label="发电时间">
                        <div class='dy-date'>
                            <div>
                                <template v-if="jobCard.dynamotor.startTime">{{jobCard.dynamotor.startTime| dateFormat}}
                                </template>
                            </div>
                            <div>
                                <f7-button active :color="btnDyStartTimeDisable? 'gray' :''" full @click="startDy">开始发电
                                </f7-button>
                            </div>
                        </div>
                    </base-form-group>
                    <base-form-group class="m-40" label="结束时间">
                        <div class='dy-date'>
                            <div>
                                <template v-if="jobCard.dynamotor.endTime">{{jobCard.dynamotor.endTime | dateFormat}}
                                </template>
                            </div>
                            <div>
                                <f7-button active :color="btnDyEndTimeDisable? 'gray' :''" full @click="endDy">结束发电
                                </f7-button>
                            </div>
                        </div>
                    </base-form-group>
                    <base-form-group class="m-40" label="发电时长">
                        <template v-if="jobCard.dynamotor.duration">
                            {{getTimer(jobCard.dynamotor.duration)}}
                        </template>
                    </base-form-group>
                    <base-form-group class="m-40" label="发电费用">
                        <input type="number" placeholder="请填写发电费用" class='s-input' v-model='jobCard.dynamotor.oilfee'>
                    </base-form-group>
                    <base-form-group class="m-40" label="备注">
                        <input type="text" placeholder="请输入备注" class='s-input' v-model='jobCard.dynamotor.remark'>
                    </base-form-group>
                </section>
            </div>
            <div v-if="showAmmeter">
                <line-10></line-10>
                <ammeter-group @addAmmeter="addAmmeter">
                    <ammeter-item v-for="(ammeter,index) in jobCard.ammeter"
                                  :index="index"
                                  :code.sync="ammeter.code"
                                  :date.sync="ammeter.date"
                                  :displayDate.sync="ammeter.displayDate"
                                  :prevNum="ammeter.prevNum"
                                  :currentNum.sync="ammeter.currentNum"
                                  :useNum.sync="ammeter.useNum"
                                  :img.sync="ammeter.img"
                                  :displayImg.sync="ammeter.displayImg"
                                  @del="handleDelAmmeter(ammeter,index)"
                                  @scanAmmeter="scanAmmeter"
                                  @uploadAmmeterImg="uploadAmmeterImg(ammeter)"
                                  :key="index">
                    </ammeter-item>
                </ammeter-group>
            </div>
            <f7-block v-if="!jobCard.isLeaveQuestion">
                <f7-button full active @click="save('save')">保存</f7-button>
            </f7-block>
            <f7-block v-else>
                <f7-grid>
                    <f7-col width="50">
                        <f7-button full active @click="save('save')">保存</f7-button>
                    </f7-col>
                    <f7-col width="50">
                        <f7-button full active @click="save('submit')">提交遗留问题工单</f7-button>
                    </f7-col>
                </f7-grid>
            </f7-block>
        </section>
        <div slot="fixed">
            <datetime ref="startDate" :displayValue.sync="jobCard.displayStartDate" class="time-input"
                      placeholder="请选择开始时间" v-model='jobCard.startDate'
                      :format="dateTime.options.format"
                      type="datetime"
                      :phrases="dateTime.options.phrases"></datetime>
            <datetime ref="endDate" :displayValue.sync="jobCard.displayEndDate" placeholder="请选择结束时间"
                      v-model='jobCard.endDate' :format="dateTime.options.format"
                      type="datetime"
                      :phrases="dateTime.options.phrases"></datetime>
            <div v-for="(ammeter,index) in jobCard.ammeter" :key="index">
                <datetime ref="ammeterTime" :displayValue.sync="ammeter.displayDate" placeholder="请选择时间"
                          v-model='ammeter.date' :format="dateTime.options.format"
                          type="datetime"
                          :phrases="dateTime.options.phrases"></datetime>
            </div>
        </div>
    </f7-page>
</template>

<script>
  import { modalTitle, globalConst as native, Ammeter, Question } from 'lib/const'
  import { mapState } from 'vuex'
  import fillOrder from 'mixins/fillOrderMixin'
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/children/BaseRadio'
  import QuestionGroup from 'components/baseQuestion/BaseQuestion.vue'
  import QuestionItem from 'components/baseQuestion/BaseQuestionItem.vue'
  import AmmeterGroup from 'components/baseAmmeter/BaseAmmeter'
  import AmmeterItem from 'components/baseAmmeter/BaseAmmeterItem'
  import { dateFormat } from 'lib/utils'

  export default {
    name: 'workOrderEdit',
    componentName: 'workOrderEdit',
    mixins: [fillOrder],
    data () {
      return {}
    },
    async created () {
      if (this.$route.params) {
        this.jobCard.id = this.$route.params.id
      }
      await this.$store.dispatch({
        type: native.doWorkNumberDetail,
        work_id: this.jobCard.id
      }).then((result) => {
        console.log('result==>', result)
        let {data} = result
        this.showDynamotor = data.work_sort === '发电'
        this.jobCard.major = data.work_major
        this.jobCard.startDate = new Date(data.start_date).toISOString()
        this.jobCard.endDate = new Date(data.end_date).toISOString()
        this.jobCard.displayStartDate = data.created_at
        this.jobCard.displayEndDate = data.end_date
        this.jobCard.content = data.content
        this.jobCard.fee = data.fee
        this.jobCard.refWorkNumber = data.ref_work_number
        this.jobCard.isLeaveQuestion = data.is_leave_question === 'Y'
        this.jobCard.ammeter = data.ammeter.map((row) => {
          let {fast_num, id, img, last_num, meter_code, table_time, use_num} = row
          let date = new Date(table_time).toISOString()
          let ammeter = new Ammeter(meter_code, date, table_time, last_num, use_num, img, fast_num, id, img)
          return ammeter
        })
        this.jobCard.leave = data.leave.map((row) => {
          console.log('row==>', row)
          let {id, question, level} = row
          return new Question(question, level, id)
        })
      })
    },
    methods: {
      save (act) {
        let {id, content, displayStartDate, displayEndDate, fee, refWorkNumber, isLeaveQuestion, leave, ammeter, dynamotor, poweradd} = this.jobCard
        let ammeterList = ammeter.map((row) => {
          let {currentNum, useNum, ...rest} = row
          return {current_num: currentNum, use_num: useNum, ...rest}
        })
        let dynamotorObj = Object.assign({}, dynamotor)
        if (dynamotorObj.id) {
          dynamotorObj.start_time = dateFormat(dynamotorObj.startTime)
          dynamotorObj.end_time = dateFormat(dynamotorObj.endTime)
        }
        let {provinceName, cityName, districtName} = this.activeAddress
        this.$store.dispatch({
          type: native.doWorkNumberUpdate,
          work_id: id,
          province: provinceName,
          city: cityName,
          district: districtName,
          content,
          start_date: displayStartDate,
          end_date: displayEndDate,
          fee,
          ref_work_number: refWorkNumber,
          is_leave_question: isLeaveQuestion ? 'Y' : 'N',
          leave: JSON.stringify(leave),
          ammeter: JSON.stringify(ammeterList),
          power: dynamotor.id ? JSON.stringify(dynamotorObj) : '{}',
          poweradd,
          act
        }).then(() => {
          this.$f7.alert('修改成功', modalTitle, () => {
          })
        }).catch((error) => {
          this.$f7.alert(error, modalTitle)
        })
      },
      updateToQuestionOrder () {

      }
    },
    computed: {
      ...mapState({
        workOrder ({base}) {
          return base.workOrder[this.jobCard.id]
        }
      })
    },
    components: {AmmeterGroup, AmmeterItem, BaseRadioGroup, BaseRadio, QuestionGroup, QuestionItem}
  }
</script>

<style lang="scss" scoped type="text/css">
    .detail-wrap {
        padding: 30px;
    }

    .edit-context {
        padding: 30px;
    }
</style>