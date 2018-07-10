import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {}
let getters = {}
let actions = {
  [native.doIncomeList] ({state}, refs) {
    console.log('test', refs)
    return applyClientMiddleware(api.doIncomeList)(refs)
  }
}
let mutations = {
  [mutationNames.doIncomeList_success] (state, {data, refs}) {
  },
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
