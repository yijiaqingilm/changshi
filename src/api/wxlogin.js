/**
 * Created by Administrator on 2017/5/25.
 */

import { getQuery } from 'lib/utils'
import { common } from 'lib/common'

let wxloginAPI = {
  wxLogin: (callBack) => {
    var code = getQuery('code')
    var state = getQuery('state')
    if (code === null || state === null) {
      /*eslint max-len: ["error", { "ignoreUrls": true }]*/
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?response_type=code&scope=snsapi_base&state=base&appid=${appId}&redirect_uri=${encodeURIComponent(location.href)}#wechat_redirect`
      return false
    } else {
      console.log('wx登陆开始')
      common.awaitUserLogin(code, state, callBack)
      console.log('wx登陆结束')
      return true
    }
  }
}
export default wxloginAPI

