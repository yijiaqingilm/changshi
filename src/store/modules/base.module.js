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
  [native.doWorkType] ({state}, refs) {
    return applyClientMiddleware(api.doWorkType)(refs)
  }
}
let mutations = {
  [mutationNames.doWorkType_success] (state, {data}) {
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
