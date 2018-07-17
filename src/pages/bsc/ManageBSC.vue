<template>

</template>

<script>
  export default {
    name: '',
    data () {
      return {}
    },
    created () {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: 'red'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销2',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>