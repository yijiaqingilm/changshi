<template>
    <div class="modals" v-show="showLoading">
        <Spinner class="spinner" :message="loadingMsg" textFgColor="#ffffff"></Spinner>
    </div>
</template>

<script type="text/ecmascript-6">
  import Spinner from 'vue-simple-spinner'

  export default {
    data () {
      return {}
    },
    components: {Spinner},
    computed: {
      showLoading () {
        return this.$store.state.showLoading
      },
      loadingMsg: function () {
        return this.$store.state.loadingMsg
      }
    }

  }
</script>
<style lang="scss" scoped type="text/css">
    @import "loading.scss";
</style>
