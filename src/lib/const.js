const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const REQUEST = 'REQUEST'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  doLoadProfile: 'doLoadProfile',
  doLoadConfig: 'doLoadConfig',
  doIncomeList: 'doIncomeList',
  doArticleList: 'doArticleList',
  doArticleDetail: 'doArticleDetail',
  readThisArticle: 'readThisArticle',
  doSaveShareUserId: 'doSaveShareUserId',
  doWechatBind: 'doWechatBind'
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
const incomeStatus = {
  order: 0,
  reading: 1
}
const incomeStatusInfo = {
  [incomeStatus.order]: '订单收益',
  [incomeStatus.reading]: '阅读收益'
}
const orderStatus = {
  complete: 0,
  undone: 1,
  lose: -1
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
  incomeStatusInfo,
  incomeStatus,
  orderStatus
}
