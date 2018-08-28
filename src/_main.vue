<template>
    <!-- App -->
    <div id="app" class="">
        <Loading></Loading>
        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>
        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" navbar-through :toolbar-fixed="true" :dynamic-navbar="true" main :domCache="true">
                <!-- Navbar -->
                <f7-navbar title="" :back-link="false" sliding></f7-navbar>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>&nbsp;</f7-page>
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
                                              :value="row.id"
                                              name="province"
                                              :checked="activeAddress.provinceId==row.id"
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
                                              :value="row.id"
                                              name="city"
                                              :checked="activeAddress.cityId==row.id"
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
                                              :value="row.id"
                                              name="district"
                                              :checked="activeAddress.districtId==row.id"
                                              @click="selectDistrict(row)"
                                              radio>
                                </f7-list-item>
                            </f7-list>
                        </div>
                    </f7-popup>
                </f7-pages>
            </f7-view>
        </f7-views>
    </div>
</template>
<script>
  import Loading from 'components/loading/loading.vue'
  import { globalConst as native } from 'lib/const'
  import { mapState, mapGetters } from 'vuex'
  import CitySelect from 'components/baseCitySelect/CitySelect'

  export default {
    data () {
      return {}
    },
    componentName: 'main',
    created: function () {
    },
    methods: {
      selectProvince (province) {
        let {commit, dispatch} = this.$store
        if (province.id !== this.activeAddress.provinceId) {
          commit(native.resetCity)
          commit(native.resetDistrict)
        }
        commit(native.doSelectProvince, {
          provinceId: province.id, provinceName: province.name
        })
        dispatch({
          type: native.doAddressCityList,
          province_id: province.id,
          sort: 'city'
        })
        this.$f7.popup('.popup-city', false)
      },
      selectCity (city) {
        let {commit, dispatch} = this.$store
        if (city.id !== this.activeAddress.cityId) {
          commit(native.resetDistrict)
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
        this.$f7.popup('.popup-district', false)
      },
      selectDistrict (district) {
        let {commit} = this.$store
        commit(native.doSelectDistrict, {
          districtName: district.name,
          districtId: district.id
        })
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
            type: native.doAddressProvinceList,
            sort: 'province'
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
    components: {Loading, CitySelect}
  }
</script>
<style lang="scss" type="text/css">
    @import "css/global.scss";
</style>
