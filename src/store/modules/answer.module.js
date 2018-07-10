import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  paper: {
    currentProgress: 0,
    category: 'xxx',
    count: 50,
    score: 100,
    sType: 'xxx,ddd',
    expTime: 60 * 60,
    subjects: [{
      title: 'xxx',
      answer: ['A'],
      resolve: 'aadd',
      hasAnswer: false,
      subject: [{value: 'A', desc: '1.xxxx'}, {value: 'A', desc: '1.xxxx'}]
    }, {
      title: 'xxxyy',
      answer: ['A'],
      resolve: 'aadd',
      hasAnswer: false,
      subject: [{value: 'A', desc: '1.xxxx'}, {value: 'A', desc: '1.xxxx'}]
    }]
  }
}
const getters = {}
const actions = {
  [native.doAnswer] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doAnswer)(refs)
  }
}
let mutations = {
  [mutationNames.doAnswer_success] (state, {data}) {
    // 回答成功填充当前答案，
    // --------------
    let {currentProgress} = state.paper
    state.paper.subjects[currentProgress].hasAnswer = true
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
