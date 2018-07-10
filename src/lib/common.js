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
  sessionStorage.setItem('maimeng_user_store', JSON.stringify(store))
}

export { ActionManager, common, setToken, getToken, handleJump, saveStore }
