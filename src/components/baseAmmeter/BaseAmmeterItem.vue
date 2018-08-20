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
                {{_date | dateFormat}}
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

  let defaultImg = require('../../assets/icon_upload.png')
  export default {
    props: {
      index: {},
      code: String,
      date: String,
      prevNum: String,
      currentNum: String,
      useNum: String,
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
      _useNum: {
        get () {
          return this._currentNum - this.prevNum
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