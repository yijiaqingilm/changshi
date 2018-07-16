<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
        <section>
            <header><span class='mark'>*</span>客户选择</header>
            <base-radio-group v-model="currentClient">
                <base-radio v-for="(client,index) in clientValue"
                            :label="client.key"
                            name="client"
                            :key="index">
                    {{client.value}}
                </base-radio>
            </base-radio-group>
        </section>
        <section>
            <div class='s-label'><span class="mark">*</span>专业选择</div>
            <div class='s-select' @click="openMajorSelect">
                <input type="hidden" v-model="major" class='major-value'>
                {{dispalymajorValue}}
            </div>
        </section>
        <section>
            <div class='s-label'><span class="mark">*</span>作业点</div>
            <div class="s-item">
                <div class='s-input'>
                    <input type="text" readonly v-model="jobPoint">
                </div>
                <div class="city">xxx</div>
                <div>
                    <input type="hidden" v-model='jobPoint'>
                </div>
                <div>
                    search
                </div>
            </div>
        </section>
        <section>
            <base-radio-group v-model="currentWorkType">
                <base-radio v-for="(workType,index) in workTypeValue"
                            :key="index"
                            :label="workType.key">
                    {{workType.value}}
                </base-radio>
            </base-radio-group>
        </section>
        <section>
            <div class='s-label'><span class="mark">*</span>作业类别</div>
            <div class='s-select' @click="openWorkSortSelect">
                <input type="hidden" v-model="workSort" class='workSort-value'>
                {{dispalyWorkSortValue}}
            </div>
        </section>
        <section>
            <header><span class='mark'>*</span>作业起止时间</header>
            <div>xxx/yyy</div>
        </section>
        <section>
            <div class="s-label">劳务费用</div>
            <div class="s-item"><input type="number" placeholder="请填写劳务费用"><span>元</span></div>
        </section>
        <section>
            <div class="s-label">关联工单号</div>
            <div class="s-item"><input type="text" placeholder="请填写甲方关联工单号（非必填）"></div>
        </section>
        <section>
            <header><span class='mark'>*</span>作业内容</header>
            <div>
                <textarea placeholder='请填写详细的作业内容'></textarea>
            </div>
        </section>
        <section>
            <div class="s-label">是否存在遗留问题</div>
            <div class="s-item"><f7-input type="switch"></f7-input></div>
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
        major: major.xianlu,
        workSort: null,
        majorValue,
        jobPoint: null
      }
    },
    created () {
    },
    computed: {
      dispalymajorValue () {
        return majorValue.filter((row) => row.key >>> 0 === this.major >>> 0)[0].value
      },
      // 需要修改
      dispalyWorkSortValue () {
        return majorValue.filter((row) => row.key >>> 0 === this.major >>> 0)[0].value
      },
    },
    methods: {
      openMajorSelect () {
        this.majorPicker.open()
      },
      openWorkSortSelect(){
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
            this.major = value
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
        this.majorPicker.open()
        this.majorPicker.close()
        this.workSortPicker.open()
        this.workSortPicker.close()
      })
    },
    components: {BaseRadio, BaseRadioGroup}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>