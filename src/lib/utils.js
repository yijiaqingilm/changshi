import curry from 'lodash/curry'
import flowRight from 'lodash/flowRight'
import Vue from 'vue'
import { FAILURE, REQUEST, SUCCESS } from 'lib/const'
import moment from './moment'
import md5 from 'js-md5'
import AMap from 'AMap'
// Cache processor
const Cache = {
  get: (key) => {
    if (!window.sessionStorage) {
      return false
    }
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) {
      return false
    }
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key)),
  clear: () => {
    if (!window.sessionStorage) {
      return false
    }
    window.sessionStorage.clear()
  },
  del: (key) => {
    if (!window.sessionStorage) {
      return false
    }
    window.sessionStorage.removeItem(key)
  }
}
const LocalCache = {
  get: (key) => {
    if (!window.localStorage) {
      return false
    }
    return JSON.parse(window.localStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.localStorage) {
      return false
    }
    window.localStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => Boolean(window.localStorage && window.localStorage.hasOwnProperty(key)),
  clear: () => {
    if (!window.localStorage) {
      return false
    }
    window.localStorage.clear()
  },
  del: (key) => {
    if (!window.localStorage) {
      return false
    }
    window.localStorage.removeItem(key)
  }
}

const getSessionKey = () => LocalCache.get('sessionkey')

/**
 *
 * 常用工具类
 *
 */

const commonly = {
  match: curry(function (what, str) {
    return str.match(what)
  }),
  filter: curry(function (f, arr) {
    return arr.filter(f)
  }),
  map: curry(function (f, arr) {
    return arr.map(f)
  }),
  replace: curry(function (what, replacement, str) {
    return str.replace(what, replacement)
  }),
  split: curry(function (what, str) {
    return str.split(what)
  }),
  find: curry(function (f, arr) {
    return arr.find(f)
  }),
  prop: curry(function (p, obj) {
    return obj[p]
  }),
  /**
   *  组合函数  从右到左 (左倾)
   * @param f
   * @param g
   * @returns {Function}
   */
  compose: flowRight,
  /**
   * 辅助函数  用于组合debug
   */
  trace: curry(function (tag, x) {
    console.log(tag, x)
    return x
  })

}

let getQuery = function (para) {
  var reg = new RegExp('(^|&)' + para + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
let isWeiXin = function isWeiXin () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
  // 使用这里的
}

/** * 用于把用utf16编码的字符转换成实体字符，以供后台存储 * @param {string} str 将要转换的字符串，其中含有utf16字符将被自动检出 * @return {string} 转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符 */
let utf16toEntities = function utf16toEntities (str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    var H, L, code
    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
      return '&#' + code + ';'
    } else {
      return char
    }
  })
  return str
}

let fiiterEmoji = function (str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(patt, '')
  return str
}

let getScrollParent = function getScrollParent (elm) {
  if (elm.tagName === 'BODY') {
    return window
  } else if (['scroll', 'auto'].indexOf(window.getComputedStyle(elm).overflowY) > -1) {
    return elm
  }
  return getScrollParent(elm.parentNode)
}

let getCurrentDistance = function getCurrentDistance (elm, dir) {
  let distance
  const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop
  if (dir === 'top') {
    distance = scrollTop
  } else {
    const scrollElmHeight = elm === window ? window.innerHeight : elm.getBoundingClientRect().height

    distance = this.$el.offsetTop - scrollTop - scrollElmHeight - (elm.offsetTop || 0)
  }
  return distance
}
let isEmptyObject = function (obj) {
  for (let o in obj) {
    return false
  }
  return true
}

const round = (num, len) => {
  return Math.round(num * Math.pow(10, len)) / Math.pow(10, len)
}
// rules=["100-3", "200-6", "300-10"]
let formatRule = function (rules) {
  let formatRule = []
  for (let i = 0; i < rules.length; i++) {
    let rule = {}
    let [min, value] = rules[i].split('-')
    let max = -1
    if ((i + 1) !== rules.length) {
      max = rules[i + 1].split('-')[0] - 1
    } else {
      max = Number.MAX_VALUE
    }
    rule = {min: min >>> 0, value: value >>> 0, max}
    formatRule.push(rule)
  }
  return formatRule
}
let findRule = (rules) => (total) => {
  let ruleList = formatRule(rules)
  let rule = null
  let low = 0
  let high = ruleList.length - 1
  let mind
  let currentRule = null
  while (low <= high) {
    mind = Math.floor((low + high) / 2)
    currentRule = ruleList[mind]
    let {min, max} = currentRule
    if (total < min) {
      high = mind - 1
    } else if (total > max) {
      low = mind + 1
    } else if (total <= max && total >= min) {
      rule = ruleList[mind]
      break
    }
  }
  return rule
}

const wx_share = function (title, link, imgUrl, desc) {
  wx.showMenuItems({
    menuList: [
      'menuItem:share:timeline', // 分享到朋友圈
      'menuItem:share:appMessage' // 复制链接
    ],
    success: function (res) {
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    },
    fail: function (res) {
      alert(JSON.stringify(res))
    }
  })
}
// 此处需要重构，
let margeMutations = (actions) => {
  let keys = Object.keys(actions)
  let mutations = {}
  let [success, failure, request] = [SUCCESS.toLowerCase(), FAILURE.toLowerCase(), REQUEST.toLowerCase()]
  keys.length && keys.forEach((actionName) => {
    mutations[`${actionName}_${request}`] = function (state, {refs}) {

    }
    mutations[`${actionName}_${failure}`] = function (state, {error}) {

    }
  })
  return mutations
}

const dataFormat = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
}

class Params {
  constructor (key, value) {
    this.key = key
    this.value = value
    this.initials = this.key.substr(0, 1)
  }

  formatString () {
    return this.key + '=' + this.value
  }
}

const getSignature = (p) => {
  let wrap = []
  for (let key in p) {
    if (p.hasOwnProperty(key)) {
      wrap.push(new Params(key, p[key]))
    }
  }
  wrap.sort((a, b) => a.initials > b.initials)
  wrap = wrap.map((row) => row.formatString())
  return md5(wrap.join('&'))
}

const aMapUtil = {
  destrictSearch: (level = 'country', value, callBack) => new Promise((resolve, reject) => {
    AMap.plugin('AMap.DistrictSearch', () => {
      let districtSearch = new AMap.DistrictSearch({
        level: level,
        subdistrict: 1
      })
      // 搜索所有省/直辖市信息
      districtSearch.search(value, (status, result) => {
        // 查询成功时，result即为对应的行政区信息
        if (status === 'complete') {
          callBack && callBack(null, result.districtList[0].districtList)
          resolve(result.districtList[0].districtList)
        } else {
          callBack && callBack(result)
          reject(result)
        }

      })
    })
  }),
  geolocation: () => new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', () => {
      let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB',
        GeoLocationFirst: true
      })
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          console.log('result point', result)
          resolve(result)
        } else {
          reject(result)
        }
      })
      /* geolocation.getCityInfo((status, result) => {
         if (status === 'complete') {
           resolve(result)
         } else {
           reject(result)
         }
       })*/
    })
  }),
}
export {
  Cache,
  LocalCache,
  commonly,
  getScrollParent,
  isEmptyObject,
  round,
  findRule,
  wx_share,
  margeMutations,
  dataFormat,
  getSignature,
  aMapUtil
}
