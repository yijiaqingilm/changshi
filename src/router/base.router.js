import FillOrder from 'src/pages/base/fillOrder/Index'
import WorkOrder from 'src/pages/base/workOrder/Index'
import WorkOrderDetail from 'src/pages/base/workOrder/WorkOrderDetail'
import QuestionOrder from 'src/pages/base/questionOrder/Index'
import QuestionOrderDetail from 'src/pages/base/questionOrder/QuestionOrderDetail.vue'
import WorkOrderEdit from 'src/pages/base/workOrder/WorkOrderEdit.vue'
import Question2WorkBase from 'src/pages/base/questionOrder/Question2WorkBase'
import myRouter from 'lib/MyRouterResolver'

let baseRouter = myRouter()
baseRouter.addComponent('fillOrder/index', FillOrder)
baseRouter.addComponent('workOrder/index', WorkOrder)
baseRouter.addComponent('workOrder/detail/:id', WorkOrderDetail)
baseRouter.addComponent('questionOrder/index', QuestionOrder)
baseRouter.addComponent('questionOrder/detail/:id', QuestionOrderDetail)
baseRouter.addComponent('workOrder/edit/:id', WorkOrderEdit)
baseRouter.addComponent('questionOrder/workBase/:id', Question2WorkBase)
export default baseRouter
