import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames, Subject, subjectStatus, trainModes } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  currentTrainMode: '',
  paper: {
    refId: '',
    currentProgress: 1,
    title: '',
    count: 0,
    score: 0,
    sType: '',
    expTime: 60 * 60,
    subjects: [{
      title: 'xxx',
      answer: ['A'],
      resolve: 'aadd',
      hasAnswer: false,
      items: [{value: 'A', desc: '1.xxxx'}, {value: 'A', desc: '1.xxxx'}]
    }, {
      title: 'xxxyy',
      answer: ['A'],
      resolve: 'aadd',
      hasAnswer: false,
      items: [{value: 'A', desc: '1.xxxx'}, {value: 'A', desc: '1.xxxx'}]
    }]
  },
  currentSubject: {
    levelId: '',
    trainType: '',
    major: '',
  }
}
const getters = {}
const actions = {
  [native.doTrainSubjectHistory] ({state}, refs) {
    return applyClientMiddleware(api.doTrainSubjectHistory)(refs)
  },
  [native.doGetSubject] ({state}, refs) {
    return applyClientMiddleware(api.doGetSubject)(refs)
  },
  [native.doTrainSubject] ({state}, refs) {
    return applyClientMiddleware(api.doTrainSubject)(refs)
  },
  [native.doTrainLevel] ({state}, refs) {
    return applyClientMiddleware(api.doTrainLevel)(refs)
  },
  [native.doTrainMajor] ({state}, refs) {
    return applyClientMiddleware(api.doTrainMajor)(refs)
  },
  [native.doAnswer] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doAnswer)(refs)
  }
}
let mutations = {
  [native.setTrainMode] (state, mode = trainModes.answer) {
    state.currentTrainMode = mode
  },
  [mutationNames.doGetSubject_success] (state, {data, refs}) {
    let {answer, final, id, remark, sort, subject} = data
    let {page} = refs
    let currentSubject = state.paper.subjects[page - 1]
    currentSubject.title = subject
    currentSubject.resolve = remark
    currentSubject.items = answer
    currentSubject.sort = sort
    currentSubject.answer = sort === subjectStatus.checkSubject ? [] : ''
  },
  [mutationNames.doTrainSubject_success] (state, {data}) {
    let {refid, levels, subject, score, subjectType, answerTime} = data
    state.paper.refId = refid
    state.paper.title = levels.name
    state.paper.count = subject
    state.paper.score = score
    state.paper.sType = subjectType.reduce((a, b) => a + ',' + b.name, '').slice(1)
    state.paper.expTime = answerTime
    let subjects = []
    //  state.paper.count
    for (let i = 0; i < 10; i++) {
      subjects.push(new Subject())
    }
    state.paper.subjects = subjects
  },
  [native.resetPaper] (state) {
    state.paper = {
      refId: '',
      title: '',
      currentProgress: 1,
      count: 0,
      score: 0,
      sType: '',
      expTime: 60 * 60,
      subjects: []
    }
  },
  [native.setCurrentSubject] (state, params) {
    let {levelId, trainType, major} = params
    state.currentSubject = {levelId, trainType, major}
  },
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
