<template>
    <div>
        <base-form-group class="title" label="发电机编码" isTitle>
            <input type="text" readonly @click="scanDynamotor" placeholder='请扫描' class='s-scan'>
        </base-form-group>
        <line-10></line-10>
        <base-form-group class='title' label="发电机存放点" isTitle></base-form-group>
        <base-radio-group v-model="point">
            <base-radio v-for="(info,index) in addressInfo"
                        :label="info.key"
                        name="info"
                        :key="index">
                {{info.value}}
            </base-radio>
        </base-radio-group>
        <section class='update-address-wrap'>
            <div class='s-select'>
                选择区域
            </div>
            <!-- <div class='s-select'>
                 作业点
             </div>-->
            <div class='s-select'>
                请选择存放仓库
            </div>
        </section>
        <line-10></line-10>
        <base-form-group class='title' label="发电机最新存放点" isTitle></base-form-group>
        <base-radio-group v-model="point">
            <base-radio v-for="(info,index) in addressInfo"
                        :label="info.key"
                        name="info"
                        :key="index">
                {{info.value}}
            </base-radio>
        </base-radio-group>
        <section class='update-address-wrap'>
            <div class='s-select'>
                选择区域
            </div>
            <div class='s-select'>
                作业点
            </div>
            <div class='s-select'>
                请选择存放仓库
            </div>
            <f7-button big full active>开始调整/介绍调整</f7-button>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'
  let addressStatus = {
    store: 0,
    static: 1
  }
  let addressInfo = [
    {key: addressStatus.store, value: '存放仓库'},
    {key: addressStatus.static, value: '固定机油'}
  ]
  export default {
    data () {
      return {
        addressStatus,
        addressInfo,
        point: addressStatus.store,
        adress: ''
      }
    },
    methods: {
      scanDynamotor () {
        let code = ''
        if (__DEBUG__) {
          code = '123'
          this.getDy(code)
        } else {
          // 扫一扫功能
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              // 扫完 回调 得到二维码
              this.getDy(result)
            }
          })
        }
      },
      getDy (code) {
        this.$store.dispatch({
          type: native.doGetDynamotor,
          code
        }).then(({data}) => {
          console.log('data', data)
        }).catch((err) => {
          this.$f7.alert(err, modalTitle)
        })
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    .title {
        margin: 40px 30px;
    }

    .update-address-wrap {
        padding: 0 30px;
    }

    .base-radio-group {
        padding: 0 30px;
    }
</style>
