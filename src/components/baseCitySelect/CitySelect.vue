<template>
    <div>
        <f7-popup class="popup-province2">
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
                                  :checked="province==row.name"
                                  @click="selectProvince(row)"
                                  radio>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popup>
        <f7-popup class="popup-city2">
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
                                  :checked="city==row.name"
                                  @click="selectCity(row)"
                                  radio>
                    </f7-list-item>
                    <!-- @click="changeCity"-->
                </f7-list>
            </div>
        </f7-popup>
        <f7-popup class="popup-district2">
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
                                  :checked="district==row.name"
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
    props: {
      provinceId: {},
      cityId: {},
      districtId: {}
    },
    data () {
      return {
        province: '',
        city: '',
        district: ''
      }
    },
    created () {
      this.province = this.provinceId
      this.city = this.cityId
      this.district = this.districtId
    },
    methods: {
      open () {
        this.$f7.popup('.popup-province2')
      },
      selectProvince (province) {
        let {commit, dispatch} = this.$store
        this.province = province.name
        dispatch({
          type: native.doAddressCityList,
          province: province.name
        })
        this.$f7.popup('.popup-city2')
      },
      selectCity (city) {
        let {commit, dispatch} = this.$store
        this.city = city.name
        this.$store.dispatch({
          type: native.doAddressDistrictList,
          city: city.name
        })
        this.$f7.popup('.popup-district2')
      },
      selectDistrict (districtObj) {
        let {commit} = this.$store
        this.district = districtObj.name
        let {province, city, district} = this
        this.$emit('cityInfo', {province, city, district}
        )
        this.closePopupCity()
      },
      closePopupDistrict () {
        this.$f7.closeModal('.popup-district2')
        this.$f7.closeModal()
      },
      closePopupCity () {
        this.$f7.closeModal('.popup-city2')
        // 疑似f7bug 不能同时关闭。一旦同时关闭会销毁popup对象
        this.$f7.closeModal()
      },
      closePopupProvince () {
        this.$f7.closeModal('.popup-province2')
        // 疑似f7bug 不能同时关闭。一旦同时关闭会销毁popup对象
        this.$f7.closeModal()
      },
    },
    mounted () {
      this.$nextTick(() => {
        this.$store.dispatch({
          type: native.initActiveAddress,
        })
        this.$$('.popup-province2').on('opened', () => {
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
      ]),
      ...mapState({
        activeAddress: ({base}) => base.activeAddress
      }),
      getCityList () {
        return this.$store.state.base.addressForCity[this.province]
      },
      getDistrictList () {
        return this.$store.state.base.addressForDistrict[this.city]
      }
    },
  }
</script>

<style lang="scss" scoped type="text/css">

</style>