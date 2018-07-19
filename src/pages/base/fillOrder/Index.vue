<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
        <div @click="formatTest">测试</div>
        <section>
            <header class='header'><span class='mark'>*</span>客户选择</header>
            <base-radio-group v-model="currentClient" class="radio-group">
                <base-radio v-for="(client,index) in clientValue"
                            :label="client.key"
                            name="client"
                            :key="index">
                    {{client.value}}
                </base-radio>
            </base-radio-group>
        </section>
        <base-form-group label="专业选择" mark @click="openMajorSelect">
            <input type="hidden" v-model="major" class='major-value'>
            <span class='s-select'>{{dispalymajorValue}}</span>
        </base-form-group>
        <base-form-group label="作业点" mark>
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
            <base-radio-group v-model="currentWorkType" class="radio-group">
                <base-radio v-for="(workType,index) in workTypeValue"
                            :key="index"
                            :label="workType.key">
                    {{workType.value}}
                </base-radio>
            </base-radio-group>
        </section>
        <base-form-group label="作业类别" mark>
            <div class='s-select' @click="openWorkSortSelect">
                <input type="hidden" v-model="workSort" class='workSort-value'>
                {{dispalyWorkSortValue}}
            </div>
        </base-form-group>
        <base-form-group label="作业起止时间" mark></base-form-group>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <datetime class="time-input" placeholder="请选择开始时间" v-model='startTime' :format="dateTime.options.format" type="datetime"
                            :phrases="dateTime.options.phrases"></datetime>
            </div>
            <div>
                <datetime placeholder="请选择结束时间" v-model='endTime' :format="dateTime.options.format" type="datetime"
                             :phrases="dateTime.options.phrases"></datetime>
            </div>
        </div>
        <section class='mt-40'>
            <header><span class='mark'>*</span>作业内容</header>
            <div class='mt-30'>
                <textarea class='s-textarea' placeholder='请填写详细的作业内容'></textarea>
            </div>
        </section>
        <line-10></line-10>
        <base-form-group label="劳务费用">
            <input class='s-input' type="number" placeholder="请填写劳务费用"><span>元</span>
        </base-form-group>
        <base-form-group label="关联工单号">
            <input class='s-input' type="text" placeholder="请填写甲方关联工单号（非必填）">
        </base-form-group>
        <line-10></line-10>
        <base-form-group label="是否存在遗留问题">
            <f7-input type="switch"></f7-input>
        </base-form-group>
        <question></question>
        <section v-if="showAmmeter">
            <f7-list class="ammeter-accordion">
                <f7-list-item accordion-item
                              v-for="(ammeter,index) in ammeterList"
                              :key="index"
                              :title="'电表'+(index+1)">
                    <f7-accordion-content>
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
        </section>
        <f7-block>
            <f7-button full active big>提交</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
  import { client, clientValue, globalConst as native, major, majorValue, workType, workTypeValue } from 'lib/const'
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/children/BaseRadio'
  import Question from 'components/baseQuestion/BaseQuestion.vue'
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

  export default {
    name: 'fillorder',
    data () {
      return {
        clientValue,
        workTypeValue,
        currentClient: client.mobile,
        currentWorkType: workType.year,
        majorPicker: null,
        workSortPicker: null,
        major: major.jizhan,
        workSort: null,
        majorValue,
        jobPoint: null,
        startTime: new Date().toISOString(),
        endTime: '',
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
        console.log('test', this.major, Array.isArray(this.major))
        return majorValue.filter((row) => row.key >>> 0 === this.major >>> 0)[0].value
      },
      // 需要修改
      dispalyWorkSortValue () {
        return majorValue.filter((row) => row.key >>> 0 === this.major >>> 0)[0].value
      },
      dispalyjobPointValue () {

      }
    },
    methods: {
      formatTest () {
        console.log(moment(this.startTime).format('YYYY-MM-DD HH:mm:ss'))
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
            this.major = value[0]
          }
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
        this.$f7.accordionOpen('.accordion-item')
      })
    },
    components: {BaseRadio, BaseRadioGroup, Question}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/fillOrder.scss";
</style>