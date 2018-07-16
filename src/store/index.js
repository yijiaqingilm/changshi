import Vue from 'vue'
import Vuex from 'vuex'
import * as answer from './modules/answer.module'
import * as base from './modules/base.module'
import { globalConst as native } from 'lib/const'

Vue.use(Vuex)

export default new Vuex.Store({
  /* actions,*/
  state: {
    showLoading: false,
    loadingMsg: 'Loading...',
    sessionkey: '',
    credential: {
      token: '',
      expireTime: ''
    },
  },
  mutations: {},
  actions: {},
  modules: {answer, base}
})
