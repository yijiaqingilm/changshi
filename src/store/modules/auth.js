import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const BIND_SUCCESS = 'hm/auth/BIND_SUCCESS'
const BIND_CLEARERROR = 'hm/auth/BIND_CLEARERROR'

const state = {
  loading: false,
  token: null,
  wechatConfig: {},
  userCode: null
}
const getters = {}
const actions = {
  [native.doWechatBind] ({state}, refs) {
    return applyClientMiddleware(api.doWechatBind)(refs)
  },
  [native.doLoadConfig] ({state}, refs) {
    if (isEmptyObject(state.wechatConfig)) {
      return applyClientMiddleware(api.doLoadConfig)(refs)
    }
  }
}
let mutations = {
  doAlreadyBind (state, {token, userCode}) {
    state.token = token
    state.userCode = userCode
  },
  [mutationNames.doLoadConfig_success] (state, {data}) {
    state.wechatConfig = data
    wx.config(state.wechatConfig)
    wx.ready(() => {
      console.log('wx ready')
    })
    wx.error((error) => {
      console.error('wx error', error)
    })
  },
  [mutationNames.doWechatBind_success] (state, {data}) {
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
