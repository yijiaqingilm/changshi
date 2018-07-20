<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
        <div @click="formatTest">测试</div>
        {{jobCard}}
        <section>
            <header class='header'><span class='mark'>*</span>客户选择</header>
            <base-radio-group v-model="jobCard.client" class="radio-group">
                <base-radio v-for="(client,index) in clientValue"
                            :label="client.key"
                            name="client"
                            :key="index">
                    {{client.value}}
                </base-radio>
            </base-radio-group>
        </section>
        <base-select v-model="jobCard.major" text="请选择" :data="majorValue"></base-select>
        <base-form-group class="m-40" label="专业选择" mark @click="openMajorSelect">
            <input type="hidden" v-model="jobCard.major" class='major-value'>
            <span class='s-select'>{{dispalymajorValue}}</span>
        </base-form-group>
        <base-form-group class="m-40" label="作业点" mark>
            <div class='mb-c-20'>
                <div>
                    <input class='s-input' placeholder="请从下方选择或搜索作业点" type="text" readonly v-model="jobPoint">
                </div>
                <div class="city"><span class='s-select'>{{dispalyjobPointValue}}</span></div>
                <div>
                    <span class='s-select'>{{dispalyjobPointValue}}</span>
                    <input type="hidden" v-model='jobPoint'>
                </div>
                <div>
                    <input class='s-input' placeholder="请搜索作业点" type="text">
                </div>
            </div>
        </base-form-group>
        <line-10></line-10>
        <section>
            <header class='header'><span class='mark'>*</span>年包/按次</header>
            <base-radio-group v-model="jobCard.workType" class="radio-group">
                <base-radio v-for="(workType,index) in workTypeValue"
                            :key="index"
                            :label="workType.key">
                    {{workType.value}}
                </base-radio>
            </base-radio-group>
        </section>
        <base-form-group class="m-40" label="作业类别" mark>
            <div class='s-select' @click="openWorkSortSelect">
                <input type="hidden" v-model="workSort" class='workSort-value'>
                {{dispalyWorkSortValue}}
            </div>
        </base-form-group>
        <base-form-group class="m-40" label="作业起止时间" mark></base-form-group>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <datetime class="time-input" placeholder="请选择开始时间" v-model='jobCard.startDate'
                          :format="dateTime.options.format"
                          type="datetime"
                          :phrases="dateTime.options.phrases"></datetime>
            </div>
            <div>
                <datetime placeholder="请选择结束时间" v-model='jobCard.endDate' :format="dateTime.options.format"
                          type="datetime"
                          :phrases="dateTime.options.phrases"></datetime>
            </div>
        </div>
        <section class='mt-40'>
            <header><span class='mark'>*</span>作业内容</header>
            <div class='mt-30'>
                <textarea class='s-textarea' v-model="jobCard.content" placeholder='请填写详细的作业内容'></textarea>
            </div>
        </section>
        <line-10></line-10>
        <base-form-group class="m-40" label="劳务费用">
            <input class='s-input' type="number" v-model='jobCard.fee' placeholder="请填写劳务费用"><span>元</span>
        </base-form-group>
        <base-form-group class="m-40" label="关联工单号">
            <input class='s-input' type="text" v-model="jobCard.refWorkNumber" placeholder="请填写甲方关联工单号（非必填）">
        </base-form-group>
        <line-10></line-10>
        <base-form-group class="m-40" label="是否存在遗留问题">
            <f7-input type="switch" v-model="jobCard.isLeaveQuestion"></f7-input>
        </base-form-group>
        {{jobCard.leave}}
        <question-group @handleAdd="addQuestion">
            <question-item v-for="(question,index) in jobCard.leave"
                           :key="index"
                           :index="index+1"
                           @del="handleDelQuestion(question)"
                           :leave.sync="question.leave"
                           :question.sync="question.question">
            </question-item>
        </question-group>
        <div v-if="showAmmeter">
            <f7-list class="ammeter-accordion">
                <f7-list-item accordion-item
                              v-for="(ammeter,index) in ammeterList"
                              :key="index"
                              :title="'电表'+(index+1)">
                    <f7-accordion-content>
                        <base-form-group label="电表编号">
                            <input class='s-input' type="text" v-model='ammeter.code' placeholder="请扫描或输入电表编号">
                        </base-form-group>
                        <f7-list>
                            <f7-list-item>
                                <f7-label>电表编号</f7-label>
                                <f7-input type="text" placeholder="Name"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-label>抄表时间</f7-label>
                                <f7-input type="text" placeholder="Name"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-label>上一周期抄电表度数</f7-label>
                                <f7-input type="text" placeholder="Name"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-label>本周期抄电表度数</f7-label>
                                <f7-input type="text" placeholder="Name"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-label>使用度数</f7-label>
                                <f7-input type="text" placeholder="Name"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-label>上传电表照</f7-label>
                                <f7-input type="text" placeholder="Name"/>
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
                <f7-list-item accordion-item :title="'电表'+(ammeterList.length+1)">
                    <f7-accordion-content>
                        <div @click="addAmmeter">添加电表</div>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>
        </div>
        <f7-block>
            <f7-button full active big>提交</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
  import {
    leave as leaveType,
    client,
    clientValue,
    globalConst as native,
    major,
    majorValue,
    workType,
    workTypeValue
  } from 'lib/const'
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/children/BaseRadio'
  import QuestionGroup from 'components/baseQuestion/BaseQuestion.vue'
  import QuestionItem from 'components/baseQuestion/BaseQuestionItem.vue'
  import Vue from 'vue'
  import Datetime from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import moment from 'lib/moment'

  Vue.use(Datetime)

  class Ammeter {
    constructor (code, date, currentNum, useNum, img) {
      this.code = code
      this.date = date
      this.currentNum = currentNum
      this.useNum = useNum
      this.img = img
    }
  }

  class Question {
    constructor (question = 'test', leave = leaveType.two) {
      this.question = question
      this.leave = leave
    }
  }

  export default {
    name: 'fillorder',
    data () {
      return {
        jobCard: {
          client: client.mobile,
          major: major.jizhan,
          workBase: '',
          workType: workType.year,
          workSort: '',
          content: '',
          startDate: new Date().toISOString(),
          endDate: '',
          fee: '',
          refWorkNumber: '',
          isLeaveQuestion: true,
          leave: [],
          ammeter: []
        },
        clientValue,
        workTypeValue,
        majorPicker: null,
        workSortPicker: null,
        workSort: null,
        majorValue,
        jobPoint: null,
        dateTime: {
          options: {
            phrases: {
              ok: '确定',
              cancel: '关闭'
            },
            format: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        /* 电表数据 */
        ammeterList: []
      }
    },
    created () {
      /* this.$store.dispatch({
        type: native.doAddressList,
        s: 'city',
        province_id: 2
      })*/
    },
    computed: {
      showAmmeter () {
        switch (this.major >>> 0) {
          case major.jizhan:
          case major.jf:
          case major.wlan:
            return true
          default:
            return false
        }
      },
      dispalymajorValue () {
        return majorValue.filter((row) => row.key >>> 0 === this.jobCard.major >>> 0)[0].value
      },
      // 需要修改
      dispalyWorkSortValue () {
        return majorValue.filter((row) => row.key >>> 0 === this.jobCard.major >>> 0)[0].value
      },
      dispalyjobPointValue () {

      }
    },
    methods: {
      handleDelQuestion () {
        console.log('del 问题')
      },
      addQuestion () {
        this.jobCard.leave.push(new Question())
        console.log('添加问题')
      },
      formatTest () {
        // console.log(moment(this.startTime).format('YYYY-MM-DD HH:mm:ss'))
      },
      addAmmeter () {
        this.ammeterList.push(new Ammeter())
      },
      openMajorSelect () {
        this.majorPicker.open()
      },
      openWorkSortSelect () {
        this.workSortPicker.open()
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.majorPicker = this.$f7.picker({
          closeByOutsideClick: false,
          input: '.major-value',
          cols: [
            {
              textAlign: 'center',
              displayValues: majorValue.map((row) => row.value),
              values: majorValue.map((row) => row.key)
            }
          ],
          onClose: ({cols, value}) => {
            this.jobCard.major = value[0]
          }
        })
        let {client, major, workType} = this.jobCard
        this.$store.dispatch({
          type: native.doWorkSort,
          client,
          work_type: workType,
          major
        })
        // 需要修改
        this.workSortPicker = this.$f7.picker({
          closeByOutsideClick: false,
          input: '.workSort-value',
          cols: [
            {
              textAlign: 'center',
              displayValues: workTypeValue.map((row) => row.value),
              values: workTypeValue.map((row) => row.key)
            }
          ],
          onClose: ({cols, value}) => {
            this.workSort = value
          }
        })
        // 手动初始化picker cols
        //  this.majorPicker.open()
        // this.majorPicker.close()
        // this.workSortPicker.open()
        // this.workSortPicker.close()
        //  this.$f7.accordionOpen('.accordion-item')
      })
    },
    components: {BaseRadio, BaseRadioGroup, QuestionGroup, QuestionItem}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/fillOrder.scss";
</style>