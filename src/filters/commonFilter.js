import Vue from 'vue'
import moment from 'lib/moment'
import 'lib/moment/locale/zh-cn'

console.log('测试会开始')
console.log(moment(Number('1534486721787')).format('YYYY-MM-DD HH:mm:ss'))
console.log('结束')
Vue.filter('uppercase', function (value) {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
let defaultNum = 2
Vue.filter('toFixed', function (value, num = defaultNum) {
  if (!value) {
    return value
  }
  return Number(value).toFixed(num)
})

Vue.filter('dateFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!Number(value)) {
    return value
  }
  return moment(Number(value)).format(format)
})
Vue.filter('fromNow', function (value) {
  let now = moment()
  let currentTime = moment(value)
//  return currentTime.from(now)
  return moment(value).fromNow()
})


