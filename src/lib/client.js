import Vue from 'vue'
import { getToken } from 'lib/common'
import { app } from 'src/main.js'

const methods = ['get', 'post', 'put', 'del', 'patch']
export default class ApiClient {
  constructor () {
    methods.forEach((method) => {
      this[method] = (url, params = {}, {global = true, isManager = false} = {}) => new Promise((resolve, reject) => {
        if (!url) {
          reject({_error: '错误的请求地址'})
        }
        const sessionKey = app.$store.state.auth.sessionKey
        console.log(serverUrl, 'xx', url)
        Vue.http({
          method: method,
          url: serverUrl + url + (sessionKey && '?sessionkey=' + sessionKey),
          [method === 'get' ? 'params' : 'body']: params,
          global: global
        }).then((response) => {
          resolve(response.body)
        }).catch((error) => {
          reject(error)
        })
      })
    })
  }
}

