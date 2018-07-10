import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import myRouter from './myRouter'
import Home from 'src/pages/Home'
import trainingRouter from './training.router'

let router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
]
export default [].concat(router).concat(myRouter).concat(trainingRouter)
