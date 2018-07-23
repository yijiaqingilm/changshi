<template>
    <div @click="openSelect">
        <input type="text" class='input-wrap'>
        <span class='s-select'>{{displayValue}}</span>
    </div>
</template>

<script>
  import { globalConst as native } from 'lib/const'

  export default {
    props: {
      isInit: {
        type: Boolean,
        default: false
      },
      value: {},
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
        picker: null,
        data: {},
        cityData: {},
        districtData: {},
      }
    },
    methods: {
      formatData (dataObj) {
        let data = []
        for (let key in dataObj) {
          if (dataObj.toString.call(key)) {
            data.push({[this.nodeKey]: key, [this.nodeLabel]: dataObj[key]})
          }
        }
        return data
      },
      openSelect () {
        this.picker.open()
      },
      initPicker (data, cityData, districtData) {
        this.picker = this.$f7.picker({
          closeByOutsideClick: false,
          updateValuesOnTouchmove: false,
          formatValue: (picker, values, displayValues) => {
            console.log('但是我蛮了。', picker)
            console.log('val=============', displayValues)
            return displayValues.join('')
          },
          /* rotateEffect: true,*/
          input: '.input-wrap',
          cols: [
            {
              width: '30%',
              textAlign: 'center',
              displayValues: data.map((row) => row[this.nodeLabel]),
              values: data.map((row) => row[this.nodeKey]),
              onChange: async (picker, province) => {
                if (picker.cols[1].replaceValues) {
                  let result = await this.$store.dispatch({
                    type: native.doAddressList,
                    s: 'city',
                    province_id: province
                  })
                  let nowData = this.formatData(result.data)
                  console.log('我先设置值', picker)
                  picker.updateValue()
                  picker.cols[1].replaceValues(nowData.map((row) => row[this.nodeKey]), nowData.map((row) => row[this.nodeLabel]))
                  picker.cols[1].onChange(picker, nowData[0][this.nodeKey])

                }
              }
            },
            {
              width: '30%',
              textAlign: 'center',
              displayValues: cityData.map((row) => row[this.nodeLabel]),
              values: cityData.map((row) => row[this.nodeKey]),
              onChange: async (picker, city) => {
                console.log('触发改变')
                if (picker.cols[2].replaceValues) {
                  let result = await this.$store.dispatch({
                    type: native.doAddressList,
                    s: 'district',
                    city_id: city
                  })
                  let nowData = this.formatData(result.data)
                  picker.cols[2].replaceValues(nowData.map((row) => row[this.nodeKey]), nowData.map((row) => row[this.nodeLabel]))
                  picker.cols[2].onChange(picker, nowData[0][this.nodeKey])
                  picker.cols[2].setValue(nowData[0][this.nodeKey])

                }
              }
            },
            {
              width: '30%',
              textAlign: 'center',
              displayValues: districtData.map((row) => row[this.nodeLabel]),
              values: districtData.map((row) => row[this.nodeKey]),
              onChange: (picker, province) => {
                console.log('区域改变', province)
              }
            }
          ],
          onClose: ({cols, value, displayValue}) => {
            console.log('close', value, displayValue)
            this.displayValue = displayValue.join('')
            this.$emit('input', value)
          },
          onOpen: (picker) => {
          }
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        let data = []
        let cityData = []
        let districtData = []
        this.$store.dispatch({
          type: native.doAddressList,
          s: 'province',
        }).then(({data}) => {
          data = this.formatData(data)
          this.$store.dispatch({
            type: native.doAddressList,
            s: 'city',
            province_id: data[0] && data[0][this.nodeKey]
          }).then((result) => {
            cityData = this.formatData(result.data)
            this.$store.dispatch({
              type: native.doAddressList,
              s: 'district',
              city_id: cityData[0] && cityData[0][this.nodeKey]
            }).then((result) => {
              districtData = this.formatData(result.data)
              this.initPicker(data, cityData, districtData)
            })
          })
        })
      })
    },
    created () {
      this.displayValue = this.text
      if (this.value) {
        this.displayValue = this.data.filter((row) => row[this.nodeKey] >>> 0 === this.value >>> 0)[0][this.nodeLabel]
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">

</style>