<template>
    <div>
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
                <f7-list v-if="getProvinceList">
                    <f7-list-item v-for="(row,index) in getProvinceList"
                                  :key="index"
                                  :title="row.name"
                                  :value="row.name"
                                  name="province"
                                  :checked="activeAddress.provinceId==row.name"
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
                <f7-list v-if="getCityList">
                    <f7-list-item v-for="(row,index) in getCityList"
                                  :key="index"
                                  :title="row.name"
                                  :value="row.name"
                                  name="city"
                                  :checked="activeAddress.cityId==row.name"
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
                <f7-list v-if="getDistrictList">
                    <f7-list-item v-for="(row,index) in getDistrictList"
                                  :key="index"
                                  :title="row.name"
                                  :value="row.name"
                                  name="district"
                                  :checked="activeAddress.districtId==row.name"
                                  @click="selectDistrict(row)"
                                  radio>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popup>
    </div>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: '',
    data () {
      return {
        province: '',
        city: '',
        district: ''
      }
    },
    methods: {
      open () {
        this.$f7.popup('.popup-province')
      },
      selectProvince (province) {
        let {commit, dispatch} = this.$store
        commit(native.doSelectProvince, {
          provinceId: province.name, provinceName: province.name
        })
        this.province = province.name
        if (province.name !== this.activeAddress.provinceId) {
          commit(native.resetCity)
          commit(native.resetDistrict)
        }
        dispatch({
          type: native.doAddressCityList
        })
        this.$f7.popup('.popup-city')
      },
      selectCity (city) {
        let {commit, dispatch} = this.$store
        commit(native.doSelectCity, {
          cityId: city.name,
          cityName: city.name
        })
        this.city = city.name
        if (city.name !== this.activeAddress.cityId) {
          commit(native.resetDistrict)
        }
        this.$store.dispatch({
          type: native.doAddressDistrictList,
        })
        this.$f7.popup('.popup-district')
      },
      selectDistrict (district) {
        let {commit} = this.$store
        commit(native.doSelectDistrict, {
          districtName: district.name,
          districtId: district.name
        })
        this.district = district.name
        this.$emit('cityInfo', this.province + this.city + this.district)
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
    },
    mounted () {
      this.$nextTick(() => {
        this.$store.dispatch({
          type: native.initActiveAddress,
        })
        this.$$('.popup-province').on('opened', () => {
          let {dispatch} = this.$store
          dispatch({
            type: native.doAddressProvinceList
          })
        })
      })
    },
    computed: {
      ...mapGetters([
        'getProvinceList',
        'getCityList',
        'getDistrictList',
      ]),
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      })
    },
  }
</script>

<style lang="scss" scoped type="text/css">

</style>