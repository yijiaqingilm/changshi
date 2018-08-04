import { setToken } from 'lib/common'
import api from 'api/api'
import { isEmptyObject, margeMutations, aMapUtil } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

const state = {
  dyInfo: {
    number: '',
    oriAddress: '',
    nowAddress: ''
  }
}
const getters = {}
const actions = {
  [native.doCarHistory] ({state}, refs) {
    return applyClientMiddleware(api.doCarHistory)(refs)
  },
  [native.doDynamotorHistory] ({state}, refs) {
    return applyClientMiddleware(api.doDynamotorHistory)(refs)
  },
  [native.doDynamotorUpdateStatus] ({state}, refs) {
    return applyClientMiddleware(api.doDynamotorUpdateStatus)(refs)
  },
  [native.doCarDetail] ({state}, refs) {
    return applyClientMiddleware(api.doCarDetail)(refs)
  },
  [native.startOff] ({state}, refs) {
    aMapUtil.geolocation().then((data) => {
      let formattedAddress = data.formattedAddress
      let {lat, lng} = data.position
      Object.assign(refs, {out_lng: lng, out_lat: lat, out_add: formattedAddress})
      return applyClientMiddleware(api.startOff)(refs)
    })

  },
  [native.getTo] ({state}, refs) {
    aMapUtil.geolocation().then((data) => {
      let formattedAddress = data.formattedAddress
      let {lat, lng} = data.position
      Object.assign(refs, {retract_lng: lng, retract_lat: lat, retract_add: formattedAddress})
      return applyClientMiddleware(api.getTo)(refs)
    })
  }
}
let mutations = {}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
