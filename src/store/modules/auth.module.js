/**
 * Created by admin on 2018/7/19.
 */
import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
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
  },
  [mutationNames.doLogin_success] (state, {data}) {
    console.log('data======', data)
    state.userInfo = data
    state.sessionKey = data.sessionkey
    state.isManage = data.is_manage === 1
    console.log(state.sessionKey, data.sessionkey, '=====')
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
