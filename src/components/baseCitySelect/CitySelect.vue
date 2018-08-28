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
                                  :value="row.id"
                                  name="province"
                                  :checked="province==row.id"
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
                                  :value="row.id"
                                  name="city"
                                  :checked="city==row.id"
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
                                  :value="row.id"
                                  name="district"
                                  :checked="district==row.id"
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
      province_id: {},
      city_id: {},
      district_id: {}
    },
    data () {
      return {
        provinceId: '',
        province: '',
        cityId: '',
        city: '',
        districtId: '',
        district: ''
      }
    },
    created () {
      this.provinceId = this.province_id
      this.cityId = this.city_id
      this.districtId = this.district_id
    },
    methods: {
      open () {
        this.$f7.popup('.popup-province2')
      },
      selectProvince (province) {
        let {commit, dispatch} = this.$store
        this.province = province.name
        this.provinceId = province.id
        if (province.id !== this.activeAddress.provinceId) {
          commit(native.resetCity)
          commit(native.resetDistrict)
          this.$emit('changeCity', {provinceName: province.name, provinceId: province.id})
        }
        commit(native.doSelectProvince, {
          provinceId: province.id, provinceName: province.name
        })
        dispatch({
          type: native.doAddressCityList,
          province_id: province.id,
          sort: 'city'
        })
        this.$f7.popup('.popup-city2')
      },
      selectCity (city) {
        let {commit, dispatch} = this.$store
        this.city = city.name
        this.cityId = city.id
        if (city.id !== this.activeAddress.cityId) {
          commit(native.resetDistrict)
          this.$emit('changeCity', {
            provinceName: this.province,
            provinceId: this.provinceId,
            cityName: city.name,
            cityId: city.id
          })
        }
        commit(native.doSelectCity, {
          cityId: city.id,
          cityName: city.name
        })
        this.$store.dispatch({
          type: native.doAddressDistrictList,
          city_id: city.id,
          sort: 'district'
        })
        this.$f7.popup('.popup-district2')
      },
      selectDistrict (districtObj) {
        let {commit} = this.$store
        this.district = districtObj.name
        this.districtId = districtObj.id
        let {province, city, district, provinceId, cityId, districtId} = this
        commit(native.doSelectDistrict, {
          districtName: district,
          districtId: districtId
        })
        this.$emit('cityInfo', {province, city, district, provinceId, cityId, districtId})
        this.$emit('changeCity', {
          provinceName: province,
          cityName: city,
          districtName: district,
          provinceId,
          cityId,
          districtId
        })
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
        /* let {province_id, city_id, district_id, provinceName, cityName, districtName} = this.userInfo
        this.$store.commit(native.initActiveAddress, {
          provinceName,
          cityName,
          districtName,
          provinceId: province_id,
          cityId: city_id,
          districtId: district_id
        })*/
        this.$$('.popup-province2').on('opened', () => {
          let {dispatch} = this.$store
          dispatch({
            type: native.doAddressProvinceList,
            sort: 'province'
          })
        })
      })
    },
    computed: {
      ...mapGetters([
        'getProvinceList',
      ]),
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        userInfo: ({auth}) => auth.userInfo
      }),
      getCityList () {
        return this.$store.state.base.addressForCity[this.provinceId]
      },
      getDistrictList () {
        return this.$store.state.base.addressForDistrict[this.cityId]
      }
    },
  }
</script>

<style lang="scss" scoped type="text/css">

</style>