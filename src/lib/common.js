import Vue from 'vue'
import { app } from 'src/main.js'
import { Cache } from 'lib/utils'
import ApiClient from 'lib/client'
import clientMiddleware from 'lib/clientMiddleware'

let common = {
  newBlob: (data, datatype) => {
    var out
    try {
      out = new Blob([data], {type: datatype})
    }
    catch (e) {
      window.BlobBuilder = window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder

      if (e.name === 'TypeError' && window.BlobBuilder) {
        var bb = new window.BlobBuilder()
        bb.append(data.buffer)
        out = bb.getBlob(datatype)
      }
      else if (e.name === 'InvalidStateError') {
        out = new Blob([data], {type: datatype})
      }
    }
    return out
  },
  base64ToBlob: (type, data) => {
    data = window.atob(data)
    let ia = new Uint8Array(data.length)
    for (let i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i)
    }
    return new common.newBlob(ia, type)
  },
  awaitUserLogin: function (code, state, callBack) {
    try {
      var url = `${serverUrl}/user/wx-login?code=${code}&state=${state}&url=${encodeURIComponent(location.href.split('#')[0])}`
      let request = new XMLHttpRequest()
      request.open('GET', url, false) // 第三个参数 false 代表设置同步请求
      request.send(null)
      if (request.status === 200) {

        var data = JSON.parse(request.response)
        callBack(data.data)

      }
    } catch (err) {
      // err
    }
  },
}
let ActionManager = {}
let token
let setToken = (_token) => {token = _token}
let getToken = () => token

export function getMediaUrl () {
  return 'https://maiyads-files.oss-cn-shenzhen.aliyuncs.com/'
}

let handleJump = function (orderNo) {
  window.location.href = `${payUrl}?id=${orderNo}`
}
const saveStore = (store) => {
  sessionStorage.setItem('changshi_store', JSON.stringify(store))
}

export { ActionManager, common, setToken, getToken, handleJump, saveStore }
