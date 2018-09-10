/**
 * Created by admin on 2018/7/20.
 */
import Sys from 'src/pages/sys/Sys.vue'
import myRouter from 'lib/MyRouterResolver'

let sysRouter = myRouter()
sysRouter.addComponent('index', Sys)
export default sysRouter
