<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回列表"></f7-nav-left>
            <f7-nav-center>增加收货地址</f7-nav-center>
        </f7-navbar>
        <f7-list>
            <f7-list-item title="城市" :after="showCity" link link-open-popup=".popup-province"></f7-list-item>
            <f7-list-item v-if="addressInfo.district==='其他'">
                <f7-label>填写区域</f7-label>
                <f7-input type="text" v-model="customDistrict" placeholder="请填写所属区域"/>
            </f7-list-item>
            <f7-list-item>
                <f7-label>地址</f7-label>
                <f7-input type="text" v-model="addressInfo.detail" placeholder="请输入详细收货地址"/>
            </f7-list-item>
            <f7-list-item>
                <f7-label>联系人</f7-label>
                <f7-input type="text" v-model="addressInfo.contact" placeholder="请输入收货联系人名字"/>
            </f7-list-item>
            <f7-list-item>
                <f7-label>联系电话</f7-label>
                <f7-input type="tel" v-model="addressInfo.mobile" placeholder="请输入收货联系人手机号码"/>
            </f7-list-item>
        </f7-list>
        <f7-block>
            <f7-button big active color='green' @click="bySubmit">确定</f7-button>
        </f7-block>
        <div slot="fixed">
            <f7-popup class="popup-province">
                <div class="city-navbar">
                    <div class="navbar-left">
                        <a href="#" class="link" @click="closePopupProvince">
                            <i class="icon icon-back"></i>
                            <span>返回</span>
                        </a>
                    </div>
                    <div class="navbar-center">选择省份</div>
                </div>

                <div class="city-content">
                    <f7-list v-if="provinces">
                        <f7-list-item v-for="(row,index) in provinces"
                                      :key="index"
                                      :title="row.province"
                                      :value="row.id"
                                      name="province"
                                      @click="selectProvince(row)"
                                      radio>
                        </f7-list-item>
                    </f7-list>
                </div>
            </f7-popup>
            <f7-popup class="popup-city">
                <div class="city-navbar">
                    <div class="navbar-left">
                        <a href="#" class="link" @click="closePopupCity">
                            <i class="icon icon-back"></i>
                            <span>返回</span>
                        </a>
                    </div>
                    <div class="navbar-center">选择城市</div>
                </div>
                <div class="city-content">
                    <f7-list v-if="cityList">
                        <f7-list-item v-for="(row,index) in cityList"
                                      :key="index"
                                      :title="row.city"
                                      :value="row.id"
                                      name="city"
                                      @click="selectCity(row)"
                                      radio>
                        </f7-list-item>
                        <!-- @click="changeCity"-->
                    </f7-list>
                </div>
            </f7-popup>
            <f7-popup class="popup-district">
                <div class="city-navbar">
                    <div class="navbar-left">
                        <a href="#" class="link" @click="closePopupDistrict">
                            <i class="icon icon-back"></i>
                            <span>返回</span>
                        </a>
                    </div>
                    <div class="navbar-center">区域</div>
                </div>
                <div class="city-content">
                    <f7-list v-if="districtList && districtList[city.cityId]">
                        <f7-list-item v-for="(row,index) in districtList[city.cityId]"
                                      :key="index"
                                      :title="row.district"
                                      :value="row.district"
                                      name="district"
                                      @click="selectDistrict(row)"
                                      radio>
                        </f7-list-item>
                    </f7-list>
                </div>
            </f7-popup>
        </div>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import CityList from 'components/cityList/CityList'
  import { Validator } from 'lib/custom_validator'

  export default {
    data () {
      return {
        provinceTest: 1,
        errors: null,
        validator: null,
        customDistrict: '',
        addressInfo: {
          detail: '',
          contact: '',
          mobile: '',
          district: ''
        }
      }
    },
    created () {
      let {dispatch} = this.$store
      dispatch({
        type: native.doListProvince
      })

      this.validator = new Validator({
        district: 'required|district',
        detail: 'required|detail',
        contact: 'required|contact',
        mobile: 'required|mobile',
      })
      this.$set(this, 'errors', this.validator.errorBag)

    },
    methods: {
      selectProvince (province) {
        let {commit, dispatch} = this.$store
        commit(native.doSelectProvince, {
          provinceId: province.id, provinceName: province.province
        })
        commit(native.resetCity)
        dispatch({
          type: native.doListCity
        })
        this.$f7.popup('.popup-city')
      },
      selectCity (city) {
        let {commit, dispatch} = this.$store
        commit(native.doSelectCity, {
          cityId: city.id,
          cityName: city.city
        })
        this.$store.dispatch({
          type: native.doGetDistricts,
          cityId: city.id
        })
        this.$f7.popup('.popup-district')
      },
      selectDistrict (district) {
        this.addressInfo.district = district.district
        this.closePopupCity()
      },
      closePopupDistrict () {
        this.$f7.closeModal('.popup-district')
        this.$f7.closeModal()
      },
      closePopupCity () {
        this.$f7.closeModal('.popup-city')
        // 疑似f7bug 不能同时关闭。一旦同时关闭会销毁popup对象
        this.$f7.closeModal()
      },
      closePopupProvince () {
        this.$f7.closeModal('.popup-province')
        // 疑似f7bug 不能同时关闭。一旦同时关闭会销毁popup对象
        this.$f7.closeModal()
      },
      bySubmit () {
        const {provinceId, cityId} = this.city
        if (!provinceId || provinceId === -1) {
          this.$f7.addNotification({
            media: ('<span className=\'iconfont icon-error\'></span>'),
            title: '提示',
            message: '请选择收货省份'
          })
          return
        }
        if (!cityId || cityId === -1) {
          this.$f7.addNotification({
            media: ('<span className=\'iconfont icon-error\'></span>'),
            title: '提示',
            message: '请选择收货城市'
          })
          return
        }
        this.validator.validateAll({
          district: this.addressInfo.district,
          detail: this.addressInfo.detail,
          contact: this.addressInfo.contact,
          mobile: this.addressInfo.mobile
        })
        //  校验信息
        if (this.errors.errors.length > 0) {
          this.$f7.addNotification({
            media: ('<span className=\'iconfont icon-error\'></span>'),
            title: '提示',
            message: this.errors.errors[0].msg
          })
          return
        }
        if (this.addressInfo.district === '其他' && this.customDistrict === '') {
          this.$f7.addNotification({
            media: ('<span className=\'iconfont icon-error\'></span>'),
            title: '提示',
            message: '请填写所属区域'
          })
          return
        }
        this.addressInfo.district = this.addressInfo.district === '其他' ? this.customDistrict : this.addressInfo.district
        this.$store.dispatch({
          type: native.doAddAddress,
          ...this.addressInfo,
          cityId: this.city.cityId,
        }).then(() => {
          this.$store.dispatch({
            type: native.doListAddress
          })
          this.$router.back()
        }).catch((err) => {
          this.$f7.alert(err)
        })
      },
    }, computed: {
      ...mapState({
        provinces ({address}) {
          return address.provinces
        },
        city ({address}) {
          return address.city
        },
        cities ({address}) {
          return address.cities
        },
        districtList ({address}) {
          return address.districts
        }
      }),
      cityList () {
        if (this.city.provinceId !== -1 && this.cities && this.cities[`cities_${this.city.provinceId}`]) {
          return this.cities[`cities_${this.city.provinceId}`]
        } else {
          return []
        }
      },
      showCity () {
        let province = ''
        let city = ''
        let district = ''
        if (this.city.provinceId !== -1) {
          province = this.city.provinceName
        }
        if (this.city.cityId !== -1) {
          city = this.city.cityName
        }
        if (this.addressInfo.district !== '' && this.addressInfo.district !== '其他') {
          district = this.addressInfo.district
        }
        return province + city + district
      }
    },
    components: {CityList}

  }
</script>
<style lang="scss" scoped type="text/css">
    .pay_fixed {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
