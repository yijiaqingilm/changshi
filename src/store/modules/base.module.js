import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  workSortList: [],
  workOrder: {},
  questionOrder: {}
}
const getters = {}
const actions = {
  [native.doLeaveQuestionDetail] ({state}, refs) {
    let quesitonOrderId = refs.work_id
    if (isEmptyObject(state.questionOrder[quesitonOrderId])) {
      return applyClientMiddleware(api.doLeaveQuestionDetail)(refs)
    }
  },
  [native.doLeaveQuestion] ({state}, refs) {
    return applyClientMiddleware(api.doLeaveQuestion)(refs)
  },
  [native.doWorkNumberDetail] ({state}, refs) {
    let workOrderId = refs.work_id
    if (isEmptyObject(state.workOrder[workOrderId])) {
      return applyClientMiddleware(api.doWorkNumberDetail)(refs)
    }
  },
  [native.doWorkNumberUpdate] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberUpdate)(refs)
  },
  [native.doWorkNumberApprove] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberApprove)(refs)
  },
  [native.doWorkNumberCancel] ({state}, refs) {
    return applyClientMiddleware(api.doWorkNumberCancel)(refs)
  },
  [native.doGetWorkBase] ({state}, refs) {
    return applyClientMiddleware(api.doGetWorkBase)(refs)
  },
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
  [mutationNames.doLeaveQuestionDetail_success] (state, {data, refs}) {
    let questionOrderId = refs.work_id
    Vue.set(state.questionOrder, questionOrderId, data)
    console.log(data, 'data')
  },
  [mutationNames.doLeaveQuestion_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberDetail_success] (state, {data, refs}) {
    let workOrderId = refs.work_id
    Vue.set(state.workOrder, workOrderId, data)
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberUpdate_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberApprove_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doWorkNumberCancel_success] (state, {data}) {
    console.log(data, 'data')
  },
  [mutationNames.doGetWorkBase_success] (state, {data}) {
    console.log(data, 'data')
  },
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
