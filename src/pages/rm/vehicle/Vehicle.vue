<template>
    <f7-page class='vehicle'>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>车辆管理</f7-nav-center>
        </f7-navbar>
        <header>
            <hint>提示：出车及收车信息根据触发‘出车’及‘收车’按键时自动生成</hint>
            <base-form-group class="title" label="车牌号" isTitle>
                <scan-input v-model="carnumber" @scan="scanCode"></scan-input>
            </base-form-group>
        </header>
        <section class='info-panel'>
            <header>出车信息</header>
            <section class='panel-context'>
                <base-form-group label="出车时间">
                    {{vehicleInfo.out.date && vehicleInfo.out.date}}
                </base-form-group>
                <base-form-group label="出车位置" :ellipsis="false">
                    {{vehicleInfo.out.position && vehicleInfo.out.position}}
                </base-form-group>
            </section>
        </section>
        <section class='info-panel' v-if='vehicleInfo.retract.address'>
            <header>收车信息</header>
            <section class='panel-context'>
                <base-form-group label="收车时间">
                    {{vehicleInfo.retract.date && vehicleInfo.retract.date | dateFormat}}
                </base-form-group>
                <base-form-group label="收车位置" :ellipsis="false">
                    {{vehicleInfo.retract.address && vehicleInfo.retract.address}}
                </base-form-group>
            </section>
        </section>
        <section class='context'>
            <base-form-group label="出车里程数" isTitle>
                <input type="number" v-model="info.outMileage" class='s-input' placeholder='请输入里程数'>
            </base-form-group>
            <base-form-group label="加油费用" isTitle>
                <input type="number" v-model="info.oilfee" class='s-input' placeholder='请输入加油费用，无填0'>
            </base-form-group>
            <base-form-group label="路桥费用" isTitle>
                <input type="number" v-model="info.bridgefee" class='s-input' placeholder='请输入路桥费用，无填0'>
            </base-form-group>
            <base-form-group label="维修费用" isTitle>
                <input type="number" v-model="info.servicefee" class='s-input' placeholder='请输入维修费用，无填0'>
            </base-form-group>
            <base-form-group label="其他费用" isTitle>
                <input type="number" v-model='info.otherfee' class='s-input' placeholder='请输入其他费用，无填0'>
            </base-form-group>
            <base-form-group label="收车里程数" isTitle v-if="vehicleInfo.out.date">
                <input type="number" v-model='info.retractMileage' class='s-input' placeholder='请输入里程数'>
            </base-form-group>
            <base-form-group label="行驶总路程" isTitle v-if="vehicleInfo.out.date">
                {{totalMileage}} 公里
            </base-form-group>
            <base-form-group label="总费用" isTitle>
                ￥ {{totalFee}}
            </base-form-group>
            <base-form-group label="备注" isTitle>
                <input type="text" v-model='info.remark' class='s-input' placeholder='请填写备注(非必填)'>
            </base-form-group>
        </section>
        <section class='footer'>
            <f7-button big full active :color="btnOutCarDisable ? 'gray':''" @click='debounceStartOff'
                       v-if="!vehicleInfo.out.date">出车
            </f7-button>
            <f7-button big full active :color="btnDisable ? 'gray':''" @click="debounceGetTo" v-else>收车</f7-button>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import Hint from 'components/hint/Hint.vue'
  import { modalTitle, globalConst as native } from 'lib/const'
  import { Validator } from 'lib/custom_validator'
  import { aMapUtil, isNumber, wxScanQRCode } from 'lib/utils'
  import debounce from 'lodash/debounce'

  export default {
    data () {
      return {
        vehicleInfo: {
          out: {},
          retract: {},
          mileage: 0
        },
        errors: null,
        validator: null,
        info: {
          outMileage: '',
          oilfee: '',
          outAdd: '',
          outLng: '',
          outLat: '',
          bridgefee: '',
          servicefee: '',
          otherfee: '',
          totalfee: '',
          retractMileage: '',
          mileage: 0,
          retractAdd: '',
          retractLng: '',
          retractLat: '',
          remark: ''
        },
        carnumber: ''
      }
    },
    created () {
      this.validator = new Validator({
        oilfee: 'required',
        bridgefee: 'required',
        servicefee: 'required',
        otherfee: 'required',
        retractMileage: 'required',
        outMileage: 'required'
      })
      this.$set(this, 'errors', this.validator.errorBag)
      this.debounceStartOff = debounce(this.startOff, 500, {
        leading: true,
      })
      this.debounceGetTo = debounce(this.getTo, 500, {
        leading: true,
      })
    },
    methods: {
      startOff () {
        if (!this.carnumber) {
          this.$f7.alert('请扫描车牌号', modalTitle)
          return
        }
        this.$f7.confirm('是否确认出车', modalTitle, () => {
          if (parseFloat(this.info.outMileage, 10) < parseFloat(this.vehicleInfo.mileage, 10)) {
            this.$f7.alert('出车里程数必须大于或等于上一次收车里程数', modalTitle)
            return
          }
          this.$store.dispatch({
            type: native.startOff,
            license_plate: this.carnumber,
            out_mileage: this.info.outMileage,
          }).then(({data}) => {
            console.log('出车成功', data)
            this.vehicleInfo.out.date = data.out.date
            this.vehicleInfo.out.position = data.out.position
          })
        })

      },
      getTo () {
        let {bridgefee, servicefee, otherfee, oilfee, outMileage, remark, retractMileage} = this.info
        this.validator.validateAll({
          oilfee,
          bridgefee,
          servicefee,
          otherfee,
          retractMileage,
          outMileage
        })
        if (parseFloat(outMileage, 10) < parseFloat(this.vehicleInfo.mileage, 10)) {
          this.$f7.alert('出车里程数必须大于或等于上一次收车里程数', modalTitle)
          return
        }
        if (parseFloat(retractMileage, 10) < parseFloat(outMileage, 10)) {
          this.$f7.alert('收车里程数必须大于或等于出车里程数', modalTitle)
          return
        }
        //  校验信息
        if (this.errors.errors.length > 0) {
          this.$f7.addNotification({
            media: ('<span className=\'iconfont icon-error\'></span>'),
            title: '提示',
            message: this.errors.errors[0].msg
          })
          setTimeout(() => {
            this.$f7.closeNotification('.notifications')
          }, 2000)
          return
        }
        let that = this
        aMapUtil.geolocation().then((data) => {
          let formattedAddress = data.formattedAddress
          let {lat, lng} = data.position
          that.$set(that.vehicleInfo.retract, 'date', new Date())
          that.$set(that.vehicleInfo.retract, 'address', formattedAddress)
          that.$f7.confirm('是否确认收车？', modalTitle, () => {
            that.$store.dispatch({
              type: native.getTo,
              license_plate: that.carnumber,
              out_mileage: outMileage,
              oilfee,
              bridgefee,
              servicefee,
              otherfee,
              totalfee: that.totalFee,
              retract_mileage: retractMileage,
              mileage: that.totalMileage,
              remark
            }).then(() => {
              this.$f7.alert('收车成功', modalTitle)
              this.carnumber = ''
              this.vehicleInfo.out.date = ''
              this.vehicleInfo.out.position = ''
              this.vehicleInfo.retract.date = ''
              this.vehicleInfo.retract.address = ''
              this.info = {}
            })
          })
        })
      },
      scanCode (code) {
        if (__DEBUG__) {
          this.carnumber = '粤B2500'
        } else {
          this.carnumber = code
        }
        this.doCarDetail()
      },
      doCarDetail () {
        this.$store.dispatch({
          type: native.doCarDetail,
          carnumber: this.carnumber
        }).then(({data}) => {
          console.log('data', data)
          this.vehicleInfo.out = data.out
          this.vehicleInfo.mileage = data.mileage
        }).catch((err) => {
          this.$f7.alert(err, modalTitle)
          this.carnumber = ''
          this.vehicleInfo.out.date = ''
          this.vehicleInfo.out.position = ''
          this.vehicleInfo.retract.date = ''
          this.vehicleInfo.retract.address = ''
          this.info = {}
        })
      }
    },
    computed: {
      btnOutCarDisable () {
        if (!this.carnumber) {
          return true
        }
        return false
      },
      btnDisable () {
        let {bridgefee, servicefee, otherfee, oilfee, retractMileage, outMileage} = this.info
        if (isNumber(bridgefee) && isNumber(servicefee) && isNumber(otherfee) && isNumber(oilfee) && isNumber(retractMileage) && isNumber(outMileage)) {
          return false
        } else {
          return true
        }
      },
      totalMileage () {
        let total = this.info.retractMileage - this.info.outMileage
        return isNaN(parseFloat(total)) ? 0 : parseFloat(total)
      },
      totalFee () {
        let {bridgefee, servicefee, otherfee, oilfee} = this.info
        if (!bridgefee) {
          bridgefee = 0
        }
        if (!servicefee) {
          servicefee = 0
        }
        if (!otherfee) {
          otherfee = 0
        }
        if (!oilfee) {
          oilfee = 0
        }
        let totalFee = parseFloat(bridgefee) + parseFloat(servicefee) + parseFloat(otherfee) + parseFloat(oilfee)
        return isNaN(parseFloat(totalFee)) ? 0 : parseFloat(totalFee)
      }
    },
    components: {Hint}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../../../css/vehicle.scss";
</style>
