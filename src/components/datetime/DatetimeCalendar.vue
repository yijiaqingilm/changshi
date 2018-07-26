<template>
    <div class="vdatetime-calendar">
        <div class="vdatetime-calendar__navigation">
            <div class="vdatetime-calendar__navigation--previous" @click="previousMonth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
                    <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10"
                          d="M56.3 97.8L9.9 51.4 56.3 5"/>
                </svg>
            </div>
            <div class="vdatetime-calendar__current--month">{{ newYear }}年{{ monthName }}</div>
            <div class="vdatetime-calendar__navigation--next" @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
                    <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10"
                          d="M56.3 97.8L9.9 51.4 56.3 5"/>
                </svg>
            </div>
        </div>
        <div class="vdatetime-calendar__month">
            <div class="vdatetime-calendar__month__weekday" v-for="weekday in weekdays">{{ weekday }}</div>
            <div class="vdatetime-calendar__month__day" v-for="day in days" @click="selectDay(day)"
                 :class="{'vdatetime-calendar__month__day--selected': day.selected, 'vdatetime-calendar__month__day--disabled': day.disabled}">
                <span><span>{{ day.number }}</span></span>
            </div>
        </div>
    </div>
</template>

<script>
  import { DateTime } from 'luxon'
  import { monthDayIsDisabled, monthDays, months, weekdays } from './util'

  export default {
    props: {
      year: {
        type: Number,
        required: true
      },
      month: {
        type: Number,
        required: true
      },
      day: {
        type: Number,
        default: null
      },
      disabled: {
        type: Array
      },
      minDate: {
        type: DateTime,
        default: null
      },
      maxDate: {
        type: DateTime,
        default: null
      },
      weekStart: {
        type: Number,
        default: 1
      }
    },

    data () {
      return {
        newDate: DateTime.fromObject({year: this.year, month: this.month, timeZone: 'UTC'}),
        weekdays: weekdays(this.weekStart),
        months: months()
      }
    },

    computed: {
      newYear () {
        return this.newDate.year
      },
      newMonth () {
        return this.newDate.month
      },
      monthName () {
        return this.months[this.newMonth - 1]
      },
      days () {
        return monthDays(this.newYear, this.newMonth, this.weekStart).map(day => ({
          number: day,
          selected: day && this.year === this.newYear && this.month === this.newMonth && this.day === day,
          disabled: !day || monthDayIsDisabled(this.minDate, this.maxDate, this.newYear, this.newMonth, day)
        }))
      }
    },

    methods: {
      selectDay (day) {
        if (day.disabled) {
          return
        }

        this.$emit('change', this.newYear, this.newMonth, day.number)
      },
      previousMonth () {
        this.newDate = this.newDate.minus({months: 1})
      },
      nextMonth () {
        this.newDate = this.newDate.plus({months: 1})
      }
    }
  }
</script>

<style>
    @import "datetimeCalendar.scss";
</style>
