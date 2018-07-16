import apiConfig from 'api/apiConfig'
import {getSignature} from 'src/lib/utils'

let api = {}
// 解析config对象
apiConfig.forEach((row) => {
  if (!api[row.name]) {
    api[row.name] = (param = {}) => ({
      promise: (client) => {
        let {successBack, failBack, type, ...rest} = param
        let q = {timestamp: new Date().getTime(), ...rest}
        let signature = getSignature(q)
        return client[row.method](row.url, Object.assign({signature}, q), row.config)
      }
    })
  }
})
export default api


