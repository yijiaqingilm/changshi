/**
 * Created by admin on 2018/7/19.
 */
import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations, LocalCache } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  sessionKey: '',
  isManage: false,
  userInfo: {
    is_manage: '',
    id: '',
    empcode: '',
    realname: '',
    province_id: '',
    city_id: '',
    district_id: '',
    provinceName: '',
    cityName: '',
    districtName: ''
  },
  wxConfig: {},
}
const getters = {}
const actions = {
  [native.doLogin] ({state}, refs) {
    return applyClientMiddleware(api.doLogin)(refs)
  },
  [native.doWxLogin] ({state}, refs) {
    if (isEmptyObject(state.wxConfig)) {
      return applyClientMiddleware(api.doWxLogin)(refs)
    }

  }
}
let mutations = {
  [native.logout] (state) {
    state.userInfo = {}
    state.isManage = false
    state.sessionKey = ''
    LocalCache.del('userLoginInfo')
  },
  [mutationNames.doWxLogin_success] (state, {data}) {
    state.wxConfig = data.wx_config
    console.log('获取wxconfig 成功', data)
    wx.config(state.wxConfig)
    wx.error((err) => {
      console.error(err)
    })
  },
  [mutationNames.doLogin_success] (state, {data}) {
    state.userInfo = data
    state.userInfo.provinceName = data.provinces
    state.userInfo.cityName = data.citys
    state.userInfo.districtName = data.districts
    state.sessionKey = data.sessionkey
    state.isManage = data.is_manage === 1
    LocalCache.set('userLoginInfo', JSON.stringify(state.userInfo))
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
