import BaseBSC from 'pages/bsc/BaseBSC'
import ManageBSc from 'pages/bsc/ManageBSC'
import TrainingBSC from 'pages/bsc/TrainingBSC'
import myRouter from 'lib/MyRouterResolver'

let bscRouter = myRouter()
bscRouter.addComponent('base', BaseBSC)
bscRouter.addComponent('manage', ManageBSc)
bscRouter.addComponent('train', TrainingBSC)
export default bscRouter
