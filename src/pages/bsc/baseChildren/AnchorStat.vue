<template>
    <div>
        <header>查询时间</header>
        <div class='time-group'>
            <span class='time-slash'></span>
            <div>
                <datetime class="time-input" placeholder="请选择开始时间" v-model='combo.startDate'
                          :format="dateTime.options.format"
                          type="datetime"
                          :phrases="dateTime.options.phrases"></datetime>
            </div>
            <div>
                <datetime placeholder="请选择结束时间" v-model='combo.endDate' :format="dateTime.options.format"
                          type="datetime"
                          :phrases="dateTime.options.phrases"></datetime>
            </div>
        </div>
        <div class='combo'>
            <base-form-group class="mt-15" label="地址选择：" >
                <span class='s-select' @click="showPopup">{{currentAddress}}</span>
            </base-form-group>
            <base-form-group class="mt-15" label="客户选择：" >
                <base-select v-model="combo.client" text="请选择客户" :data="clientValue"></base-select>
            </base-form-group>
            <base-form-group class="mt-15" label="专业选择:" >
                <base-select v-model="combo.major" text="请选择专业" :data="majorValue"></base-select>
            </base-form-group>
        </div>
        <line-10></line-10>
        <chart :options="polar" ></chart>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { majorValue, clientValue } from 'lib/const'
  export default {
    data () {
      return {
        clientValue,
        majorValue,
        combo: {
          client: '',
          major: '',
          startDate: '',
          endDate: ''
        },
        dateTime: {
          options: {
            phrases: {
              ok: '确定',
              cancel: '关闭'
            },
            format: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        polar: {
          title: {
            text: '工单统计',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}个 ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['好', '非超好', '良好','合格','不合格']
          },
          series: [
            {
              name: '工单统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: ' 好'},
                {value: 310, name: '非常好'},
                {value: 234, name: '良好'},
                {value: 234, name: '合格'},
                {value: 234, name: '不合格'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      showPopup () {
        this.$f7.popup('.popup-province', false)
      },
    },
    computed: {
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
      currentAddress () {
        let currentAddress = this.activeAddress.provinceName + this.activeAddress.cityName + this.activeAddress.districtName
        return currentAddress.length > 0 ? currentAddress : '请选择地址'
      },
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "orderStat.scss";
</style>
