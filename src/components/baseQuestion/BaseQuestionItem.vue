<template>
    <div class='base-question'>
        <div class='title'>
            <div>问题{{index}}</div>
            <div>
                <base-icon @click="handleDel" iconName="del" label="删除"></base-icon>
            </div>
        </div>

        <base-form-group label="遗留问题级别：">
            <base-select v-model="_level" text="text" :data="levelValue"></base-select>
        </base-form-group>
        <div>
            <header>遗留问题:</header>
            <div class='mt-30'>
                <textarea v-model='_question' class='s-textarea' placeholder='请填写遗留问题内容'></textarea>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
  import { level, levelValue } from 'lib/const'

  export default {
    props: {
      index: {},
      question: String,
      level: {
        type: Number,
        default: level.two
      }
    },
    name: '',
    data () {
      return {
        levelValue
      }
    },
    methods: {
      handleDel () {
        this.$emit('del')
      }
    },
    computed: {
      _question: {
        get () {
          return this.question
        },
        set (value) {
          this.$emit('update:question', value)
        }
      },
      _level: {
        get () {
          return this.level
        },
        set (value) {
          this.$emit('update:level', value)
        }

      },
    },
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "baseQuestion.scss";
</style>