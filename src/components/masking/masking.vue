<template>
    <!-- 蒙版 遮罩-->
    <div>
        <transition
                name="my-modal-transition"
                @before-enter="beforeEnter"
                @enter="enter" @leave="leave">
            <div class="mask" v-show="showMask" @click="_click"></div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      showMask: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      _click: function () {
        this.$emit('click')
      },
      beforeEnter (el) {
        el.style.opacity = 0
      }, // Velocity
      enter (el, done) {
        window.Velocity(el, {
          opacity: 0.7,
        }, {complete: done, display: 'block'})
      },
      leave (el, done) {
        window.Velocity(el, {opacity: 0}, {complate: done, display: 'none'})
      }
    }

  }
</script>
<style lang="scss" scoped type="text/css">
    @import "masking.scss";
</style>
