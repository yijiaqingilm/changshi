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
  new ApiConfig(native.doGetWorkBase, '/work-base/index', {global: false}, 'get'),
  new ApiConfig(native.doAddressProvinceList, '/address/index', {global: false}, 'get'),
  new ApiConfig(native.doAddressCityList, '/address/index', {global: false}, 'get'),
  new ApiConfig(native.doAddressDistrictList, '/address/index', {global: false}, 'get'),
  new ApiConfig(native.doGetAmmeter, '/ammeter/index', 'get'),
  new ApiConfig(native.doGetDynamotor, '/dynamotor/index', 'get'),
  new ApiConfig(native.doDynamotorUpdateStatus, '/dynamotor/update-status'),
  new ApiConfig(native.doDynamotorCreate, '/dynamotor/create'),
  new ApiConfig(native.doWorkNumber, '/work-number/index', 'get'),
  new ApiConfig(native.doWorkNumberManage, '/work-number/manage', 'get'),
  new ApiConfig(native.doWorkNumberApprove, '/work-number/approve'),
  new ApiConfig(native.doWorkNumberCancel, '/work-number/cancel'),
  new ApiConfig(native.doWorkNumberDetail, '/work-number/detail', 'get'),
  new ApiConfig(native.doWorkNumberUpdate, '/work-number/update'),
  new ApiConfig(native.doLeaveQuestion, '/leave-question/index', 'get'),
  new ApiConfig(native.doLeaveQuestionDetail, '/leave-question/detail', 'get'),
  new ApiConfig(native.doLeaveQuestionUpdate, '/leave-question/update'),
  new ApiConfig(native.doWorkSort, '/work-sort/index', 'get'),
  new ApiConfig(native.doLogin, '/user/login'),
  new ApiConfig(native.doWxLogin, '/user/wx-login', 'get'),
  new ApiConfig(native.doCarDetail, '/car/detail', 'get'),
  new ApiConfig(native.startOff, '/car/create'),
  new ApiConfig(native.getTo, '/car/update'),
  new ApiConfig(native.doDynamotorHistory, '/dynamotor/history', 'get'),
  new ApiConfig(native.doCarHistory, '/car/history', 'get'),
  new ApiConfig(native.doWorkNumberStatics, '/work-number/statics', 'get'),
  new ApiConfig(native.doWorkNumberAccess, '/work-number/access'),
  new ApiConfig(native.doWorkNumberDeny, '/work-number/deny'),
  new ApiConfig(native.doDynamotorUpdate, '/dynamotor/udpate'),
  new ApiConfig(native.doWorkBaseDynamotor, '/work-base/dynamotor', 'get')
]
export default apiConfig
