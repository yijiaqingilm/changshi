import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames, formatData } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'
import AMap from 'AMap'
const state = {
  workSortList: [],
  workOrder: {},
  questionOrder: {},
  addressForCity: {},
  addressForProvince: {},
  addressForDistrict: {},
  activeAddress: {
    provinceId: -1,
    provinceName: '',
    cityId: -1,
    cityName: '',
    districtId: -1,
    districtName: ''
  }
}
const getters = {
  getProvinceList (state) {
    return state.addressForProvince
  },
  getCityList (state) {
    return state.addressForCity[state.activeAddress.provinceId]
  },
  getDistrictList (state) {
    return state.addressForDistrict[state.activeAddress.cityId]
  }
}
const actions = {
  [native.doLeaveQuestionDetail] ({state}, refs) {
    let quesitonOrderId = refs.work_id
    if (isEmptyObject(state.questionOrder[quesitonOrderId])) {
      return applyClientMiddleware(api.doLeaveQuestionDetail)(refs)
    }
  },
  [native.doLeaveQuestion] ({state}, refs) {
    return applyClientMiddleware(api.doLeaveQuestion)(refs)
  },
  [native.doWorkNumberDetail] ({state}, refs) {
    let workOrderId = refs.work_id
    if (isEmptyObject(state.workOrder[workOrderId])) {
      return applyClientMiddleware(api.doWorkNumberDetail)(refs)
    }
  },
  [native.doWorkNumberUpdate] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberUpdate)(refs)
  },
  [native.doWorkNumberApprove] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberApprove)(refs)
  },
  [native.doWorkNumberCancel] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberCancel)(refs)
  },
  [native.doGetWorkBase] ({state}, refs) {
    return applyClientMiddleware(api.doGetWorkBase)(refs)
  },
  [native.doWorkNumber] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumber)(refs)
  },
  [native.doGetDynamotor] ({state}, refs) {
    return applyClientMiddleware(api.doGetDynamotor)(refs)
  },
  [native.doGetAmmeter] ({state}, refs) {
    return applyClientMiddleware(api.doGetAmmeter)(refs)
  },
  [native.doAddressProvinceList] ({state}, refs) {
    if (isEmptyObject(state.addressForProvince)) {
      AMap.plugin('AMap.DistrictSearch', () => {
        let districtSearch = new AMap.DistrictSearch({
          level: 'country',
          subdistrict: 1
        })
        // 搜索所有省/直辖市信息
        districtSearch.search('中国', (status, result) => {
          // 查询成功时，result即为对应的行政区信息
          if (status === 'complete') {
            state.addressForProvince = result.districtList[0].districtList
          }

        })
      })
      // return applyClientMiddleware(api.doAddressProvinceList)(refs)
    }
  },
  [native.doAddressCityList] ({state}, refs) {
    let provinceId = state.activeAddress.provinceId
    if (isEmptyObject(state.addressForCity[provinceId])) {
      AMap.plugin('AMap.DistrictSearch', () => {
        let districtSearch = new AMap.DistrictSearch({
          level: 'province',
          subdistrict: 1
        })
        // 搜索所有省/直辖市信息
        districtSearch.search(provinceId, (status, result) => {
          // 查询成功时，result即为对应的行政区信息
          if (status === 'complete') {
            // state.addressForCity[provinceId] = result.districtList[0].districtList
            Vue.set(state.addressForCity, provinceId, result.districtList[0].districtList)
          }

        })
      })
    }
  },
  [native.doAddressDistrictList] ({state}, refs) {
    let cityId = state.activeAddress.cityId
    if (isEmptyObject(state.addressForDistrict[cityId])) {
      AMap.plugin('AMap.DistrictSearch', () => {
        let districtSearch = new AMap.DistrictSearch({
          level: 'city',
          subdistrict: 1
        })
        // 搜索所有省/直辖市信息
        districtSearch.search(cityId, (status, result) => {
          // 查询成功时，result即为对应的行政区信息
          if (status === 'complete') {
            // state.addressForCity[provinceId] = result.districtList[0].districtList
            Vue.set(state.addressForDistrict, cityId, result.districtList[0].districtList)
          }

        })
      })
    }
  },
  [native.doWorkSort] ({state}, refs) {
    return applyClientMiddleware(api.doWorkSort)(refs)
  }
}
let mutations = {
  [native.doSelectDistrict] (state, district) {
    let {districtName, districtId} = district
    state.activeAddress.districtName = districtName
    state.activeAddress.districtId = districtId
  },
  [native.doSelectCity] (state, city) {
    let {cityId, cityName} = city
    state.activeAddress.cityId = cityId
    state.activeAddress.cityName = cityName
  },
  [native.resetCity] (state) {
    state.activeAddress.cityId = -1
    state.activeAddress.cityName = ''
  },
  [native.resetDistrict] (state) {
    state.activeAddress.districtId = -1
    state.activeAddress.districtName = ''
  },
  [native.doSelectProvince] (state, province) {
    let {provinceId, provinceName} = province
    state.activeAddress.provinceId = provinceId
    state.activeAddress.provinceName = provinceName
  },
  [mutationNames.doLeaveQuestionDetail_success] (state, {data, refs}) {
    let questionOrderId = refs.work_id
    Vue.set(state.questionOrder, questionOrderId, data)
    console.log(data, 'data')
  },
  [mutationNames.doLeaveQuestion_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberDetail_success] (state, {data, refs}) {
    let workOrderId = refs.work_id
    Vue.set(state.workOrder, workOrderId, data)
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberUpdate_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberApprove_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberCancel_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetWorkBase_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumber_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetDynamotor_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetAmmeter_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doAddressProvinceList_success] (state, {data}) {
  },
  [mutationNames.doAddressCityList_success] (state, {data, refs}) {
    Vue.set(state.addressForCity, state.activeAddress.provinceId, data)
  },
  [mutationNames.doAddressDistrictList_success] (state, {data, refs}) {
    Vue.set(state.addressForDistrict, state.activeAddress.cityId, data)
  },
  [mutationNames.doWorkSort_success] (state, {data}) {
    state.workSortList = data
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
