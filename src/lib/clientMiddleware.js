import { REQUEST, SUCCESS, FAILURE, ERROR_UNAUTHORIZED } from 'lib/const'
import { app } from 'src/main.js'

export default function clientMiddleware (client) {
  return (commit) => (action) => (refs) => {
    let {type, ...rest} = refs
    if (!type) {
      alert('请使用对象风格提交dispatch!!!')
      console.log(refs, 'refs')
      return
    }
    const actionName = type
    const [mutation_success, mutation_fail, mutation_request] = [`${actionName}_${SUCCESS.toLowerCase()}`, `${actionName}_${FAILURE.toLowerCase()}`, `${actionName}_${REQUEST.toLowerCase()}`]
    if (typeof action !== 'function') {
      alert('action 必须是一个函数!!!')
      return
    }
    const {promise} = action(refs)
    if (!promise) {
      alert('错误的请求方式!!!')
      return
    }
    commit(mutation_request, rest)
    return new Promise((resolve, reject) => {
      promise(client).then((result) => {
        if (result.success) {
          commit(mutation_success, {
            data: result.data, refs: rest
          })
          resolve({data: result.data})
        } else {
          commit(mutation_fail, {
            error: result.message, refs: rest
          })
          reject(result.message)
        }

      }).catch((error) => {
        if (error.timeout) {
          let errorMsg = '网络连接超时，请重试'
          commit(mutation_fail, {error: errorMsg, refs: rest})
          reject(errorMsg)
        } else if (error.status) {
          let errorMsg = '访问未授权，请重新进入'
          switch (error.status) {
            case 401:
              app.$f7.alert(errorMsg, '友情提示')
              reject(errorMsg)
              break
            default:
              errorMsg = '遭遇系统异常，请重试'
              commit(mutation_fail, {error: errorMsg, refs: rest})
              reject(errorMsg)
          }
        } else {
          let errorMsg = '遭遇系统异常，请重试'
          commit(mutation_fail, {error: errorMsg, refs: rest})
          reject(errorMsg)
        }
        throw new Error(error)
      })
    })
  }

}
