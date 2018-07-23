import Answer from 'src/pages/training/answer/Answer'
import VideoMain from 'src/pages/training/video/VideoMain'
import AnswerHome from 'src/pages/training/answer/Answer.home.vue'
import AnswerBegin from 'src/pages/training/answer/BeginAnswer.vue'
let router = [
  {path: '/training/answer', component: Answer},
  {path: '/training/video/main', component: VideoMain},
  {path: '/training/answer/main', component: AnswerHome},
  {path: '/training/answer/begin', component: AnswerBegin}
]
export default router
