const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const REQUEST = 'REQUEST'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  doAnswer: 'doAnswer',
  doWorkSender: 'doWorkSender',
  doGetWorkBase: 'doGetWorkBase',
  doAddressList: 'doAddressList',
  doGetAmmeter: 'doGetAmmeter',
  doGetDynamotor: 'doGetDynamotor',
  doDynamotorCreate: 'doDynamotorCreate',
  doWorkNumber: 'doWorkNumber',
  doWorkNumberDetail: 'doWorkNumberDetail',
  doWorkNumberUpdate: 'doWorkNumberUpdate',
  doLeaveQuestion: 'doLeaveQuestion',
  doLeaveQuestionDetail: 'doLeaveQuestionDetail',
  doLeaveQuestionUpdate: 'doLeaveQuestionUpdate',
  doWorkSort: 'doWorkSort',
  doLogin: 'doLogin'
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
  {key: client.mobile, value: '移动', checked: true},
  {key: client.unicorn, value: '联通', checked: false},
  {key: client.telecom, value: '电信', checked: false},
  {key: client.ironTower, value: '铁塔', checked: false},
]
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
  {key: major.xianlu, value: '线路'},
  {key: major.jizhan, value: '基站'},
  {key: major.ironTower, value: '铁塔'},
  {key: major.jtzx, value: '集团专线'},
  {key: major.wlan, value: 'wlan'},
  {key: major.jf, value: '机房'}
]
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
  done: 2
}
const workOrderTypes = [
  {key: workOrderTypeStatus.undone, value: '未归档'},
  {key: workOrderTypeStatus.review, value: '待审核'},
  {key: workOrderTypeStatus.done, value: '已归档'}
]

const baseListTypes = {
  workOrder: 0,
  questionOrder: 1,
  sysOrder: 2
}
// 1紧急，2一般，3非紧急’
const leave = {
  three: 1,
  two: 2,
  one: 3
}
const leaveValue = [
  {key: leave.three, value: '紧急'},
  {key: leave.two, value: '一般'},
  {key: leave.one, value: '非紧急'},
]
const generatorIds = [15, 55]
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
  major,
  majorValue,
  leaveValue,
  workType,
  workTypeValue,
  workOrderTypes,
  workOrderTypeStatus,
  baseListTypes,
  leave
}
