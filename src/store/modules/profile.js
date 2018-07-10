import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  profile: {}
}
let getters = {}
let actions = {
  [native.doLoadProfile] ({state}, refs) {
    if (isEmptyObject(state.profile)) {
      return applyClientMiddleware(api.doLoadProfile)(refs)
    }
  }
}
let mutations = {
  [mutationNames.doLoadProfile_success] (state, {data}) {
    state.profile = {...data}
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
