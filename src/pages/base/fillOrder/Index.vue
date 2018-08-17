<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
        <!-- {{jobCard}}-->
        <section>
            <header class='header'><span class='mark'>*</span>客户选择</header>
            <base-radio-group v-model="jobCard.client" class="radio-group">
                <base-radio v-for="(client,index) in clientValue"
                            :label="client.value"
                            name="client"
                            :key="index">
                    {{client.label}}
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
                <div class="city"><span class='s-select' @click="showPopup">{{currentAddress}}</span></div>
                <div v-if='workBaseList && workBaseList.length>0'>
                    <div>
                        <base-select v-model='jobCard.workBase'
                                     text="请选择作业点"
                                     :data="workBaseList"
                                     nodeKey="id"
                                     @change="changeJobPoint2"
                                     nodeLabel="work_base"></base-select>
                    </div>
                    <div>
                        <autocomplate placeholder='请搜索作业点'
                                      @change="changeJobPoint"
                                      :loadData="getJobPointList"></autocomplate>
                    </div>
                </div>
                <div v-else class='hint'>
                    当前区域没有可选择的作业点
                </div>
            </div>
        </base-form-group>
        <line-10></line-10>
        <section v-if='showWorkType'>
            <header class='header'><span class='mark'>*</span>包年/按次</header>
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
                <input type="text" @click="openStartTime" placeholder="请选择开始时间" class='time-input' readonly
                       v-model="jobCard.displayStartDate">
            </div>
            <div>
                <input type="text" @click="openEndTime" placeholder="请选择结束时间" class='time-input' readonly
                       v-model="jobCard.displayEndDate">
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
            <input class='s-input' type="text" v-model="jobCard.refWorkNumber" placeholder="请填写甲方关联工单号">
        </base-form-group>
        <line-10></line-10>
        <base-form-group class="m-40" label="是否存在遗留问题">
            <f7-input type="switch" v-model="jobCard.isLeaveQuestion"></f7-input>
        </base-form-group>
        <!--{{jobCard.leave}}-->
        <question-group @handleAdd="addQuestion" v-if="jobCard.isLeaveQuestion">
            <question-item v-for="(question,index) in jobCard.leave"
                           :key="index"
                           :index="index+1"
                           @del="handleDelQuestion(question,index)"
                           :level.sync="question.level"
                           :question.sync="question.question">
            </question-item>
        </question-group>
        <!-- {{showAmmeter}}-->
        <div v-if="showAmmeter">
            <line-10></line-10>
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
                              @uploadAmmeterImg="uploadAmmeterImg(ammeter)"
                              :key="index">
                </ammeter-item>
            </ammeter-group>
        </div>
        <div v-if="showDynamotor">
            <line-10></line-10>
            <base-form-group class="m-40" label="发电机记录" isTitle></base-form-group>
            <base-form-group class="m-40" label="发电机编号">
                <input type="text" v-model="jobCard.dynamotor.code" readonly class='s-scan' @click="scanDynamotor"
                       placeholder='请扫描或输入电表编号'>
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
                        <template v-if="jobCard.dynamotor.endTime">{{jobCard.dynamotor.endTime | dateFormat}}</template>
                    </div>
                    <div>
                        <f7-button active :color="btnDyEndTimeDisable? 'gray' :''" full @click="endDy">结束发电</f7-button>
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
        </div>
        <f7-block>
            <f7-button full active big @click="submit">提交</f7-button>
        </f7-block>
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
        </div>
    </f7-page>
</template>

<script>
  import {
    level as levelType,
    client,
    clientValue,
    globalConst as native,
    major,
    majorValue,
    workType,
    workTypeValue,
    generatorIds,
    modalTitle
  } from 'lib/const'
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/children/BaseRadio'
  import QuestionGroup from 'components/baseQuestion/BaseQuestion.vue'
  import QuestionItem from 'components/baseQuestion/BaseQuestionItem.vue'
  import AmmeterGroup from 'components/baseAmmeter/BaseAmmeter'
  import AmmeterItem from 'components/baseAmmeter/BaseAmmeterItem'
  import Autocomplate from 'components/autocomplate/Autocomplate.vue'
  import Hint from 'components/hint/Hint'
  import Vue from 'vue'
  import moment from 'lib/moment'
  import { mapState, mapGetters } from 'vuex'
  import emitter from 'mixins/emitter'
  import { aMapUtil, getTimer, wxScanQRCode, dataFormat } from 'lib/utils'
  import { Validator } from 'lib/custom_validator'

  class Ammeter {
    constructor (code, date, currentNum, useNum, img, prevNum, id) {
      this.code = code
      this.date = date
      this.currentNum = currentNum
      this.prevNum = prevNum
      this.useNum = useNum
      this.img = img
      this.id = id
    }
  }

  class Question {
    constructor (question = '', level = levelType.two) {
      this.question = question
      this.level = level
    }
  }

  export default {
    name: 'fillorder',
    mixins: [emitter],
    data () {
      return {
        getTimer,
        showWorkType: true,
        jobCard: {
          client: client.mobile,
          major: '',
          workBase: '',
          workType: workType.year,
          workSort: '',
          content: '',
          startDate: new Date().toISOString(),
          displayStartDate: '',
          displayEndDate: '',
          endDate: new Date().toISOString(),
          fee: '',
          refWorkNumber: '',
          isLeaveQuestion: false,
          leave: [],
          ammeter: [],
          dynamotor: {
            id: '',
            code: '',
            startTime: '',
            endTime: '',
            duration: '',
            oilfee: '',
            remark: ''
          }
        },
        clientValue,
        workTypeValue: workTypeValue.filter((item) => item.key !== workType.other),
        jobPoint: null,
        jobPointName: '',
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
        workBaseList: [],
        iconSrc: {
          add: require('../../../assets/icon_add.png'),
        },
        validator: null,
        errors: null,
        btnDyStartTimeDisable: false,
        btnDyEndTimeDisable: true
      }
    },
    created () {
      this.validator = new Validator({
        workBase: 'required',
        workSort: 'required',
        content: 'required',
        startDate: 'required',
        endDate: 'required',
      })
      this.$set(this, 'errors', this.validator.errorBag)
    },
    computed: {
      ...mapGetters(['getProvinceList']),
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
      currentAddress () {
        let {provinceName, cityName, districtName} = this.activeAddress
        let currentAddress = provinceName + cityName + districtName
        if (provinceName && cityName && districtName) {
          this.changePointList()
        }
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
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
      },
      majorValue () {
        let {xianlu, jizhan, ironTower, jtzx, wlan, jf} = major
        switch (this.jobCard.client >>> 0) {
          case client.mobile:
          case client.unicorn:
          case client.telecom:
            return majorValue.filter(({value}) => value !== jf)
          case client.ironTower:
            return majorValue.filter(({value}) => value === ironTower || value === wlan || value === jf)
        }
      },
    },
    watch: {
      'jobCard.client': {
        handler: function (nowClient, oldClient) {
          this.changeSortTypeList()
          // this.changePointList()
          if (nowClient === client.ironTower) {
            this.showWorkType = false
            this.jobCard.workType = workType.other
          } else {
            this.showWorkType = true
            this.jobCard.workType = workType.year
          }
        },
        immediate: true
      },
      'jobCard.workType': {
        handler: function (nowWorkType, oldWorkType) {
          if (nowWorkType !== oldWorkType) {
            this.jobCard.workSort = ''
          }
          this.changeSortTypeList()
        },
        immediate: true
      },
      'jobCard.major': {
        handler: function (nowMajor, oldMajor) {
          this.changeSortTypeList()
          // this.changePointList()
        },
        immediate: true
      }
    },
    methods: {
      resetJobCard () {
        this.jobCard = {
          client: client.mobile,
          major: '',
          workBase: '',
          workType: workType.year,
          workSort: '',
          content: '',
          startDate: new Date().toISOString(),
          displayStartDate: '',
          displayEndDate: '',
          endDate: '',
          fee: '',
          refWorkNumber: '',
          isLeaveQuestion: false,
          leave: [],
          ammeter: [],
          dynamotor: {
            id: '',
            code: '',
            startTime: '',
            endTime: '',
            duration: '',
            oilfee: '',
            remark: ''
          }
        }
        this.btnDyStartTimeDisable = false
        this.btnDyEndTimeDisable = true
      },
      startDy () {
        if (this.btnDyStartTimeDisable) {
          return
        }
        let code = this.jobCard.dynamotor.code
        if (!code) {
          this.$f7.alert('请先获取发电机信息', modalTitle)
          return
        }
        this.$f7.confirm('是否确认开始发电?', modalTitle, () => {
          this.jobCard.dynamotor.startTime = new Date().getTime()
          this.btnDyStartTimeDisable = true
          this.btnDyEndTimeDisable = false
        })

      },
      endDy () {
        if (this.btnDyEndTimeDisable) {
          return
        }
        this.$f7.confirm('是否确认结束发电?', modalTitle, () => {
          this.btnDyEndTimeDisable = true
          this.jobCard.dynamotor.endTime = new Date().getTime()
          let {startTime, endTime} = this.jobCard.dynamotor
          this.jobCard.dynamotor.duration = endTime - startTime
        })
      },
      handleWorkBaseDetail (workBaseInfo) {
        if (workBaseInfo.is_leave === 'Y') {
          this.$f7.confirm('该作业点存在遗留问题工单是否跳转至遗留问题工单页面进行处理？', modalTitle, () => {
            this.$router.loadPage(`/base/questionOrder/workBase/${workBaseInfo.id}`)
          })
        }
      },
      changeJobPoint (value) {
        console.log('chagneJobPoint', value)
        this.jobCard.workBase = value.id
        this.jobPoint = value.work_base
        this.handleWorkBaseDetail(value)
      },
      changeJobPoint2 (value) {
        this.jobPoint = value.work_base
        this.handleWorkBaseDetail(value)
      },
      submit () {
        let {client, major, workType, workBase, workSort, content, displayStartDate, displayEndDate, fee, refWorkNumber, isLeaveQuestion, leave, ammeter, dynamotor} = this.jobCard
        console.log('cart', this.jobCard)
        this.validator.validateAll({
          workBase,
          workSort,
          content,
          startDate: displayStartDate,
          endDate: displayEndDate,
        })
        //  校验信息
        if (this.errors.errors.length > 0) {
          this.$f7.addNotification({
            media: ('<span className=\'iconfont icon-error\'></span>'),
            title: '提示',
            message: this.errors.errors[0].msg
          })
          setTimeout(() => {
            this.$f7.closeNotification('.notifications')
          }, 2000)
          return
        }
        if (this.jobCard.endDate - this.jobCard.startDate < 0) {
          this.$f7.alert('结束时间不能小于开始时间', modalTitle)
          return
        }

        if (this.showDynamotor && (!this.btnDyStartTimeDisable || !this.btnDyEndTimeDisable)) {
          this.$f7.alert('未结束发电不能提交工单', modalTitle)
          return
        }
        if (this.showDynamotor && !dynamotor.oilfee) {
          this.$f7.alert('请填写发电费用', modalTitle)
          return
        }

        if (isLeaveQuestion) {
          if (leave.length === 0) {
            this.$f7.alert('请添加遗留问题', modalTitle)
            return
          }
          for (let i = 0; i < leave.length; i++) {
            let question = leave[i]
            if (!question.question) {
              this.$f7.alert('请填写遗留问题内容', modalTitle)
              return
            }
          }
        }
        if (this.showAmmeter) {
          if (ammeter.length === 0) {
            this.$f7.alert('请填写抄电表', modalTitle)
            return
          }
          for (let i = 0; i < ammeter.length; i++) {
            let ammeterItem = ammeter[i]
            if (!ammeterItem.currentNum) {
              this.$f7.alert('请填写本周期抄电表度数', modalTitle)
              return
            }
            if (!ammeterItem.useNum) {
              this.$f7.alert('请填写电表使用度数', modalTitle)
              return
            }
            if (!ammeterItem.img) {
              this.$f7.alert('请选择电表照片', modalTitle)
              return
            }
          }
        }

        for (let i = 0; i < ammeter.length; i++) {
          let ammeterExp = ammeter[i]
          if (!ammeterExp.id) {
            this.$f7.alert('请扫描电表编号', modalTitle)
            return
          }
          if (!ammeterExp.currentNum) {
            this.$f7.alert('请填写电表本周期抄表度数', modalTitle)
            return
          }
          if (!ammeterExp.useNum) {
            this.$f7.alert('请填写电表使用度数', modalTitle)
            return
          }
          if (__DEBUG__) {
            ammeterExp.img = 'test'
          }
          if (!ammeterExp.img) {
            this.$f7.alert('请上传电表照', modalTitle)
            return
          }
        }
        let ammeterList = ammeter.map((row) => {
          let {currentNum, useNum, ...rest} = row
          if (__DEBUG__) {
            return {current_num: currentNum, use_num: useNum, ...rest, img: 'test'}
          } else {
            return {current_num: currentNum, use_num: useNum, ...rest}
          }
        })
        let dynamotorObj = Object.assign({}, dynamotor)
        if (dynamotorObj.id) {
          dynamotorObj.start_time = dataFormat(dynamotorObj.startTime)
          dynamotorObj.end_time = dataFormat(dynamotorObj.endTime)
        }
        let {provinceName, cityName, districtName} = this.activeAddress
        this.$store.dispatch({
          type: native.doWorkSender,
          client,
          major,
          province: provinceName,
          city: cityName,
          district: districtName,
          work_base: workBase,
          work_type: workType,
          work_sort: workSort,
          content,
          start_date: displayStartDate,
          end_date: displayEndDate,
          fee,
          ref_work_number: refWorkNumber,
          is_leave_question: isLeaveQuestion ? 'Y' : 'N',
          leave: JSON.stringify(leave),
          ammeter: JSON.stringify(ammeterList),
          power: dynamotor.id ? JSON.stringify(dynamotorObj) : '{}'
        }).then(() => {
          this.$f7.alert('提交成功', modalTitle, () => {
            this.resetJobCard()
          })
        }).catch((error) => {
          this.$f7.alert(error, modalTitle)
        })
      },
      openEndTime (event) {
        this.$refs.endDate.open(event)
      },
      openStartTime (event) {
        this.$refs.startDate.open(event)
      },
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
      getJobPointList () {
        console.log('getJobPoint')
        let {client, major} = this.jobCard
        let {provinceName, cityName, districtName} = this.activeAddress
        return this.$store.dispatch({
          type: native.doGetWorkBase,
          province: provinceName,
          city: cityName,
          district: districtName,
          client,
          major,
          name: this.jobPointName
        })
      },
      // 发电机
      scanDynamotor () {
        let code = ''
        if (__DEBUG__) {
          code = 'rewrwrwr'
          this.doGetDynamotor(code)
        } else {
          wxScanQRCode().then((result) => {
            this.doGetDynamotor(result)
          })
        }

      },
      doGetDynamotor (code) {
        this.$store.dispatch({
          type: native.doGetDynamotor,
          code
        }).then((data) => {
          this.jobCard.dynamotor.id = data.data.id
          this.jobCard.dynamotor.code = code
        })
      },
      // 电表
      scanAmmeter (ammeter, index) {
        let code = ''
        if (__DEBUG__) {
          code = 'erqwr'
          this.doGetAmmeter(ammeter, code)
        } else {
          wxScanQRCode().then((result) => {
            this.doGetAmmeter(ammeter, result)
          })
        }
      },
      doGetAmmeter (ammeter, code) {
        this.$store.dispatch({
          type: native.doGetAmmeter,
          code
        }).then(({data}) => {
          ammeter.code = code
          ammeter.id = data.id
          ammeter.prevNum = data.last_num ? data.last_num + '' : '0'
          ammeter.date = new Date().getTime() + ''
        })
      },
      uploadAmmeterImg (ammeter) {
        if (!__DEBUG__) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              let localIds = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              let step = 100
              setTimeout(() => {
                wx.uploadImage({
                  localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                    ammeter.img = res.serverId
                  }
                })
              }, step)

            }
          })
        }
      },
      changeSortTypeList () {
        let {client, workType, major} = this.jobCard
        if (!client || !major) {
          return
        }
        this.$store.dispatch({
          type: native.doWorkSort,
          client,
          work_type: workType,
          major
        }).then((data) => {
          this.workSortList = data.data
        })
      },
      changePointList () {
        let {client, major} = this.jobCard
        let {provinceName, cityName, districtName} = this.activeAddress
        if (!provinceName || !cityName || !districtName || !client || !major) {
          return
        }
        this.$store.dispatch({
          type: native.doGetWorkBase,
          province: provinceName,
          city: cityName,
          district: districtName,
          client,
          major,
        }).then((data) => {
          let workBase = data.data.work_base
          if (workBase && Array.isArray(workBase)) {
            this.workBaseList = workBase
          }
        })
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
    components: {BaseRadio, BaseRadioGroup, QuestionGroup, QuestionItem, AmmeterGroup, AmmeterItem, Autocomplate}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/fillOrder.scss";
</style>