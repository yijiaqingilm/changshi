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
        const token = app.$store.state.auth.token
        if (__DEBUG__) {
          Vue.http.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgwLCJhZ2VudElkIjo4MDAwMSwiaWF0IjoxNTI4NjgxMjk3LCJleHAiOjE1Mjg3Njc2OTd9.IRS9MjWVc99fnVvjCdtfAGU2LIJvk6iCKToq4kYct9A'
        }
        if (token) {
          Vue.http.headers.common['Authorization'] = `Bearer ${token}`
        }
        Vue.http({
          method: method,
          url: serverUrl + url,
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

