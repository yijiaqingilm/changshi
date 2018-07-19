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
  sessionKey: 'GfJ9pNWwMjFyZDyPwVGqwWVa2zQZWN'
}
const getters = {}
const actions = {
  [native.doLogin] ({state}, refs) {
    return applyClientMiddleware(api.doLogin)(refs)
  }
}
let mutations = {
  [mutationNames.doLogin] (state, {data}) {
    console.log('data', data)
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
