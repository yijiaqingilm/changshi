import FillOrder from 'src/pages/base/fillOrder/Index'
import WorkOrder from 'src/pages/base/workOrder/Index'
import WorkOrderDetail from 'src/pages/base/workOrder/WorkOrderDetail'
import QuestionOrder from 'src/pages/base/questionOrder/Index'

let router = [
  {path: '/base/fillOrder/index', component: FillOrder},
  {path: '/base/workOrder/index', component: WorkOrder},
  {path: '/base/workOrder/detail/:id', component: WorkOrderDetail},
  {path: '/base/questionOrder/index', component: QuestionOrder}
]
export default router
