import Answer from 'src/pages/training/answer/Answer'
import VideoMain from 'src/pages/training/video/VideoMain'
import AnswerHome from 'src/pages/training/answer/Answer.home.vue'
import AnswerBegin from 'src/pages/training/answer/BeginAnswer.vue'
import TrainingLogs from 'src/pages/training/trainingLogs/TrainingLogs.vue'
import ChooseLevel from 'src/pages/training/answer/ChooseLevel.vue'
let router = [
  {path: '/training/answer', component: Answer},
  {path: '/training/video/main', component: VideoMain},
  {path: '/training/answer/main', component: AnswerHome},
  {path: '/training/answer/begin', component: AnswerBegin},
  {path: '/training/logs', component: TrainingLogs},
  {path: '/training/answer/chooseLevel/:typeId/:id', component: ChooseLevel}
]
export default router
