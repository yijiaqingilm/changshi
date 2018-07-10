import { globalConst as native } from 'lib/const'

class ApiConfig {
  constructor (name, url, config, method = 'post') {
    this.name = name
    this.url = url
    this.method = method
    if (config && typeof config === 'object') {
      this.config = config
      this.method = method
    } else if (config && typeof config === 'string') {
      this.method = config
    } else {
      this.config = {}
    }

  }
}

let apiConfig = [
  new ApiConfig(native.doLoadConfig, '/api/wechat/config'),
  new ApiConfig(native.doLoadProfile, '/api/user/profile/main'),
  new ApiConfig(native.doIncomeList, '/api/user/income/list'),
  new ApiConfig(native.doArticleDetail, '/api/article/detail'),
  new ApiConfig(native.doArticleList, '/api/article/list'),
  new ApiConfig(native.readThisArticle, '/api/article/read'),
  new ApiConfig(native.doWechatBind, '/callback/bind')
]
export default apiConfig
