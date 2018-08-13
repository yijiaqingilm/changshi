import { mapState } from 'vuex'
import { globalConst as native } from 'lib/const'
import { isEmptyObject } from 'lib/utils'

const globalMixin = {
  created () {
    /* this.$store.dispatch({
       type: native.doWxLogin
     })*/
  },
  computed: mapState({}),
}
export default globalMixin
