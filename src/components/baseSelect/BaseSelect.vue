<template>
    <div @click="openSelect">
        <input type="hidden" class='input-wrap'>
        <span class='s-select' :class="{'big':widthAuto}">{{displayValue}}</span>
    </div>
</template>

<script>
  export default {
    props: {
      widthAuto: {
        type: Boolean,
        default: false
      },
      value: {},
      data: {},
      text: {
        type: String,
        default: '请选择'
      },
      nodeKey: {
        type: String,
        default: 'value'
      },
      nodeLabel: {
        type: String,
        default: 'label'
      }
    },
    data () {
      return {
        displayValue: '',
        picker: null
      }
    },
    methods: {
      openSelect () {
        this.picker.open()
      },
      initPicker (data) {
        let mark = false
        this.picker = this.$f7.picker({
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
          input: '.input-wrap',
          cols: [
            {
              textAlign: 'center',
              displayValues: data.map((row) => row[this.nodeLabel]),
              values: data.map((row) => row[this.nodeKey])
            }
          ],
          onClose: ({cols}) => {
            if (mark) {
              let {value, displayValue} = cols[0]
              this.displayValue = displayValue
              this.$emit('input', value >>> 0)
              this.$emit('change', this.data.filter((row) => row.id === (value >>> 0))[0])
            }
          },
          onOpen: (picker) => {
            picker.container.find('.confirm').on('click', () => {
              mark = true
              this.picker.close()
            })
            picker.container.find('.close').on('click', () => {
              mark = false
              this.picker.close()
            })
          }
        })
        // this.picker.open()
        // this.picker.close()
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (this.data && this.data.length > 0) {
          this.initPicker(this.data)
        }
      })
    },
    created () {
      this.displayValue = this.text
      if (this.value) {
        this.displayValue = this.data.filter((row) => row[this.nodeKey] >>> 0 === this.value >>> 0)[0][this.nodeLabel]
      }
    },
    watch: {
      'data': {
        handler: function (nowData, oldData) {
          this.$nextTick(() => {
            this.picker.open()
            this.picker.close()
            this.picker.cols[0].replaceValues(nowData.map((row) => row[this.nodeKey]), nowData.map((row) => row[this.nodeLabel]))

          })
        },
        deep: true,
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    .big {
        width: 100%;
    }
</style>