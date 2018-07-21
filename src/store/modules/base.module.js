import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  workSortList: []
}
const getters = {}
const actions = {
  [native.doWorkNumber] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumber)(refs)
  },
  [native.doGetDynamotor] ({state}, refs) {
    return applyClientMiddleware(api.doGetDynamotor)(refs)
  },
  [native.doGetAmmeter] ({state}, refs) {
    return applyClientMiddleware(api.doGetAmmeter)(refs)
  },
  [native.doAddressList] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doAddressList)(refs)
  },
  [native.doWorkSort] ({state}, refs) {
    return applyClientMiddleware(api.doWorkSort)(refs)
  }
}
let mutations = {
  [mutationNames.doWorkNumber_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetDynamotor_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetAmmeter_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doAddressList_success] (state, {data}) {
    console.log(data, 'data')
    // state.workType = data
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
