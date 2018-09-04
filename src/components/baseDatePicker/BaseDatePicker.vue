<template>
    <div @click="openSelect">
        <input readonly type="hidden" class='s-input baseDate'>
        <span>{{displayValue}}</span>
    </div>
</template>

<script>
  import { dateType } from 'lib/const'
  import { prefixInteger } from 'lib/utils'

  export default {
    name: '',
    props: {
      mode: {
        type: Number,
        default:
        dateType.year
      },
      value: {},
      text: {
        type: String,
        default: '请选择'
      }
    },
    data () {
      return {
        datePicker: null,
        displayValue: ''
      }
    },
    created () {
      this.displayValue = this.text
      if (this.value) {
        this.displayValue = this.value
      }
    },
    methods: {
      openSelect () {
        this.datePicker.open()
      },
    },
    mounted () {
      this.$nextTick(() => {
        let now = new Date()
        const beginYear = now.getFullYear() - 50
        const endYear = now.getFullYear() + 1
        const years = Array.from({length: endYear - beginYear}, (v, i) => beginYear + i)
        const months = Array.from({length: 12}, (v, i) => i + 1)
        const days = Array.from({length: 31}, (v, i) => i + 1)
        const getDayCount = (year, month) => new Date(year, month, 0).getDate()
        const pickerCols = [
          {
            values: years,
          },
          {
            values: months,
          },
          {
            values: days,
          }
        ]
        let cols = []
        let value = []
        switch (this.mode) {
          case dateType.year:
            cols = pickerCols.slice(0, 1)
            value = [now.getFullYear()]
            break
          case dateType.yearAndMonth:
            cols = pickerCols.slice(0, 2)
            value = [now.getFullYear(), now.getMonth() + 1]
            break
          case dateType.yearAndMonthAndDay:
            cols = pickerCols.slice(0)
            value = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
        }
        console.log(cols, 'pickerCols')
        let mark = false
        this.datePicker = this.$f7.picker({
          toolbarTemplate: `<div class="toolbar">
                              <div class="toolbar-inner">
                                <div class="left"></div>
                                <div class="right">
                                  <a href="#" class="confirm">确定</a>
                                  <a href="#" class="close">关闭</a>
                                </div>
                              </div>
                            </div> `,
          closeByOutsideClick: false,
          updateValuesOnTouchmove: false,
          /* rotateEffect: true,*/
          input: '.baseDate',
          toolbarCloseText: '完成',
          cols,
          value,
          onChange: (picker, values, displayValues) => {
            if (this.mode === dateType.yearAndMonthAndDay) {
              const daysInMonth = getDayCount(picker.value[0], picker.value[1])
              if (values[2] > daysInMonth) {
                picker.cols[2].setValue(daysInMonth)
              }
            }
          },
          onClose: ({cols}) => {
            if (mark) {
              let value = cols.reduce((colA, colB) => colA + '-' + prefixInteger(colB.value), '').slice(1)
              this.displayValue = value
              this.$emit('input', value)
              this.$emit('change', value)
            }
          },
          onOpen: (picker) => {
            picker.container.find('.confirm').on('click', () => {
              mark = true
              this.datePicker.close()
            })
            picker.container.find('.close').on('click', () => {
              mark = false
              this.datePicker.close()
            })
          }
        })
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>