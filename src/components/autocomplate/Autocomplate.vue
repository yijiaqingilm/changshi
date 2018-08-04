<template>
    <div>
        <!--v-model="model"-->
        <input type="text" class='s-input autocomplate' :placeholder='placeholder'>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      loadData: {},
      value: {},
      placeholder: {
        type: String,
        default: '请搜索'
      }
    },
    data () {
      return {
        autocomplate: null
      }
    },
    computed: {
      model: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.autocomplate = this.$f7.autocomplete({
          input: '.autocomplate',
          openIn: 'dropdown',
          preloader: true, // enable preloader
          valueProperty: 'work_base', // object's "value" property name
          textProperty: 'work_base', // object's "text" property name
          limit: 20, // limit to 20 results
          dropdownPlaceholderText: 'Try "JavaScript"',
          expandInput: true, // expand input
          source: (autocomplete, query, render) => {
            var results = []
            if (query.length === 0) {
              render(results)
              return
            }
            // Show Preloader
            autocomplete.showPreloader()
            // Do Ajax request to Autocomplete data
            if (this.loadData && Object.prototype.toString.call(this.loadData) === '[object Function]') {
              this.loadData().then((data) => {
                console.log('data ===', data)
                // render(data);
                autocomplete.hidePreloader()
                render(data.data.work_base)

              }).catch(() => {
                autocomplete.hidePreloader()
                render(results)
              })
            } else {
              autocomplete.hidePreloader()
              render(results)

            }
          },
          onChange: (autocomplate, value) => {
            this.$emit('change', value)
            console.log('change=======', value)
          }
        })
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>
