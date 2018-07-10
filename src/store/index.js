import Vue from 'vue'
import Vuex from 'vuex'
import * as profile from './modules/profile'
import * as auth from './modules/auth'
import * as article from './modules/article'
import * as income from './modules/income'
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
    activeTabbarItem: 'home',
  },
  mutations: {
    setCredential (state, nowCredential) {
      state.credential = nowCredential
    },
  },
  actions: {},
  modules: {profile, auth, article, income}
})
