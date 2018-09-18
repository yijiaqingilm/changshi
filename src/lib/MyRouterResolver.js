var getChildRouterPaths = (routers) => routers.map((router) => router.path)

function resovleComonent (router) {
  let wrap = []

  function resolve (router, basePath) {
    if (router.components.length > 0) {
      router.components.forEach((component) => {
        wrap.push({path: `${basePath}/${component.name}`, component: component.component})
      })
    }
    if (router.routers.length > 0) {
      router.routers.forEach((childRouter) => {
        resolve(childRouter, basePath + childRouter.path)
      })
    }
  }

  resolve(router, router.path)
  return wrap

}

class MyComponent {
  constructor (name, component) {
    this.name = name
    this.component = component
  }
}

class MyRouterResolver {
  constructor () {
    this.path = ''
    this.routers = []
    this.components = []
  }

  setPath (path) {
    this.path = path
  }

  /**
   * 当前router 是否已经存在这个path
   * @param path
   * @returns {*}
   */
  hasExistPath (path) {
    return getChildRouterPaths(this.routers).includes(path)
  }

  /**
   * 当前组件列表 是否已经存在该组件
   * @param componentName
   * @returns {boolean}
   */
  hasExistComponent (componentName) {
    let componentsName = this.components.map((component) => component.name)
    return componentsName.includes(componentName)
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
      throw new Error('当前path已经被设置')
    }
    router.setPath(path)
    this.routers.push(router)
  }

  /**
   * 添加 组件 到当前router 上。
   * @param componentName
   * @param component
   */
  addComponent (componentName, component) {
    if (this.hasExistComponent(componentName)) {
      throw new Error('当前组件列表 已经存在该组件')
    }
    this.components.push(new MyComponent(componentName, component))
  }

  /**
   * 将当前router的 所有route 解析成数组
   * @returns {Array}
   */
  resolverAll () {
    return resovleComonent(this)
  }
}

export default function () {
  return new MyRouterResolver()
}
