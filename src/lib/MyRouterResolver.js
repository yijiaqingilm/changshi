/* router.use('/base',baseRouter)
 let baseRouter = new Router()
 baaseRouter.addComponent('/fillorder',FillOrder)
  ====>


  router:{
    path:'/'
    router:{
       path:'/',
       compoents:{}
    }
    components:[{}],
    methods:{
      use(path,Router)
      addComponent(componentName,component)
      all() ==> 返回所有的 组件数组
    }
  }

  ===>
*/
var getChildRouterPaths = (routers) => routers.map((router) => router.path)

class MyRouterResolver {
  constructor () {
    this.path = ''
    this.routers = []
    this.components = []
  }

  setPath (path) {
    this.path = path
  }

  hasExistPath (path) {
    return getChildRouterPaths(this.routers).includes(path)
  }

  /**
   * 添加 router 到当前router 上。
   * @param path
   * @param router
   */
  use (path, router) {
    if (!(router instanceof MyRouterResolver)) {
      throw new TypeError('router 不是 MyRouterResolver 的实例对象')
    }
    if (this.hasExistPath(path)) {
      throw new TypeError('当前path已经被设置')
    }
    router.setPath(path)
    this.routers.push(router)
  }

  /**
   * 将当前router的 所有route 解析成数组
   * @returns {Array}
   */
  resolver () {
    return []
  }
}
