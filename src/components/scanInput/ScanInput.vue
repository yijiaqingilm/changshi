<template>
    <span class='scan-input'>
        <div class='scan' @click="scan"></div>
        <input type="text" v-model='mode' :disabled="disable" @keyup.enter="onSearch" :placeholder='placeholder'
               class='s-scan'>
    </span>
</template>

<script>
  import { wxScanQRCode } from 'lib/utils'

  export default {
    name: '',
    props: {
      value: {},
      placeholder: {
        type: String,
        default: '请扫描'
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    computed: {
      mode: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      onSearch () {
        if (this.disable) {
          return
        }
        this.$emit('scan', this.value)
      },
      scan () {
        if (this.disable) {
          return
        }
        if (__DEBUG__) {
          this.$emit('scan', '')
        } else {
          wxScanQRCode().then((result) => {
            this.$emit('scan', result)
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "scanInput.scss";
</style>