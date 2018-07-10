import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  articleList: [],
  articleListErr: null,
  article: {},
  articleErr: null
}
let getters = {}
let actions = {
  [native.doArticleList] ({state}, refs) {
    return applyClientMiddleware(api.doArticleList)(refs)
  },
  [native.doArticleDetail] ({state}, refs) {
    let {artId} = refs
    if (!state.article[artId]) {
      return applyClientMiddleware(api.doArticleDetail)(refs)
    } else {
      this.articleErr = null
    }
  },
  [native.readThisArticle] ({state}, refs) {
    return applyClientMiddleware(api.readThisArticle)(refs)
  }
}
let mutations = {
  [mutationNames.readThisArticle_success] (state, {data, refs}) {
  },
  [mutationNames.doArticleDetail_request] (state) {
    state.articleErr = null
  },
  [mutationNames.doArticleDetail_success] (state, {data, refs}) {
    let {artId} = refs
    Vue.set(state.article, artId, data)
  },
  [mutationNames.doArticleDetail_failure] (state, {error}) {
    state.articleErr = error
  },
  [mutationNames.doArticleList_request] (state) {
    state.articleListErr = null
  },
  [mutationNames.doArticleList_success] (state) {
  },
  [mutationNames.doArticleList_failure] (state, {error}) {
    state.articleListErr = error
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
