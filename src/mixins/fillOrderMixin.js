import {
  level as levelType,
  client,
  clientValue,
  globalConst as native,
  major,
  majorValue,
  workType,
  workTypeValue,
  generatorIds,
  modalTitle,
  Question,
  Ammeter
} from 'lib/const'
import { mapState, mapGetters } from 'vuex'
import { aMapUtil, getTimer, wxScanQRCode, dateFormat } from 'lib/utils'
import { bus } from 'src/main'

const fillOrdermixin = {
  name: 'fillorder',
  data () {
    return {
      getTimer,
      showWorkType: true,
      jobCard: {
        id: '',
        client: client.mobile,
        major: '',
        workBase: '',
        workType: workType.year,
        workSort: '',
        content: '',
        startDate: new Date().toISOString(),
        displayStartDate: '',
        displayEndDate: '',
        endDate: new Date().toISOString(),
        fee: '',
        refWorkNumber: '',
        isLeaveQuestion: false,
        leave: [],
        ammeter: [],
        dynamotor: {
          id: '',
          code: '',
          startTime: '',
          endTime: '',
          duration: '',
          oilfee: '',
          remark: ''
        },
        poweradd: ''
      },
      clientValue,
      workTypeValue: workTypeValue.filter((item) => item.key !== workType.other),
      jobPoint: null,
      jobPointName: '',
      dateTime: {
        options: {
          phrases: {
            ok: '确定',
            cancel: '关闭'
          },
          format: 'yyyy-MM-dd HH:mm:ss'
        }
      },
      workSortList: [],
      workBaseList: [],
      iconSrc: {
        add: require('../assets/icon_add.png'),
      },
      validator: null,
      errors: null,
      btnDyStartTimeDisable: false,
      btnDyEndTimeDisable: true,
      showDynamotor: false
    }
  },
  computed: {
    ...mapGetters(['getProvinceList']),
    ...mapState({
      activeAddress: ({base}) => base.activeAddress,
      loadWorkBase: ({base}) => base.loadWorkBase
    }),
    currentAddress () {
      let {provinceName, cityName, districtName} = this.activeAddress
      let currentAddress = provinceName + cityName + districtName
      if (provinceName && cityName && districtName) {
        this.changePointList()
      }
      return currentAddress.length > 0 ? currentAddress : '请选择地址'
    },
    showAmmeter () {
      /* switch (this.jobCard.major >>> 0) {
       case major.jizhan:
       case major.jf:
       case major.wlan:
       return true
       default:
       return false
       }*/
      switch (this.jobCard.major >>> 0) {
        case major.xianlu:
        case major.jtzx:
          return false
        default:
          return true
      }
    },
    /* showDynamotor () {
     return generatorIds.indexOf(this.jobCard.workSort >>> 0) !== -1
     },*/
    majorValue () {
      let {xianlu, jizhan, ironTower, jtzx, wlan, jf} = major
      switch (this.jobCard.client >>> 0) {
        case client.mobile:
        case client.unicorn:
        case client.telecom:
          return majorValue.filter(({value}) => value !== jf)
        case client.ironTower:
          return majorValue.filter(({value}) => value === ironTower || value === wlan || value === jf)
      }
    },
  },
  watch: {
    'jobCard.client': {
      handler: function (nowClient, oldClient) {
        this.changeSortTypeList()
        // this.changePointList()
        if (nowClient === client.ironTower) {
          this.showWorkType = false
          this.jobCard.workType = workType.other
        } else {
          this.showWorkType = true
          this.jobCard.workType = workType.year
        }
      },
      immediate: true
    },
    'jobCard.workType': {
      handler: function (nowWorkType, oldWorkType) {
        if (nowWorkType !== oldWorkType) {
          this.jobCard.workSort = ''
        }
        this.changeSortTypeList()
      },
      immediate: true
    },
    'jobCard.major': {
      handler: function (nowMajor, oldMajor) {
        this.changeSortTypeList()
        // this.changePointList()
      },
      immediate: true
    }
  },
  methods: {
    goBack () {
      this.$f7.confirm('你还未保存填报内容，是否确认退出？', modalTitle, () => {
        this.$router.back()
      })
    },
    openAutoComplate () {
      this.$refs.autocomplate.open()
    },
    changeWorkSort (workSort) {
      this.showDynamotor = workSort.name === '发电'
    },
    resetJobCard () {
      this.jobCard = {
        client: client.mobile,
        major: '',
        workBase: '',
        workType: workType.year,
        workSort: '',
        content: '',
        startDate: new Date().toISOString(),
        displayStartDate: '',
        displayEndDate: '',
        endDate: '',
        fee: '',
        refWorkNumber: '',
        isLeaveQuestion: false,
        leave: [],
        ammeter: [],
        dynamotor: {
          id: '',
          code: '',
          startTime: '',
          endTime: '',
          duration: '',
          oilfee: '',
          remark: ''
        }
      }
      this.btnDyStartTimeDisable = false
      this.btnDyEndTimeDisable = true
    },
    startDy () {
      if (this.btnDyStartTimeDisable) {
        return
      }
      let code = this.jobCard.dynamotor.id
      if (!code) {
        this.$f7.alert('请先获取发电机信息', modalTitle)
        return
      }
      this.$f7.confirm('是否确认开始发电?', modalTitle, () => {
        this.jobCard.dynamotor.startTime = new Date().getTime()
        this.btnDyStartTimeDisable = true
        this.btnDyEndTimeDisable = false
      })

    },
    endDy () {
      if (this.btnDyEndTimeDisable) {
        return
      }
      this.$f7.confirm('是否确认结束发电?', modalTitle, () => {
        this.btnDyEndTimeDisable = true
        this.jobCard.dynamotor.endTime = new Date().getTime()
        let {startTime, endTime} = this.jobCard.dynamotor
        this.jobCard.dynamotor.duration = endTime - startTime
      })
    },
    handleWorkBaseDetail (workBaseInfo) {
      if (workBaseInfo.is_leave === 'Y') {
        this.$f7.confirm('该作业点存在遗留问题工单是否跳转至遗留问题工单页面进行处理？', modalTitle, () => {
          this.$router.loadPage(`/base/questionOrder/workBase/${workBaseInfo.id}`)
        })
      }
    },
    changeJobPoint (value) {
      console.log('chagneJobPoint', value)
      this.jobCard.workBase = value.id
      this.jobPoint = value.work_base
      this.handleWorkBaseDetail(value)
    },
    changeJobPoint2 (value) {
      this.jobPoint = value.work_base
      this.handleWorkBaseDetail(value)
    },
    submit () {
      let {client, major, workType, workBase, workSort, content, displayStartDate, displayEndDate, fee, refWorkNumber, isLeaveQuestion, leave, ammeter, dynamotor, poweradd} = this.jobCard
      console.log('cart', this.jobCard)
      this.validator.validateAll({
        workBase,
        workSort,
      })
      //  校验信息
      if (this.errors.errors.length > 0) {
        this.$f7.addNotification({
          hold: 2000,
          media: ('<span className=\'iconfont icon-error\'></span>'),
          title: '提示',
          message: this.errors.errors[0].msg
        })
        return
      }

      /* if (this.showDynamotor && (!this.btnDyStartTimeDisable || !this.btnDyEndTimeDisable)) {
        this.$f7.alert('未结束发电不能提交工单', modalTitle)
        return
      }*/
      /* if (this.showDynamotor && !dynamotor.oilfee) {
        this.$f7.alert('请填写发电费用', modalTitle)
        return
      }*/

      /* if (isLeaveQuestion) {
        if (leave.length === 0) {
          this.$f7.alert('请添加遗留问题', modalTitle)
          return
        }
        for (let i = 0; i < leave.length; i++) {
          let question = leave[i]
          if (!question.question) {
            this.$f7.alert('请填写遗留问题内容', modalTitle)
            return
          }
        }
      }*/
      /* if (this.showAmmeter) {
        for (let i = 0; i < ammeter.length; i++) {
          let ammeterItem = ammeter[i]
          if (!ammeterItem.currentNum) {
            this.$f7.alert('请填写本周期抄电表度数', modalTitle)
            return
          }
          if (!ammeterItem.useNum) {
            this.$f7.alert('请填写电表使用度数', modalTitle)
            return
          }
        }
      }*/

      let ammeterList = ammeter.map((row) => {
        let {currentNum, useNum, ...rest} = row
        if (isNaN(useNum)) {
          useNum = ''
        }
        return {current_num: currentNum, use_num: useNum, ...rest}
      })
      let dynamotorObj = Object.assign({}, dynamotor)
      if (dynamotorObj.code === '') {
        dynamotorObj.id = ''
      }
      if (dynamotorObj.id) {
        dynamotorObj.start_time = dateFormat(dynamotorObj.startTime)
        dynamotorObj.end_time = dateFormat(dynamotorObj.endTime)
      }
      let {provinceName, cityName, districtName} = this.activeAddress
      this.$store.dispatch({
        type: native.doWorkSender,
        client,
        major,
        province: provinceName,
        city: cityName,
        district: districtName,
        work_base: workBase,
        work_type: workType,
        work_sort: workSort,
        content,
        start_date: displayStartDate,
        end_date: displayEndDate,
        fee,
        ref_work_number: refWorkNumber,
        is_leave_question: isLeaveQuestion ? 'Y' : 'N',
        leave: JSON.stringify(leave),
        ammeter: JSON.stringify(ammeterList),
        power: dynamotor.id ? JSON.stringify(dynamotorObj) : '{}',
        poweradd
      }).then(() => {
        this.$f7.alert('提交成功', modalTitle, () => {
          this.resetJobCard()
        })
      }).catch((error) => {
        this.$f7.alert(error, modalTitle)
      })
    },
    openEndTime (event) {
      console.log('openEndTime', this)
      this.$refs.endDate.open(event)
    },
    openStartTime (event) {
      this.$refs.startDate.open(event)
    },
    openDatePicker (params) {
      console.log(params, '====>')
      let {event, index} = params
      this.$refs.ammeterTime[index].open(event)
    },
    showPopup () {
      bus.$emit('openCityPicker')
    },
    getJobPointList () {
      console.log('getJobPoint')
      let {client, major} = this.jobCard
      let {provinceName, cityName, districtName} = this.activeAddress
      return this.$store.dispatch({
        type: native.doGetWorkBase,
        province: provinceName,
        city: cityName,
        district: districtName,
        client,
        major,
        name: this.jobPointName
      })
    },
    // 发电机
    scanDynamotor (code) {
      this.doGetDynamotor(code)
    },
    doGetDynamotor (code) {
      this.$store.dispatch({
        type: native.doGetDynamotor,
        code
      }).then((data) => {
        let initDy = function () {
          this.jobCard.dynamotor.id = data.data.id
          this.jobCard.dynamotor.code = code
          let that = this
          aMapUtil.geolocation().then((data) => {
            that.jobCard.poweradd = data.formattedAddress
          })
        }
        if (this.jobCard.dynamotor.id && this.jobCard.dynamotor.id !== data.data.id) {
          initDy.bind(this)()
          this.jobCard.dynamotor.startTime = ''
          this.jobCard.dynamotor.endTime = ''
          this.btnDyStartTimeDisable = false
          this.btnDyEndTimeDisable = true
          this.jobCard.dynamotor.duration = ''
        } else {
          initDy.bind(this)()
        }
      }).catch((error) => {
        this.$f7.alert(error, modalTitle)
      })
    },
    // 电表
    scanAmmeter (params) {
      let {code, index} = params
      let ammeter = this.jobCard.ammeter[index]
      this.doGetAmmeter(ammeter, code)
    },
    doGetAmmeter (ammeter, code) {
      let {provinceName, cityName, districtName} = this.activeAddress
      this.$store.dispatch({
        type: native.doGetAmmeter,
        code,
        province: provinceName,
        city: cityName,
        district: districtName
      }).then(({data}) => {
        ammeter.code = code
        ammeter.id = data.id
        ammeter.prevNum = data.last_num ? data.last_num + '' : '0'
      }).catch((error) => {
        ammeter.code = ''
        ammeter.id = ''
        ammeter.prevNum = ''
        ammeter.date = ''
        this.$f7.alert(error, modalTitle)
      })
    },
    uploadAmmeterImg (ammeter) {
      if (!__DEBUG__) {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          // sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            let localIds = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            ammeter.displayImg = localIds
            let step = 100
            setTimeout(() => {
              wx.uploadImage({
                localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  ammeter.img = res.serverId
                }
              })
            }, step)

          }
        })
      }
    },
    changeSortTypeList () {
      let {client, workType, major} = this.jobCard
      if (!client || !major) {
        return
      }
      this.$store.dispatch({
        type: native.doWorkSort,
        client,
        work_type: workType,
        major
      }).then((data) => {
        this.workSortList = data.data
      })
    },
    changePointList () {
      let {client, major} = this.jobCard
      let {provinceName, cityName, districtName} = this.activeAddress
      if (!provinceName || !cityName || !districtName || !client || !major) {
        return
      }
      this.$store.dispatch({
        type: native.doGetWorkBase,
        province: provinceName,
        city: cityName,
        district: districtName,
        client,
        major,
      }).then((data) => {
        let workBase = data.data.work_base
        if (workBase && Array.isArray(workBase)) {
          this.workBaseList = workBase
        }
      })
    },
    handleDelQuestion (question, index) {
      console.log('del 问题')
      this.jobCard.leave.splice(index, 1)
      if (question.id) {
        this.$store.dispatch({
          type: native.doDelQuestion,
          id: question.id
        })
      }
    },
    addQuestion () {
      this.jobCard.leave.push(new Question())
      console.log('添加问题')
    },
    formatTest () {
      // console.log(moment(this.startTime).format('YYYY-MM-DD HH:mm:ss'))
    },
    addAmmeter () {
      this.jobCard.ammeter.push(new Ammeter())
    },
    handleDelAmmeter (ammeter, index) {
      this.jobCard.ammeter.splice(index, 1)
      if (ammeter.id) {
        this.$store.dispatch({
          type: native.doDelAmmeter,
          id: ammeter.id
        })
      }
    }
  },
}
export default fillOrdermixin
