<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left>
                <f7-link @click="goBack"><i class="icon icon-back"></i><span>返回</span></f7-link>
            </f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
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
                <div class="city"><span class='s-select' @click="showPopup">{{currentAddress}}</span></div>
                <template v-if="loadWorkBase">
                    <div class='loading-wrap'>
                        <f7-preloader></f7-preloader>
                        作业点加载中...
                    </div>
                </template>
                <template v-else>
                    <div v-if='workBaseList && workBaseList.length>0'>
                        <div>
                            <base-select v-model='jobCard.workBase'
                                         text="请选择作业点"
                                         :data="workBaseList"
                                         nodeKey="id"
                                         @change="changeJobPoint2"
                                         nodeLabel="work_base"></base-select>
                        </div>
                        <div @click="openAutoComplate" class='mt-15'>
                            <input type="text" class='s-input' readonly v-model="jobPointName" placeholder="请搜索作业点">
                        </div>
                    </div>
                    <div v-else class='hint'>
                        当前区域没有可选择的作业点
                    </div>
                </template>

                <div>
                    <input class='s-input' placeholder="请从上方选择或搜索作业点" type="text" readonly v-model="jobPoint">
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
                         :data="workSortList" @change="changeWorkSort"></base-select>
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
        <div v-if="showDynamotor">
            <line-10></line-10>
            <base-form-group class="m-40" label="发电机记录" isTitle></base-form-group>
            <base-form-group class="m-40" label="发电机编号">
                <scan-input v-model="jobCard.dynamotor.code" @scan="scanDynamotor" placeholder="请扫描或输入编号"></scan-input>
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

            <div v-for="(ammeter,index) in jobCard.ammeter" :key="index">
                <datetime ref="ammeterTime" :displayValue.sync="ammeter.displayDate" placeholder="请选择时间"
                          v-model='ammeter.date' :format="dateTime.options.format"
                          type="datetime"
                          :phrases="dateTime.options.phrases"></datetime>
            </div>
            <autocomplate ref="autocomplate" v-model="jobPointName" @change="changeJobPoint"
                          :loadData="getJobPointList"></autocomplate>
        </div>
    </f7-page>
</template>

<script>
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/children/BaseRadio'
  import QuestionGroup from 'components/baseQuestion/BaseQuestion.vue'
  import QuestionItem from 'components/baseQuestion/BaseQuestionItem.vue'
  import AmmeterGroup from 'components/baseAmmeter/BaseAmmeter'
  import AmmeterItem from 'components/baseAmmeter/BaseAmmeterItem'
  import Autocomplate from 'components/autocomplate/Autocomplate.vue'
  import emitter from 'mixins/emitter'
  import fillOrderMixin from 'mixins/fillOrderMixin'
  import { Validator } from 'lib/custom_validator'

  export default {
    name: 'fillorder',
    componentName: 'fillorder',
    mixins: [emitter, fillOrderMixin],
    created () {
      this.validator = new Validator({
        workBase: 'required',
        workSort: 'required',
      })
      this.$set(this, 'errors', this.validator.errorBag)
    },
    components: {BaseRadio, BaseRadioGroup, QuestionGroup, QuestionItem, AmmeterGroup, AmmeterItem, Autocomplate}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/fillOrder.scss";
</style>