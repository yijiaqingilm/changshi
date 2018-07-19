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
  new ApiConfig(native.doAnswer, '/user/profile/main'),
  new ApiConfig(native.doWorkSender, '/work/sender'),
  new ApiConfig(native.doGetWorkBase, '/work-base/index'),
  new ApiConfig(native.doAddressList, '/address/index', 'get'),
  new ApiConfig(native.doGetAmmeter, '/ammeter/index'),
  new ApiConfig(native.doGetDynamotor, '/dynamotor/index'),
  new ApiConfig(native.doDynamotorCreate, '/dynamotor/create'),
  new ApiConfig(native.doWorkNumber, '/work-number/index'),
  new ApiConfig(native.doWorkNumberDetail, '/work-number/detail'),
  new ApiConfig(native.doWorkNumberUpdate, '/work-number/update'),
  new ApiConfig(native.doLeaveQuestion, '/leave-question/index'),
  new ApiConfig(native.doLeaveQuestionDetail, '/leave-question/detail'),
  new ApiConfig(native.doLeaveQuestionUpdate, '/leave-question/update'),
  new ApiConfig(native.doWorkSort, '/work-sort/index', 'get'),
  new ApiConfig(native.doLogin, '/user/login')
]
export default apiConfig
