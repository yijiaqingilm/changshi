<template>
  <div class="vdatetime-year-picker">
    <div class="vdatetime-year-picker__list vdatetime-year-picker__list" ref="yearList">
      <div class="vdatetime-year-picker__item" v-for="year in years" @click="select(year.number)" :class="{'vdatetime-year-picker__item--selected': year.selected}">{{ year.number }}</div>
    </div>
  </div>
</template>

<script>
import { years } from './util'

export default {
  props: {
    year: {
      type: Number,
      required: true
    }
  },

  computed: {
    years () {
      return years(this.year).map(year => ({
        number: year,
        selected: year === this.year
      }))
    }
  },

  methods: {
    select (year) {
      this.$emit('change', parseInt(year))
    },

    scrollToCurrent () {
      const selectedYear = this.$refs.yearList.querySelector('.vdatetime-year-picker__item--selected')
      this.$refs.yearList.scrollTop = selectedYear ? selectedYear.offsetTop - 250 : 0
    }
  },

  mounted () {
    this.scrollToCurrent()
  },

  updated () {
    this.scrollToCurrent()
  }
}
</script>

<style>
@import "datetimeYearPicker.scss";
</style>
