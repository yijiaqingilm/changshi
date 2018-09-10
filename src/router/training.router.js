import Answer from 'src/pages/training/answer/Answer'
import VideoMain from 'src/pages/training/video/VideoMain'
import TrainHome from 'src/pages/training/Train.home'
import AnswerHome from 'src/pages/training/answer/Answer.home.vue'
import Answer2Begin from 'src/pages/training/Begin2Answer.vue'
import TrainingLogs from 'src/pages/training/trainingLogs/TrainingLogs.vue'
import ChooseLevel from 'src/pages/training/ChooseLevel.vue'
import myRouter from 'lib/MyRouterResolver'

let trainingRouter = myRouter()
trainingRouter.addComponent('answer', Answer)
trainingRouter.addComponent('video/main', VideoMain)
trainingRouter.addComponent('home/:trainType', TrainHome)
trainingRouter.addComponent('answer/home', AnswerHome)
trainingRouter.addComponent('begin', Answer2Begin)
trainingRouter.addComponent('logs', TrainingLogs)
trainingRouter.addComponent('chooseLevel/:typeId/:id', ChooseLevel)
export default trainingRouter
