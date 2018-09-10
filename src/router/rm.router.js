/**
 * Created by admin on 2018/7/20.
 */
import Dynamotor from 'src/pages/rm/dynamotor/Dynamotor.vue'
import Vehicle from 'src/pages/rm/vehicle/Vehicle.vue'
import Logs from 'src/pages/rm/rmLogs/RmLogs.vue'
import myRouter from 'lib/MyRouterResolver'

let rmRouter = myRouter()
rmRouter.addComponent('dynamotor', Dynamotor)
rmRouter.addComponent('vehicle', Vehicle)
rmRouter.addComponent('logs', Logs)
export default rmRouter
