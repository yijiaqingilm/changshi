<template>
    <f7-page class='fill-order'>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>作业填报</f7-nav-center>
        </f7-navbar>
        <section>
            <header><span class='mark'>*</span>客户选择</header>
            <base-radio-group v-model="CurrentClient">
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
            <div class='s-input'>
                <input type="text" readonly v-model="orderPoint">
            </div>
        </section>
    </f7-page>
</template>

<script>
  import { clientValue, globalConst as native, major, majorValue } from 'lib/const'
  import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup'
  import BaseRadio from 'components/baseRadioGroup/chilren/BaseRadio'

  export default {
    name: 'fillorder',
    data () {
      return {
        clientValue,
        CurrentClient: 1,
        majorPicker: null,
        major: major.xianlu,
        majorValue,
      }
    },
    created () {
    },
    computed: {
      dispalymajorValue () {
        return majorValue.filter((row) => row.key >>> 0 === this.major >>> 0)[0].value
      }
    },
    methods: {
      openMajorSelect () {
        console.log('xxx')
        this.majorPicker.open()
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
            console.log(value, 'value', this.major)
            // this.major = value
            this.major = value
          }
        })
        // 手动初始化picker cols
        this.majorPicker.open()
        this.majorPicker.close()
      })
    },
    components: {BaseRadio, BaseRadioGroup}
  }
</script>

<style lang="scss" scoped type="text/css">

</style>