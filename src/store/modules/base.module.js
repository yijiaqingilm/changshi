import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations, aMapUtil } from 'lib/utils'
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
    districtName: '',
    isChange: true
  },
  dateTimeConfig: {
    options: {
      phrases: {
        ok: '确定',
        cancel: '关闭'
      },
      format: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  dy: {
    city: '',
    code: '',
    district: '',
    id: '',
    province: '',
    status: 1,
    work_base: ''
  },
  workNumberStatics: {},
  workOrderPage: {
    reviewPage: 1
  },
  workOrderReviewList: [],
  getWorkBaseError: null,
  loadWorkBase: false
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
  [native.doWorkNumberAccess] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberAccess)(refs)
  },
  [native.doWorkNumberDeny] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberDeny)(refs)
  },
  [native.doWorkNumberManage] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberManage)(refs)
  },
  [native.doLeaveQuestionUpdate] ({state}, refs) {
    return applyClientMiddleware(api.doLeaveQuestionUpdate)(refs)
  },
  [native.doWorkNumberStatics] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberStatics)(refs)
  },
  [native.doWorkSender] ({state}, refs) {
    return applyClientMiddleware(api.doWorkSender)(refs)
  },
  [native.initActiveAddress] ({state, commit}, refs) {
    aMapUtil.geolocation().then((data) => {
      let {province, city, district} = data.addressComponent
      commit(native.initActiveAddress, {
        province,
        city,
        district
      })
    })
  },
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
  /**
   * 高德方式
   * @param state
   * @param refs
   * @returns {*}
   */
  /* [native.doAddressProvinceList] ({state}, refs) {
    if (isEmptyObject(state.addressForProvince)) {
      return aMapUtil.destrictSearch('country', '中国', function (error, result) {
        if (error) {
          return
        } else {
          state.addressForProvince = result
        }
      })
    } else {
      return Promise.resolve(state.addressForProvince)
    }
  },*/
  [native.doAddressProvinceList] ({state}, refs) {
    if (isEmptyObject(state.addressForProvince)) {
      return applyClientMiddleware(api.doAddressProvinceList)(refs)
    } else {
      return Promise.resolve(state.addressForProvince)
    }
  },
  /**
   * 高德方式
   * @param state
   * @param refs
   * @returns {*}
   */
  /* [native.doAddressCityList] ({state}, refs) {
    let {province} = refs
    if (isEmptyObject(state.addressForCity[province])) {
      return aMapUtil.destrictSearch('province', province, function (error, result) {
        if (error) {
          return
        } else {
          Vue.set(state.addressForCity, province, result)
        }
      })
    } else {
      return Promise.resolve(state.addressForCity[province])
    }
  },*/
  [native.doAddressCityList] ({state}, refs) {
    let {province_id} = refs
    if (isEmptyObject(state.addressForCity[province_id])) {
      return applyClientMiddleware(api.doAddressCityList)(refs)
    } else {
      return Promise.resolve(state.addressForCity[province_id])
    }
  },
  /**
   * 高德方式
   * @param state
   * @param refs
   * @returns {*}
   */
  /* [native.doAddressDistrictList] ({state}, refs) {
    let {city} = refs
    console.log('what?', city)
    if (isEmptyObject(state.addressForDistrict[city])) {
      return aMapUtil.destrictSearch('city', city, function (error, result) {
        if (error) {
          return
        } else {
          Vue.set(state.addressForDistrict, city, result)
        }
      })
    } else {
      return Promise.resolve(state.addressForDistrict[city])
    }
  },*/
  [native.doAddressDistrictList] ({state}, refs) {
    console.log('what???', refs)
    let {city_id} = refs
    if (isEmptyObject(state.addressForDistrict[city_id])) {
      return applyClientMiddleware(api.doAddressDistrictList)(refs)
    } else {
      return Promise.resolve(state.addressForDistrict[city_id])
    }
  },
  [native.doWorkSort] ({state}, refs) {
    return applyClientMiddleware(api.doWorkSort)(refs)
  }
}
let mutations = {
  [native.clearDy] (state) {
    state.dy.city = ''
    state.dy.code = ''
    state.dy.district = ''
    state.dy.id = ''
    state.dy.province = ''
    state.dy.status = 1
    state.dy.work_base = ''
  },
  [mutationNames.doLeaveQuestionUpdate_success] (state) {

  },
  [native.clearReviewOrder] (state) {
    state.workOrderPage.reviewPage = 1
    state.workOrderReviewList = []
  },
  [mutationNames.doWorkNumberStatics_success] (state, {data}) {
    state.workNumberStatics = data
  },
  [native.initActiveAddress] (state, address) {
    state.activeAddress = address
  },
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
  [mutationNames.doGetWorkBase_request] (state) {
    // state.getWorkBaseError = null
    // state.loadWorkBase = true
  },
  [mutationNames.doGetWorkBase_success] (state) {
    // state.getWorkBaseError = null
    // state.loadWorkBase = false
  },
  [mutationNames.doGetWorkBase_failure] (state, {error}) {
    // state.getWorkBaseError = error
    // state.loadWorkBase = false
  },
  [mutationNames.doWorkNumber_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetDynamotor_success] (state, {data}) {
    console.log(data, 'data')
    state.dy = data
  },
  [mutationNames.doGetAmmeter_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doAddressProvinceList_success] (state, {data}) {
    state.addressForProvince = data
  },
  [mutationNames.doAddressCityList_success] (state, {data, refs}) {
    let {province_id} = refs
    Vue.set(state.addressForCity, province_id, data)
  },
  [mutationNames.doAddressDistrictList_success] (state, {data, refs}) {
    let {city_id} = refs
    Vue.set(state.addressForDistrict, city_id, data)
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
