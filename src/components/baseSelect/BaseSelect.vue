<template>
    <div @click="openSelect">
        <input type="hidden" class='input-wrap'>
        <span class='s-select'>{{displayValue}}</span>
    </div>
</template>

<script>
  export default {
    props: {
      isInit: {
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
        this.picker = this.$f7.picker({
          closeByOutsideClick: false,
          input: '.input-wrap',
          cols: [
            {
              textAlign: 'center',
              displayValues: data.map((row) => row[this.nodeLabel]),
              values: data.map((row) => row[this.nodeKey])
            }
          ],
          onClose: ({cols, value, displayValue}) => {
            this.displayValue = displayValue[0]
            this.$emit('input', value[0] >>> 0)
          },
          onOpen: (picker) => {
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
            console.log(this.picker, 'picker', nowData, this.picker.cols, this.text)
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

</style>