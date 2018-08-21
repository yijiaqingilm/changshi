<template>
    <div class='ammeter-list-item'>
        <header class='ammeter-list-item-header'>
            <div class='header-left'>电表{{index+1}}</div>
            <div class='header-right'>
                <div>
                    <base-icon @click="handleDel" iconName="del" label="删除"></base-icon>
                </div>
                <div>
                    <span class="icon_expand" :class="[isExpand ? 'icon_expand' : 'icon_collapse']"
                          @click="changeFolding"></span>
                </div>
            </div>
        </header>
        <section v-show="isExpand">
            <base-form-group class='item-group' label="电表编号">
                <scan-input v-model="_code" @scan="scanAmmeter" placeholder="请扫描或输入电表编号"></scan-input>
            </base-form-group>
            <base-form-group class='item-group' label="抄表时间">
                <!--{{_date | dateFormat}}-->
                <input type="text" @click="openDatePicker" placeholder="请选择时间" class='time-input' readonly
                       v-model="_displayDate">
            </base-form-group>
            <base-form-group class='item-group' label="上一周期抄电表度数">
                <input type="text" class='s-input' readonly :value='prevNum'>
            </base-form-group>
            <base-form-group class='item-group' label="本周期抄电表度数">
                <input type="number" class='s-input' v-model='_currentNum'>
            </base-form-group>
            <base-form-group class='item-group' label="使用度数">
                <input type="number" readonly class='s-input' v-model='_useNum'>
            </base-form-group>
            <base-form-group class='item-group' label="上传电表照">

            </base-form-group>
            <div class='item-group' @click="uploadAmmeterImg">
                <img :src="displayImg" class='item-img' alt="">
            </div>
        </section>
    </div>
</template>

<script>
  import { leave, leaveValue, modalTitle } from 'lib/const'
  import { bus } from 'src/main'
  import emitter from 'mixins/emitter'

  let defaultImg = require('../../assets/icon_upload.png')
  export default {
    props: {
      index: {},
      code: String,
      date: String,
      displayDate: String,
      prevNum: String,
      currentNum: String,
      useNum: [String, Number],
      img: {
        type: [Object, String],
        default: function () {
          return ''
        }
      },
      displayImg: {
        type: [Object, String],
        default: defaultImg
      },
      expand: {
        type: Boolean,
        default: true
      }
    },
    mixins: [emitter],
    name: '',
    data () {
      return {
        leaveValue,
        isExpand: true,
      }
    },
    created () {
      this.isExpand = this.expand
    },
    methods: {
      openDatePicker (event) {
        // bus.$emit('openDatePicker', {event, refName: `ammeterTime${this.index}`})
        this.dispatchMethod('fillorder', 'openDatePicker', {event, index: this.index})
      },
      handleDel () {
        this.$f7.confirm('确定删除？', modalTitle, () => {
          this.$emit('del')
        })

      },
      scanAmmeter (scanCode) {
        this.$emit('scanAmmeter', {
          code: scanCode,
          index: this.index
        })
      },
      uploadAmmeterImg () {
        this.$emit('uploadAmmeterImg')
      },
      changeFolding () {
        this.isExpand = !this.isExpand
      }
    },
    computed: {
      _displayDate: {
        get () {
          return this.displayDate
        },
        set (value) {
          this.$emit('update:displayDate', value)
        }
      },
      _useNum: {
        get () {
          let value = this._currentNum - this.prevNum
          this.$emit('update:useNum', value)
          return value
        },
        set (value) {
          this.$emit('update:useNum', value)
        }
      },
      _code: {
        get () {
          return this.code
        },
        set (value) {
          this.$emit('update:code', value)
        }
      },
      _date: {
        get () {
          return this.date
        },
        set (value) {
          this.$emit('update:date', value)
        }
      },
      _currentNum: {
        get () {
          return this.currentNum
        },
        set (value) {
          this.$emit('update:currentNum', value)
        }
      },
      _img: {
        get () {
          return this.img
        },
        set (value) {
          this.$emit('update:img', value)
        }
      },
    },
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseAmmeter.scss";
</style>