<template>
    <div class='answer-tab' @click="_click">
        <div class='tab-label'>
            {{label}}
            <template v-if='$slots.default'>
                <slot></slot>
            </template>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      label: String,
      link: {}
    },
    methods: {
      _click () {
        console.log('???>what', this.link)
        if (this.link) {
          console.log('this', this)
          this.$router.loadPage(this.link)
          return
        }
        this.$emit('click')
      }
    },
    name: ''
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "answerTab.scss";
</style>