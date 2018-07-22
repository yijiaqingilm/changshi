import FillOrder from 'src/pages/base/fillOrder/Index'
import WorkOrder from 'src/pages/base/workOrder/Index'
import WorkOrderDetail from 'src/pages/base/workOrder/WorkOrderDetail'
import QuestionOrder from 'src/pages/base/questionOrder/Index'
import QuestionOrderDetail from 'src/pages/base/questionOrder/QuestionOrderDetail.vue'
import WorkOrderEdit from 'src/pages/base/workOrder/WorkOrderEdit.vue'
let router = [
  {path: '/base/fillOrder/index', component: FillOrder},
  {path: '/base/workOrder/index', component: WorkOrder},
  {path: '/base/workOrder/detail/:id', component: WorkOrderDetail},
  {path: '/base/questionOrder/index', component: QuestionOrder},
  {path: '/base/questionOrder/detail/:id', component: QuestionOrderDetail},
  {path: '/base/workOrder/edit/:id', component: WorkOrderEdit}
]
export default router
