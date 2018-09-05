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
                    <f7-page>&nbsp;
                        <autocomplate ref="autocomplate" v-model="searchValue"
                                      @change="autocomplateChange"
                                      :loadData="loadDataFun"></autocomplate>
                    </f7-page>
                    <city-select @cityInfo="cityInfo"
                                 @changeCity="changeCity"
                                 :province_id="userInfo.province_id"
                                 :city_id="userInfo.city_id"
                                 :district_id="userInfo.district_id"
                                 ref="citySelect">
                    </city-select>
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
  import { bus } from 'src/main'
  import Autocomplate from 'components/autocomplate/Autocomplate'
  import debounce from 'lodash/debounce'

  export default {
    data () {
      return {
        searchValue: '',
        loadDataFun: null
      }
    },
    componentName: 'main',
    created: function () {
      bus.$on('openCityPicker', () => {
        this.$refs.citySelect.open()
      })
      bus.$on('openAutoComplate', (searchValue, loadDataFun) => {
        this.searchValue = searchValue
        this.loadDataFun = loadDataFun
        this.openAutoComplate()
      })
    },
    methods: {
      changeSearchValue () {
        bus.$emit('changeSearchValue', this.searchValue)
      },
      openAutoComplate () {
        this.$refs.autocomplate.open()
      },
      autocomplateChange (value) {
        bus.$emit('autocomplateChange', value)
      },
      cityInfo (cityInfo) {
        this.$store.commit(native.changeDyAddress, cityInfo)
      },
      openCityPicker () {
        this.$refs.citySelect.open()
      },
      changeCity (cityInfo) {
        bus.$emit('changeCity', cityInfo)
      }
    },
    mounted () {
      this.$nextTick(() => {
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
      ...mapState({
        activeAddress: ({base}) => base.activeAddress,
        userInfo: ({auth}) => auth.userInfo
      })
    },
    watch: {
      'searchValue': {
        handler: function (nowSearchValue, oldSearchValue) {
          if (nowSearchValue && nowSearchValue !== oldSearchValue) {
            this.changeSearchValue()
          }
        }
      }
    },
    components: {Loading, CitySelect, Autocomplate}
  }
</script>
<style lang="scss" type="text/css">
    @import "css/global.scss";
</style>
