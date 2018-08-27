import Answer from 'src/pages/training/answer/Answer'
import VideoMain from 'src/pages/training/video/VideoMain'
import TrainHome from 'src/pages/training/Train.home'
import AnswerHome from 'src/pages/training/answer/Answer.home.vue'
import Answer2Begin from 'src/pages/training/Begin2Answer.vue'
import TrainingLogs from 'src/pages/training/trainingLogs/TrainingLogs.vue'
import ChooseLevel from 'src/pages/training/ChooseLevel.vue'

let router = [
  {path: '/training/answer', component: Answer},
  {path: '/training/video/main', component: VideoMain},
  {path: '/training/home/:trainType', component: TrainHome},
  {path: '/training/answer/home', component: AnswerHome},
  {path: '/training/begin', component: Answer2Begin},
  {path: '/training/logs', component: TrainingLogs},
  {path: '/training/chooseLevel/:typeId/:id', component: ChooseLevel}
]
export default router
