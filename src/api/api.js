import apiConfig from 'api/apiConfig'

let api = {}
// 解析config对象
apiConfig.forEach((row) => {
  if (!api[row.name]) {
    api[row.name] = (param = {}) => ({
      promise: (client) => {
        let {successBack, failBack, type, ...rest} = param
        return client[row.method](row.url, rest, row.config)
      }
    })
  }
})
export default api


