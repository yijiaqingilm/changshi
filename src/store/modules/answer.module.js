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
    subjects: [],
    beginTime: '',
    endTime: '',
    consumetime: '',
    rate: '',
    moviePath: '',
    movieId: '',
    currentVideoTime: 0,
    videoPlay: true,
    isShowVideo: false
  },
  currentSubject: {
    levelId: '',
    trainType: '',
    major: '',
  },
  testTime: {
    startTime: '',
    endTime: ''
  }
}

function setPaper (state, data) {
  let {refid, levels, subject, score, subjectType, answerTime, rate, moviePath, movie_id} = data
  state.paper.refId = refid
  state.paper.title = levels.name
  state.paper.count = subject
  state.paper.score = score
  state.paper.sType = subjectType.reduce((a, b) => a + ',' + b.name, '').slice(1)
  state.paper.expTime = answerTime
  state.paper.rate = rate
  state.paper.movieId = movie_id
  let subjects = []
  for (let i = 0; i < state.paper.count; i++) {
    subjects.push(new Subject())
  }
  state.paper.subjects = subjects
}

function setCurrentSubject (state, {data, refs}) {
  let {answer, final, id, remark, sort, subject} = data
  let {page} = refs
  let currentSubject = state.paper.subjects[page - 1]
  currentSubject.id = id
  currentSubject.title = subject
  currentSubject.resolve = remark
  currentSubject.items = answer
  currentSubject.sort = sort
  currentSubject.answer = sort === subjectStatus.checkSubject ? [] : ''
  currentSubject.rightAnswer = answer.reduce((a, b) => a + (b.enabled === 1 ? b.chacter : ''), '')
}

function doAnswer (state, {data, refs}) {
  let {answer} = refs
  let {currentProgress} = state.paper
  state.paper.subjects[currentProgress - 1].isRight = answer
  state.paper.subjects[currentProgress - 1].hasAnswer = true
  if (state.currentTrainMode === trainModes.answer) {
    state.paper.score = data.score
    state.paper.consumetime = data.consumetime
  }

}

const getters = {}
const actions = {
  [native.remainingTime] ({state}, refs) {
    return applyClientMiddleware(api.remainingTime)(refs)
  },
  [native.doVideoList] ({state}, refs) {
    return applyClientMiddleware(api.doVideoList)(refs)
  },
  [native.doTrainSubjectHistory] ({state}, refs) {
    return applyClientMiddleware(api.doTrainSubjectHistory)(refs)
  },
  [native.doGetSubject] ({state}, refs) {
    let currentSubject = state.paper.subjects[state.paper.currentProgress - 1]
    if (!currentSubject.id) {
      return applyClientMiddleware(api.doGetSubject)(refs)
    }

  },
  [native.doTrainSubject] ({state}, refs) {
    if (!state.paper.refId) {
      return applyClientMiddleware(api.doTrainSubject)(refs)
    }
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
  },
  /* ----------视频模块------------ */
  [native.doTrainMajor2Movie] ({state}, refs) {
    if (!state.paper.refId) {
      return applyClientMiddleware(api.doTrainMajor2Movie)(refs)
    }
  },
  [native.doTrainLevel2Movie] ({state}, refs) {
    return applyClientMiddleware(api.doTrainLevel2Movie)(refs)
  },
  [native.doTrainSubject2Movie] ({state}, refs) {
    if (!state.paper.refId) {
      return applyClientMiddleware(api.doTrainSubject2Movie)(refs)
    }
  },
  [native.doGetMovie] ({state}, refs) {
    let currentSubject = state.paper.subjects[state.paper.currentProgress - 1]
    if (!currentSubject.id) {
      return applyClientMiddleware(api.doGetMovie)(refs)
    }
  },
  [native.doVideo] ({state}, refs) {
    return applyClientMiddleware(api.doVideo)(refs)
  },
  /* ----------- 考试模块 -------------*/
  [native.doTrainSubjectExm] ({state}, refs) {
    return applyClientMiddleware(api.doTrainSubjectExm)(refs)
  },
  [native.doGetExmInfo] ({state}, refs) {
    if (!state.paper.refId) {
      return applyClientMiddleware(api.doGetExmInfo)(refs)
    }
  },
  [native.startTest] ({state}, refs) {
    return applyClientMiddleware(api.startTest)(refs)
  },
  [native.doTest] ({state}, refs) {
    return applyClientMiddleware(api.doTest)(refs)
  },
  [native.doGetTest] ({state}, refs) {
    let currentSubject = state.paper.subjects[state.paper.currentProgress - 1]
    if (!currentSubject.id) {
      return applyClientMiddleware(api.doGetTest)(refs)
    }
  }
}
let mutations = {
  [native.initTestTime] (state, time) {
    state.testTime = time
  },
  [native.setVideoPath] (state, videoPath) {
    state.paper.moviePath = videoPath
  },
  [native.setTrainMode] (state, mode = trainModes.answer) {
    state.currentTrainMode = mode
  },
  [mutationNames.doGetSubject_success] (state, {data, refs}) {
    setCurrentSubject(state, {data, refs})
  },
  [mutationNames.doGetMovie_success] (state, {data, refs}) {
    setCurrentSubject(state, {data, refs})
  },
  [mutationNames.doGetTest_success] (state, {data, refs}) {
    setCurrentSubject(state, {data, refs})
  },
  [mutationNames.doGetMovie_success] (state, {data, refs}) {
    setCurrentSubject(state, {data, refs})
  },
  [mutationNames.doTrainSubject_success] (state, {data}) {
    setPaper(state, data)
  },
  [mutationNames.doTrainSubject2Movie_success] (state, {data}) {
    setPaper(state, data)
  },
  [mutationNames.doGetExmInfo_success] (state, {data}) {
    setPaper(state, data)
  },
  [native.resetPaper] (state) {
    state.paper = {
      refId: '',
      title: '',
      currentProgress: 1,
      count: 0,
      score: 0,
      consumetime: '',
      sType: '',
      expTime: 60 * 60,
      subjects: [],
      beginTime: '',
      endTime: '',
      rate: '',
      moviePath: '',
      movieId: '',
      currentVideoTime: 0,
      videoPlay: true,
      isShowVideo: false
    }
  },
  [native.doSetQuizBeginTime] (state) {
    state.paper.beginTime = new Date()
  },
  [native.setCurrentSubject] (state, params) {
    state.currentSubject = params
  },
  [mutationNames.doAnswer_success] (state, {data, refs}) {
    doAnswer(state, {data, refs})
  },
  [mutationNames.doTest_success] (state, {data, refs}) {
    doAnswer(state, {data, refs})
  },
  [mutationNames.doVideo_success] (state, {data, refs}) {
    doAnswer(state, {data, refs})
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
