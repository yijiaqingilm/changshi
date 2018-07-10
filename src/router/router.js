import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import myRouter from './myRouter'
import Home from 'src/pages/Home'
import ArticleList from 'src/pages/article/ArticleList'
import Deposit from 'src/pages/deposit/Deposit'
import Income from 'src/pages/income/IncomeList'
import Rule from 'src/pages/rule/Rule'
import Bind from 'src/pages/Bind'

let router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
  {path: '/article/list', component: ArticleList},
  {path: '/deposit', component: Deposit},
  {path: '/income', component: Income},
  {path: '/rule', component: Rule},
  {path: '/bind', component: Bind}
]
export default [].concat(router).concat(myRouter)
