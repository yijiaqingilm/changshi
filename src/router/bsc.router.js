import BaseBSC from 'pages/bsc/BaseBSC'
import ManageBSc from 'pages/bsc/ManageBSC'
import TrainingBSC from 'pages/bsc/TrainingBSC'

let router = [
  {path: '/bsc/base', component: BaseBSC},
  {path: '/bsc/manage', component: ManageBSc},
  {path: '/bsc/train', component: TrainingBSC}
]
export default router
