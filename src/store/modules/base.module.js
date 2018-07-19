import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  workType: []
}
const getters = {}
const actions = {
  [native.doAddressList] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doAddressList)(refs)
  },
  [native.doWorkSort] ({state}, refs) {
    return applyClientMiddleware(api.doWorkSort)(refs)
  }
}
let mutations = {
  [mutationNames.doAddressList_success] (state, {data}) {
    console.log(data, 'data')
    // state.workType = data
  },
  [mutationNames.doWorkSort_success] (state, {data}) {
    state.workType = data
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
