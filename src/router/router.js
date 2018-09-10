import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login.vue'
import trainingRouter from './training.router'
import baseRouter from './base.router'
import bscRouter from './bsc.router'
import rmRouter from './rm.router'
import sysRouter from './sys.router'
import myRouter from 'lib/MyRouterResolver'

let router = myRouter()
router.addComponent('jump', Jump)
router.addComponent('error', Err)
router.addComponent('home', Home)
router.addComponent('login', Login)
router.use('/base', baseRouter)
router.use('/bsc', bscRouter)
router.use('/rm', rmRouter)
router.use('/sys', sysRouter)
router.use('/training', trainingRouter)
let routerAll = router.resolverAll()
export default routerAll
