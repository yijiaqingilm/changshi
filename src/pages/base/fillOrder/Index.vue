<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
        <div @click="showPopup">终极测试</div>
        <input type="text" value='test' id='picker-dependent'>
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

        <base-form-group class="m-40" label="专业选择" mark>
            <base-select v-model="jobCard.major" text="请选择专业" :data="majorValue"></base-select>
        </base-form-group>
        <base-form-group class="m-40" label="作业点" mark>
            <div class='mb-c-20'>
                <div>
                    <input class='s-input' placeholder="请从下方选择或搜索作业点" type="text" readonly v-model="jobPoint">
                </div>
                <div class="city"><span class='s-select'>城市</span></div>
                <div>
                    <base-select v-model='jobCard.workBase' text="请选择作业点" :data="majorValue"></base-select>
                </div>
                <div>
                    <autocomplate v-model="jobPoint" placeholder='请搜索作业点' :loadData="getJobPointList"></autocomplate>
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
        <base-form-group class="m-40" label="作业类别" mark v-if='workSortList && workSortList.length>0'>
            <base-select v-model='jobCard.workSort' nodeKey="id" nodeLabel="name" text="请选择作业类别"
                         :data="workSortList"></base-select>
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
        <question-group @handleAdd="addQuestion" v-if="jobCard.isLeaveQuestion">
            <question-item v-for="(question,index) in jobCard.leave"
                           :key="index"
                           :index="index+1"
                           @del="handleDelQuestion(question,index)"
                           :leave.sync="question.leave"
                           :question.sync="question.question">
            </question-item>
        </question-group>
        {{showAmmeter}}
        <div v-if="showAmmeter">
            <ammeter-group @addAmmeter="addAmmeter">
                <ammeter-item v-for="(ammeter,index) in jobCard.ammeter"
                              :index="index+1"
                              :code.sync="ammeter.code"
                              :date.sync="ammeter.date"
                              :prevNum="ammeter.prevNum"
                              :currentNum.sync="ammeter.currentNum"
                              :useNum.sync="ammeter.useNum"
                              :img.sync="ammeter.img"
                              @del="handleDelAmmeter(ammeter,index)"
                              @scanAmmeter="scanAmmeter(ammeter,index)"
                              :key="index">
                </ammeter-item>
            </ammeter-group>
        </div>
        <div v-if="showDynamotor">
            <base-form-group label="电表编号">
                <input type="text" class='s-scan' @click="scanDynamotor" placeholder='请扫描或输入电表编号'>
            </base-form-group>
            <base-form-group label="发电时间">
                <div>
                    <div>2018:08dfaf</div>
                    <div>
                        <f7-button active full>开始发电</f7-button>
                    </div>
                </div>
            </base-form-group>
            <base-form-group label="结束时间">
                <div>
                    <div>2018:08dfaf</div>
                    <div>
                        <f7-button active full>结束发电</f7-button>
                    </div>
                </div>
            </base-form-group>
            <base-form-group label="发电时长">
                8个小时
            </base-form-group>
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
    workTypeValue,
    generatorIds
  } from 'lib/const'
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/children/BaseRadio'
  import QuestionGroup from 'components/baseQuestion/BaseQuestion.vue'
  import QuestionItem from 'components/baseQuestion/BaseQuestionItem.vue'
  import AmmeterGroup from 'components/baseAmmeter/BaseAmmeter'
  import AmmeterItem from 'components/baseAmmeter/BaseAmmeterItem'
  import Autocomplate from 'components/autocomplate/Autocomplate.vue'
  import Vue from 'vue'
  import Datetime from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import moment from 'lib/moment'
  import { mapState } from 'vuex'

  Vue.use(Datetime)

  class Ammeter {
    constructor (code, date, currentNum, useNum, img, prevNum) {
      this.code = code
      this.date = date
      this.currentNum = currentNum
      this.prevNum = prevNum
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
          ammeter: [],
          dynamotor: {
            code: '',
            lastNum: ''
          }
        },
        clientValue,
        workTypeValue,
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
        workSortList: [],
        iconSrc: {
          add: require('../../../assets/icon_add.png'),
        },
        city: ''
      }
    },
    created () {
    },
    computed: {
      showAmmeter () {
        switch (this.jobCard.major >>> 0) {
          case major.jizhan:
          case major.jf:
          case major.wlan:
            return true
          default:
            return false
        }
      },
      showDynamotor () {
        return generatorIds.indexOf(this.jobCard.workSort >>> 0) !== -1
      }
    },
    watch: {
      'jobCard.client': {
        handler: function (nowClient, oldClient) {
          this.changeSortTypeList()
        },
        immediate: true
      },
      'jobCard.workType': {
        handler: function (nowWorkType, oldWorkType) {
          this.changeSortTypeList()
        },
        immediate: true
      },
      'jobCard.major': {
        handler: function (nowMajor, oldMajor) {
          this.changeSortTypeList()
        },
        immediate: true
      }
    },
    methods: {
      showPopup () {
        this.$f7.popup('.popup-province')
      },
      getJobPointList () {
        console.log('getJobPoint')
        let {provinceId, cityId, districtId, client, major} = this.jobCard
        if (__DEBUG__) {
          provinceId = 1
          cityId = 1
          districtId = 1
        }
        return this.$store.dispatch({
          type: native.doGetWorkBase,
          province_id: provinceId,
          city_id: cityId,
          district_id: districtId,
          client,
          major,
          name: this.jobPoint
        })
      },
      // 发电机
      scanDynamotor () {
        let code = ''
        if (__DEBUG__) {
          code = '1'
        }
        this.$store.dispatch({
          type: native.doGetDynamotor,
          code
        }).then((data) => {
          this.jobCard.dynamotor = 'xxxx编号'
        })
        if (__DEBUG__) {
          this.jobCard.dynamotor = 'xxxx编号'
        }
      },
      // 电表
      scanAmmeter (ammeter, index) {
        let code = ''
        if (__DEBUG__) {
          code = '123'
        }
        this.$store.dispatch({
          type: native.doGetAmmeter,
          code
        }).then(({data}) => {
          ammeter.code = data.id + ''
          ammeter.prevNum = data.last_num ? data.last_num + '' : '0'
          ammeter.date = new Date().getTime() + ''
        })
        if (__DEBUG__) {
          ammeter.code = 'xxxx'
        }
      },
      changeSortTypeList () {
        let {client, workType, major} = this.jobCard
        this.$store.dispatch({
          type: native.doWorkSort,
          client,
          work_type: workType,
          major
        }).then((data) => {
          this.workSortList = data.data
        })
        console.log('cest', this.jobCard.client)
      },
      handleDelQuestion (question, index) {
        console.log('del 问题')
        this.jobCard.leave.splice(index, 1)
      },
      addQuestion () {
        this.jobCard.leave.push(new Question())
        console.log('添加问题')
      },
      formatTest () {
        // console.log(moment(this.startTime).format('YYYY-MM-DD HH:mm:ss'))
      },
      addAmmeter () {
        this.jobCard.ammeter.push(new Ammeter())
      },
      handleDelAmmeter (ammeter, index) {
        this.jobCard.ammeter.splice(index, 1)
      }
    },
    mounted () {
      this.$nextTick(() => {
        var carVendors = {
          Japanese: ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
          German: ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
          American: ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
        }
        var pickerDependent = this.$f7.picker({
          input: '#picker-dependent',
          rotateEffect: true,
          formatValue: function (picker, values) {
            return values.join('')
          },
          cols: [
            {
              textAlign: 'left',
              values: ['Japanese', 'German', 'American'],
              onChange: async (picker, country) => {
                if (picker.cols[1].replaceValues) {
                  await setTimeout(() => {
                    picker.cols[1].replaceValues(carVendors[country])
                  }, 1000)

                }
              }
            },
            {
              values: carVendors.Japanese,
              width: 160,
            },
          ]
        })
      })
    },
    components: {BaseRadio, BaseRadioGroup, QuestionGroup, QuestionItem, AmmeterGroup, AmmeterItem, Autocomplate}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/fillOrder.scss";
</style>