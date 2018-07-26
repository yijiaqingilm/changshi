import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  orderStat: {
    client: '',
    major: '',
    point: '',
    startDate: '',
    displayStartDate: '',
    displayEndDate: '',
    endDate: ''
  },
  anchorStat: {
    client: '',
    major: '',
    startDate: '',
    displayStartDate: '',
    displayEndDate: '',
    endDate: ''
  }
}
const getters = {}
const actions = {}
let mutations = {}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
