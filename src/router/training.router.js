import Answer from 'src/pages/training/answer/Answer'
import VideoMain from 'src/pages/training/video/VideoMain'
import TrainHome from 'src/pages/training/Train.home'
import Begin from 'src/pages/training/Begin'
import TestMain from 'src/pages/training/test/TestMain'
import TrainingLogs from 'src/pages/training/trainingLogs/TrainingLogs.vue'
import ChooseLevel from 'src/pages/training/ChooseLevel.vue'
import myRouter from 'lib/MyRouterResolver'

let trainingRouter = myRouter()
trainingRouter.addComponent('answer', Answer)
trainingRouter.addComponent('video', VideoMain)
trainingRouter.addComponent('test', TestMain)
trainingRouter.addComponent('home/:trainType', TrainHome)
trainingRouter.addComponent('begin', Begin)
trainingRouter.addComponent('logs', TrainingLogs)
trainingRouter.addComponent('chooseLevel/:typeId/:id', ChooseLevel)
export default trainingRouter
