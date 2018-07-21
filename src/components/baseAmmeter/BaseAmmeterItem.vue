<template>
    <div class='ammeter-list-item'>
        <header class='ammeter-list-item-header'>
            <div>电表{{index}}</div>
            <div>
                <div><base-icon @click="handleDel" iconName="del" label="删除"></base-icon></div>
                <div></div>
            </div>
        </header>
        <section>
            <base-form-group label="电表编号">
                <input class='s-scan' readonly @click="scanAmmeter" type="text" v-model='_code'
                       placeholder="请扫描或输入电表编号">
            </base-form-group>
            <base-form-group label="抄表时间">
                {{_date}}
            </base-form-group>
            <base-form-group label="上一周期抄电表度数">
                <input type="text" class='s-input' readonly :value='prevNum'>
            </base-form-group>
            <base-form-group label="本周期抄电表度数">
                <input type="text" class='s-input' v-model='_currentNum'>
            </base-form-group>
            <base-form-group label="使用度数">
                <input type="text" class='s-input' v-model='_useNum'>
            </base-form-group>
            <base-form-group label="上传电表照">
                <input type="text" class='s-input' v-model='_img'>
            </base-form-group>
        </section>
    </div>
</template>

<script>
  import { leave, leaveValue } from 'lib/const'

  export default {
    props: {
      index: {},
      code: String,
      date: String,
      prevNum: String,
      currentNum: String,
      useNum: String,
      img: {}
    },
    name: '',
    data () {
      return {
        leaveValue,
      }
    },
    methods: {
      handleDel () {
        this.$emit('del')
      },
      scanAmmeter () {
        this.$emit('scanAmmeter')
      }
    },
    computed: {
      _useNum: {
        get () {
          return this.useNum
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