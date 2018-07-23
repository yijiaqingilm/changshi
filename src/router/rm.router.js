/**
 * Created by admin on 2018/7/20.
 */
import Dynamotor from 'src/pages/rm/dynamotor/Dynamotor.vue'
import Vehicle from 'src/pages/rm/vehicle/Vehicle.vue'
import Logs from 'src/pages/rm/rmLogs/RmLogs.vue'

let router = [
  {path: '/rm/dynamotor', component: Dynamotor},
  {path: '/rm/vehicle', component: Vehicle},
  {path: '/rm/logs', component: Logs}
]
export default router
