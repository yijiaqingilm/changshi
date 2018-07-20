<template>
    <div @click="openSelect">
        <input type="hidden" class='input-wrap'>
        <span class='s-select'>{{displayValue}}</span>
    </div>
</template>

<script>
  export default {
    props: {
      value: {},
      data: {},
      text: {
        type: String,
        default: '请选择'
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
    },
    mounted () {
      this.$nextTick(() => {
        this.picker = this.$f7.picker({
          closeByOutsideClick: false,
          input: '.input-wrap',
          cols: [
            {
              textAlign: 'center',
              displayValues: this.data.map((row) => row.value),
              values: this.data.map((row) => row.key)
            }
          ],
          onClose: ({cols, value, displayValue}) => {
            this.displayValue = displayValue[0]
            this.$emit('input', value[0] >>> 0)
          }
        })
      })
    },
    created () {
      this.displayValue = this.text
      if (this.value) {
        console.log('test', this.value, this.data)
        this.displayValue = this.data.filter((row) => row.key >>> 0 === this.value >>> 0)[0].value
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">

</style>