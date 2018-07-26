<template>
    <div class="vdatetime-popup">
        <div class="vdatetime-popup__header">
            <div class="vdatetime-popup__year" @click="showYear">{{ year }}年</div>
            <div class="vdatetime-popup__date">{{ dateFormatted }}</div>
        </div>
        <div class="vdatetime-popup__body">
            <datetime-year-picker
                    v-if="step === 'year'"
                    @change="onChangeYear"
                    :year="year"></datetime-year-picker>
            <datetime-calendar
                    v-if="step === 'date'"
                    @change="onChangeDate"
                    :year="year"
                    :month="month"
                    :day="day"
                    :min-date="minDatetime"
                    :max-date="maxDatetime"
                    :week-start="weekStart"
            ></datetime-calendar>
            <datetime-time-picker
                    v-if="step === 'time'"
                    @change="onChangeTime"
                    :hour="hour"
                    :minute="minute"
                    :use12-hour="use12Hour"
                    :hour-step="hourStep"
                    :minute-step="minuteStep"
                    :min-time="minTime"
                    :max-time="maxTime"></datetime-time-picker>
        </div>
        <div class="vdatetime-popup__actions">
            <div class="vdatetime-popup__actions__button vdatetime-popup__actions__button--cancel" @click="cancel">{{
                phrases.cancel }}
            </div>
            <div class="vdatetime-popup__actions__button vdatetime-popup__actions__button--confirm" @click="confirm">{{
                phrases.ok }}
            </div>
        </div>
    </div>
</template>

<script>
  import { DateTime } from 'luxon'
  import moment from 'lib/moment'
  import 'lib/moment/locale/zh-cn'
  import { createFlowManagerFromType } from './util'
  import DatetimeCalendar from './DatetimeCalendar'
  import DatetimeTimePicker from './DatetimeTimePicker'
  import DatetimeYearPicker from './DatetimeYearPicker'

  DateTime.local().setLocale('zh')
  const KEY_TAB = 9
  const KEY_ENTER = 13
  const KEY_ESC = 27

  export default {
    components: {
      DatetimeCalendar,
      DatetimeTimePicker,
      DatetimeYearPicker
    },

    props: {
      datetime: {
        type: DateTime,
        required: true
      },
      phrases: {
        type: Object,
        default () {
          return {
            cancel: 'Cancel',
            ok: 'Ok'
          }
        }
      },
      type: {
        type: String,
        default: 'date'
      },
      use12Hour: {
        type: Boolean,
        default: false
      },
      hourStep: {
        type: Number,
        default: 1
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      minDatetime: {
        type: DateTime,
        default: null
      },
      maxDatetime: {
        type: DateTime,
        default: null
      },
      auto: {
        type: Boolean,
        default: false
      },
      weekStart: {
        type: Number,
        default: 1
      }
    },

    data () {
      const flow = createFlowManagerFromType(this.type)

      return {
        newDatetime: this.datetime,
        flow: flow,
        step: flow.first(),
        timePartsTouched: []
      }
    },

    created () {
      document.addEventListener('keydown', this.onKeyDown)
    },

    beforeDestroy () {
      document.removeEventListener('keydown', this.onKeyDown)
    },

    computed: {
      year () {
        return this.newDatetime.year
      },
      month () {
        return this.newDatetime.month
      },
      day () {
        return this.newDatetime.day
      },
      hour () {
        return this.newDatetime.hour
      },
      minute () {
        return this.newDatetime.minute
      },
      dateFormatted () {
        console.log('this.nowDate', this.newDatetime)
        return moment(this.newDatetime.toJSDate()).format('MM月DD日')
        /* return this.newDatetime.toLocaleString({
          month: 'long',
          day: 'numeric'
        })*/
      },
      minTime () {
        return (
          this.minDatetime &&
          this.minDatetime.year === this.year &&
          this.minDatetime.month === this.month &&
          this.minDatetime.day === this.day
        ) ? this.minDatetime.toFormat('HH:mm') : null
      },
      maxTime () {
        return (
          this.maxDatetime &&
          this.maxDatetime.year === this.year &&
          this.maxDatetime.month === this.month &&
          this.maxDatetime.day === this.day
        ) ? this.maxDatetime.toFormat('HH:mm') : null
      }
    },

    methods: {
      nextStep () {
        this.step = this.flow.next(this.step)
        this.timePartsTouched = []

        if (this.step === 'end') {
          this.$emit('confirm', this.newDatetime)
        }
      },
      showYear () {
        this.step = 'year'
        this.flow.diversion('date')
      },
      confirm () {
        this.nextStep()
      },
      cancel () {
        this.$emit('cancel')
      },
      onChangeYear (year) {
        this.newDatetime = this.newDatetime.set({year})

        if (this.auto) {
          this.nextStep()
        }
      },
      onChangeDate (year, month, day) {
        this.newDatetime = this.newDatetime.set({year, month, day})

        if (this.auto) {
          this.nextStep()
        }
      },
      onChangeTime ({hour, minute, suffixTouched}) {
        if (suffixTouched) {
          this.timePartsTouched['suffix'] = true
        }

        if (Number.isInteger(hour)) {
          this.newDatetime = this.newDatetime.set({hour})
          this.timePartsTouched['hour'] = true
        }

        if (Number.isInteger(minute)) {
          this.newDatetime = this.newDatetime.set({minute})
          this.timePartsTouched['minute'] = true
        }

        const goNext = this.auto && this.timePartsTouched['hour'] && this.timePartsTouched['minute'] && (
          this.timePartsTouched['suffix'] ||
          !this.use12Hour
        )

        if (goNext) {
          this.nextStep()
        }
      },
      onKeyDown (event) {
        switch (event.keyCode) {
          case KEY_ESC:
          case KEY_TAB:
            this.cancel()
            break

          case KEY_ENTER:
            this.nextStep()
            break
        }
      }
    }
  }
</script>

<style>
    @import "datetimePopup.scss";
</style>
