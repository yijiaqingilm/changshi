import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import './lib/flexible.js'
import ApiClient from 'lib/client'
import clientMiddleware from 'lib/clientMiddleware'
import { saveStore } from './lib/common'

import Framework7Vue from 'framework7-vue'
import 'velocity-animate'

import Routes from './router/router'
import App from './main.vue'
import VueResource from 'vue-resource'
import './directives/commonDirective.js'
import './filters/commonFilter'
import './lib/vueExends'

/* 引入 echart*/
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/pie'

Vue.component('chart', ECharts)

import mask from 'components/masking/masking.vue'
import ErrPanel from 'components/errorPanel/errorPanel'
import Line10 from 'components/line10/Line10'
import BaseIcon from 'components/baseIcon/BaseIcon'
import BaseFormGroup from 'components/baseFormGroup/BaseFormGroup'
import BaseList from 'components/baseList/BaseList'
import BaseListItem from 'components/baseList/BaseListItem'
import BaseRadioGroup from 'components/baseRadioGroup/BaseRadioGroup.vue'
import BaseRadio from 'components/baseRadioGroup/children/BaseRadio.vue'
import BaseSelect from 'components/baseSelect/BaseSelect.vue'
import BaseCitySelect from 'components/baseCitySelect/BaseCitySelect'
import BaseTabs from 'components/baseTabs/BaseTabs'
import BaseTab from 'components/baseTabs/BaseTab'

Vue.use(VueResource)
Vue.use(Framework7Vue)

Vue.component('line-10', Line10)
Vue.component('base-icon', BaseIcon)
Vue.component('base-form-group', BaseFormGroup)
Vue.component('base-list', BaseList)
Vue.component('base-list-item', BaseListItem)
Vue.component('base-radio-group', BaseRadioGroup)
Vue.component('base-radio', BaseRadio)
Vue.component('base-select', BaseSelect)
Vue.component('base-city-select', BaseCitySelect)
Vue.component('masking', mask)
Vue.component('errPanel', ErrPanel)
Vue.component('base-tabs', BaseTabs)
Vue.component('base-tab', BaseTab)

/* let user_store = sessionStorage.getItem('user_store')
 user_store && store.replaceState(Object.assign(store.state, JSON.parse(user_store)))*/
// Init App
let app = new Vue({
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
    pushState: true,
    pushStateSeparator: '#',
    materialRipple: true,
    // fastClicks: false,
    activeState: true,
    modalButtonOk: '确定',
    modalButtonCancel: '取消',
    swipeBackPage: false,
    modalTitle: '',
    pushStatePreventOnLoad: false,
    pushStateNoAnimation: true,
    cache: true,
    preroute: function (view, options) {
      return true
    },
  },
  // Register App Component
  components: {
    app: App
  },
  created () {
    let user_store = sessionStorage.getItem('maimeng_user_store')
    user_store && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(user_store)))

  },
  store
}).$mount('#app')
let client = new ApiClient()
let applyClientMiddleware = clientMiddleware(client)(store.commit)
/**
 * 添加 ajax 全局拦截器
 */
Vue.http.interceptors.push(function (request, next) {
  if (request.global) {app.$store.state.showLoading = true}
  next((response) => {
    if (request.global) {app.$store.state.showLoading = false}
    // 统一的错误 处理机制 ==> 未添加
    var resultCode = response.data && response.data.resultCode
    // if (resultCode === status_err_code.FAILURE) {
    // window.f7.alert(response.data.result);
    //  return
    // }
    return response
  })
})

window.addEventListener('popstate', function () {
  app.$f7.closeModal()

})
window.onbeforeunload = function () {
  saveStore(app.$store.state)
}
window.addEventListener('pagehide', function () {
  saveStore(app.$store.state)
}, false)
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', function () {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded()
        // document.activeElement.scrollIntoView(false)
      }, 0)
    }
  })
}
export { app, applyClientMiddleware }


