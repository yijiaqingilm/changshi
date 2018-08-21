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
  },
  dyStat: {
    date: '',
    client: ''
  },
  veStat: {
    date: '',
    client: ''
  },
  trainDayStat: {
    client: '',
    major: ''
  }, trainMonthStat: {
    client: '',
    major: '',
  }
}
const getters = {}
const actions = {
  [native.doStaticsRunStatus] ({state}, refs) {
    return applyClientMiddleware(api.doStaticsRunStatus)(refs)
  },
  [native.doStaticsWork] ({state}, refs) {
    return applyClientMiddleware(api.doStaticsWork)(refs)
  },
  [native.doStaticsPower] ({state}, refs) {
    return applyClientMiddleware(api.doStaticsPower)(refs)
  },
  [native.doStaticsCar] ({state}, refs) {
    return applyClientMiddleware(api.doStaticsCar)(refs)
  }
}
let mutations = {}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
