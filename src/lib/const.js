const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const REQUEST = 'REQUEST'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  doAnswer: 'doAnswer',
  doWorkSender: 'doWorkSender',
  doGetWorkBase: 'doGetWorkBase',
  doAddressCityList: 'doAddressCityList',
  doAddressProvinceList: 'doAddressProvinceList',
  doAddressDistrictList: 'doAddressDistrictList',
  doGetAmmeter: 'doGetAmmeter',
  doGetDynamotor: 'doGetDynamotor',
  doDynamotorCreate: 'doDynamotorCreate',
  doWorkNumber: 'doWorkNumber',
  doWorkNumberManage: 'doWorkNumberManage',
  doWorkNumberDetail: 'doWorkNumberDetail',
  doWorkNumberUpdate: 'doWorkNumberUpdate',
  doWorkNumberCancel: 'doWorkNumberCancel',
  doWorkNumberApprove: 'doWorkNumberApprove',
  doLeaveQuestion: 'doLeaveQuestion',
  doLeaveQuestionDetail: 'doLeaveQuestionDetail',
  doLeaveQuestionUpdate: 'doLeaveQuestionUpdate',
  doWorkSort: 'doWorkSort',
  doLogin: 'doLogin',
  doWxLogin: 'doWxLogin',
  doSelectProvince: 'doSelectProvince',
  resetCity: 'resetCity',
  resetDistrict: 'resetDistrict',
  doSelectCity: 'doSelectCity',
  doSelectDistrict: 'doSelectDistrict',
  initActiveAddress: 'initActiveAddress',
  doDynamotorUpdateStatus: 'doDynamotorUpdateStatus',
  doCarDetail: 'doCarDetail',
  startOff: 'startOff',
  getTo: 'getTo',
  doDynamotorHistory: 'doDynamotorHistory',
  doCarHistory: 'doCarHistory',
  doWorkNumberStatics: 'doWorkNumberStatics',
  logout: 'logout',
  clearReviewOrder: 'clearReviewOrder',
  doWorkNumberAccess: 'doWorkNumberAccess',
  doWorkNumberDeny: 'doWorkNumberDeny',
  doWorkBaseDynamotor: 'doWorkBaseDynamotor',
  changeDyAddress: 'changeDyAddress',
  doDynamotorUpdate: 'doDynamotorUpdate',
  doStaticsPower: 'doStaticsPower',
  doStaticsCar: 'doStaticsCar',
  clearDy: 'clearDy',
  doStaticsWork: 'doStaticsWork',
  doStaticsRunStatus: 'doStaticsRunStatus',
  doStaticsApproveNum: 'doStaticsApproveNum',
  doTrainMajor: 'doTrainMajor',
  doTrainLevel: 'doTrainLevel',
  setCurrentSubject: 'setCurrentSubject',
  doTrainSubject: 'doTrainSubject',
  resetPaper: 'resetPaper',
  doGetSubject: 'doGetSubject',
  doTrainSubjectHistory: 'doTrainSubjectHistory',
  setTrainMode: 'setTrainMode',
  doTrainSubjectTrainDay: 'doTrainSubjectTrainDay',
  doTrainSubjectTrainMonth: 'doTrainSubjectTrainMonth',
  doSetQuizBeginTime: 'doSetQuizBeginTime',
  doTrainMajor2Movie: 'doTrainMajor2Movie',
  doTrainLevel2Movie: 'doTrainLevel2Movie',
  doTrainSubject2Movie: 'doTrainSubject2Movie',
  doGetMovie: 'doGetMovie',
  doTrainSubjectExm: 'doTrainSubjectExm',
  doGetExmInfo: 'doGetExmInfo',
  doTest: 'doTest',
  doGetTest: 'doGetTest',
  startTest: 'startTest',
  doVideo: 'doVideo',
  getUserUseCarInfo: 'getUserUseCarInfo',
  doVideoList: 'doVideoList',
  setVideoPath: 'setVideoPath',
  initTestTime: 'initTestTime',
  remainingTime: 'remainingTime',
  submitTest: 'submitTest'
}
let methods = [SUCCESS.toLowerCase(), FAILURE.toLowerCase(), REQUEST.toLowerCase()]
const mutationNames = {}
for (let actionName in globalConst) {
  if (globalConst.hasOwnProperty(actionName)) {
    methods.forEach((method) => {
      if (!mutationNames[`${actionName}_${method}`]) {
        mutationNames[`${actionName}_${method}`] = `${actionName}_${method}`
      }
    })
  }
}

const pageSize = 10
const arr2obj = (arr, keyName = 'key', valueName = 'value') => {
  let obj = {}
  arr.forEach((row) => {
    obj[row[keyName]] = {value: row[valueName]}
  })
  return obj
}
const client = {
  // 移动
  mobile: 1,
  // 联通
  unicorn: 2,
  // 电信
  telecom: 3,
  // 铁塔
  ironTower: 4
}

const clientValue = [
  {value: client.mobile, label: '移动', checked: true},
  {value: client.unicorn, label: '联通', checked: false},
  {value: client.telecom, label: '电信', checked: false},
  {value: client.ironTower, label: '铁塔', checked: false},
]
const clientObj = arr2obj(clientValue)
const major = {
  // 线路
  xianlu: 1,
  // 基站
  jizhan: 2,
  // 铁塔
  ironTower: 3,
  // 集团专线
  jtzx: 4,
  // wlan
  wlan: 5,
  // 机房
  jf: 6
}
const majorValue = [
  {value: major.xianlu, label: '线路'},
  {value: major.jizhan, label: '基站'},
  {value: major.ironTower, label: '铁塔'},
  {value: major.jtzx, label: '集团专线'},
  {value: major.wlan, label: '室分及WLAN'},
  {value: major.jf, label: '机房及动力配套'}
]
const majorObj = arr2obj(majorValue)
const workType = {
  // 按年
  year: 1,
  // 按次数
  count: 2,
  other: 3
}
const workTypeValue = [
  {key: workType.year, value: '包年'},
  {key: workType.count, value: '按次'},
  {key: workType.other, value: '其他'},
]
const workOrderTypeStatus = {
  undone: 0,
  review: 1,
  done: 3
}
const workOrderTypes = [
  {value: workOrderTypeStatus.undone, label: '未归档'},
  {value: workOrderTypeStatus.review, label: '待审核'},
  {value: workOrderTypeStatus.done, label: '已归档'}
]

const baseListTypes = {
  workOrder: 0,
  questionOrder: 1,
  sysOrder: 2,
  dyLogs: 3,
  veLogs: 4
}
// 1紧急，2一般，3非紧急’
const level = {
  three: 1,
  two: 2,
  one: 3
}
const levelValue = [
  {value: level.three, label: '紧急'},
  {value: level.two, label: '一般'},
  {value: level.one, label: '非紧急'},
]

// 状态action：1使用，2修订地址，3变更状态
const actionStatus = {
  use: 1,
  updateAddress: 2,
  updateStatus: 3
}
const actionValue = [
  {value: actionStatus.use, label: '使用'},
  {value: actionStatus.updateAddress, label: '修改地址'},
  {value: actionStatus.updateStatus, label: '变更状态'},
]
const actionObj = arr2obj(actionValue, 'value', 'label')

const generatorIds = [15, 59, 103, 136]

/**
 * 格式化地址对象 变成base select 所需的数据格式
 * @param dataObj
 * @returns {Array}
 */
const formatData = (dataObj = {}, nodeKey = 'id', nodeLabel = 'label') => {
  let data = []
  for (let key in dataObj) {
    if (dataObj.toString.call(key)) {
      data.push({[nodeKey]: key, [nodeLabel]: dataObj[key]})
    }
  }
  return data
}

const baseWorkMode = {
  base: 0,
  list: 1
}

const trainTypeStatus = {
  skill: 1,
  manage: 2,
  videoSkill: 3,
  videoManage: 4
}
const trainTypes = [
  {value: trainTypeStatus.skill, label: '技能培训类题库'},
  {value: trainTypeStatus.manage, label: '管理培训类题库'}
]
const videoTypes = [
  {value: trainTypeStatus.videoSkill, label: '技能培训类题库'},
  {value: trainTypeStatus.videoManage, label: '管理培训类题库'}
]
const trainObj = arr2obj(trainTypes.concat(videoTypes), 'value', 'label')
const dateType = {
  year: 0,
  yearAndMonth: 1,
  yearAndMonthAndDay: 2
}
// 1单选题，2多选题，3判断题
const subjectStatus = {
  radioSubject: 1,
  checkSubject: 2,
  switchSubject: 3
}
const subjectTypes = [
  {value: subjectStatus.radioSubject, label: '单选题'},
  {value: subjectStatus.checkSubject, label: '多选题'},
  {value: subjectStatus.switchSubject, label: '判断题'}
]

class Subject {
  constructor () {
    this.title = null
    this.answer = null
    this.resolve = null
    this.hasAnswer = false
    this.items = []
    this.sort = null
    this.isRight = false
    this.rightAnswer = null
    this.id = null
  }
}

const trainModes = {
  answer: 0,
  test: 1,
  video: 2
}

export {
  globalConst,
  modalTitle,
  pageSize,
  SUCCESS,
  FAILURE,
  REQUEST,
  ERROR_UNAUTHORIZED,
  mutationNames,
  client,
  clientValue,
  clientObj,
  major,
  majorValue,
  majorObj,
  levelValue,
  workType,
  workTypeValue,
  workOrderTypes,
  workOrderTypeStatus,
  baseListTypes,
  level,
  generatorIds,
  formatData,
  actionStatus,
  actionValue,
  actionObj,
  baseWorkMode,
  trainTypeStatus,
  trainTypes,
  trainObj,
  dateType,
  subjectStatus,
  subjectTypes,
  Subject,
  trainModes,
  arr2obj,
  videoTypes
}
