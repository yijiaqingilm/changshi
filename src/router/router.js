import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login.vue'
import trainingRouter from './training.router'
import baseRouter from './base.router'
import bscRouter from './bsc.router'
import rmRouter from './rm.router'
import sysRouter from './sys.router'

let router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
  {path: '/login', component: Login}
]
export default [].concat(router).concat(trainingRouter).concat(baseRouter).concat(bscRouter).concat(rmRouter).concat(sysRouter)
