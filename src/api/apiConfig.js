import { globalConst as native } from 'lib/const'

const getReuqest = 'get'
const postRequest = 'post'

class ApiConfig {
  constructor (name, url, config, method = postRequest) {
    this.name = name
    this.url = url
    this.method = method
    this.config = config
    if (config && typeof config === 'string') {
      this.method = config
      this.config = {}
    }
  }
}

let apiConfig = [
  new ApiConfig(native.doTrainSubjectTrainDay, '/statics/train-day', getReuqest),
  new ApiConfig(native.doTrainSubjectTrainMonth, '/statics/train-month', getReuqest),
  new ApiConfig(native.doGetSubject, '/train-subject/get-subject', {global: false}, getReuqest),
  new ApiConfig(native.doAnswer, '/train-subject/set-subject', {global: false}),
  new ApiConfig(native.doTest, '/train-subject/set-exm', {global: false}),
  new ApiConfig(native.doWorkSender, '/work/sender'),
  new ApiConfig(native.doGetWorkBase, '/work-base/index', {global: false}, getReuqest),
  new ApiConfig(native.doAddressProvinceList, '/address/index', {global: false}, getReuqest),
  new ApiConfig(native.doAddressCityList, '/address/index', {global: false}, getReuqest),
  new ApiConfig(native.doAddressDistrictList, '/address/index', {global: false}, getReuqest),
  new ApiConfig(native.doGetAmmeter, '/ammeter/index', getReuqest),
  new ApiConfig(native.doGetDynamotor, '/dynamotor/index', getReuqest),
  new ApiConfig(native.doDynamotorUpdateStatus, '/dynamotor/update-status'),
  new ApiConfig(native.doDynamotorCreate, '/dynamotor/create'),
  new ApiConfig(native.doWorkNumber, '/work-number/index', getReuqest),
  new ApiConfig(native.doWorkNumberManage, '/work-number/manage', getReuqest),
  new ApiConfig(native.doWorkNumberApprove, '/work-number/approve'),
  new ApiConfig(native.doWorkNumberCancel, '/work-number/cancel'),
  new ApiConfig(native.doWorkNumberDetail, '/work-number/detail', getReuqest),
  new ApiConfig(native.doWorkNumberUpdate, '/work-number/update'),
  new ApiConfig(native.doLeaveQuestion, '/leave-question/index', getReuqest),
  new ApiConfig(native.doLeaveQuestionDetail, '/leave-question/detail', getReuqest),
  new ApiConfig(native.doLeaveQuestionUpdate, '/leave-question/update'),
  new ApiConfig(native.doWorkSort, '/work-sort/index', getReuqest),
  new ApiConfig(native.doLogin, '/user/login'),
  new ApiConfig(native.doWxLogin, '/user/wx-login', getReuqest),
  new ApiConfig(native.doCarDetail, '/car/detail', getReuqest),
  new ApiConfig(native.startOff, '/car/create'),
  new ApiConfig(native.getTo, '/car/update'),
  new ApiConfig(native.doDynamotorHistory, '/dynamotor/history', getReuqest),
  new ApiConfig(native.doCarHistory, '/car/history', getReuqest),
  new ApiConfig(native.doWorkNumberStatics, '/work-number/statics', getReuqest),
  new ApiConfig(native.doWorkNumberAccess, '/work-number/access'),
  new ApiConfig(native.doWorkNumberDeny, '/work-number/deny'),
  new ApiConfig(native.doDynamotorUpdate, '/dynamotor/update'),
  new ApiConfig(native.doWorkBaseDynamotor, '/work-base/dynamotor', getReuqest),
  new ApiConfig(native.doStaticsPower, '/statics/power', getReuqest),
  new ApiConfig(native.doStaticsCar, '/statics/car', getReuqest),
  new ApiConfig(native.doStaticsWork, '/statics/work', getReuqest),
  new ApiConfig(native.doStaticsRunStatus, '/statics/run-status', getReuqest),
  new ApiConfig(native.doStaticsApproveNum, '/statics/approve-num', getReuqest),
  new ApiConfig(native.doTrainMajor, '/train-major/index', getReuqest),
  new ApiConfig(native.doTrainLevel, '/train-level/index', getReuqest),
  new ApiConfig(native.doTrainSubject, '/train-subject/index', getReuqest),
  new ApiConfig(native.doTrainSubjectHistory, '/train-subject/history', getReuqest),
  new ApiConfig(native.doTrainMajor2Movie, '/train-major/movie', getReuqest),
  new ApiConfig(native.doTrainLevel2Movie, '/train-level/movie', getReuqest),
  new ApiConfig(native.doTrainSubject2Movie, '/train-subject/movie-info', getReuqest),
  new ApiConfig(native.doGetMovie, '/train-subject/get-movie', getReuqest),
  new ApiConfig(native.doGetTest, '/train-subject/get-exm', {global: false}, getReuqest),
  new ApiConfig(native.doTrainSubjectExm, '/train-subject/exm', getReuqest),
  new ApiConfig(native.doGetExmInfo, '/train-subject/exm-info', getReuqest),
  new ApiConfig(native.startTest, '/train-subject/time', getReuqest)
]
export default apiConfig
