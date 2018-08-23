<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>选择专业级别</f7-nav-center>
        </f7-navbar>
        <section>
            <f7-block-title class="header">{{name}}专业题库</f7-block-title>
            <f7-list>
                <f7-list-item v-for="(level,index) in levelList" @click="chooseLevel(level)" :key="index" link
                              :title="level.name"></f7-list-item>
            </f7-list>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  export default {
    name: '',
    data () {
      return {
        majorId: '',
        categoryId: '',
        name: '',
        levelList: []
      }
    },
    created () {
      this.majorId = this.$route.params.id
      this.categoryId = this.$route.params.typeId
      if (this.$route.options && this.$route.options.query) {
        this.name = this.$route.options.query.name
      }
      this.$store.dispatch({
        type: native.doTrainLevel,
        category: this.categoryId,
        major_id: this.majorId
      }).then(({data}) => {
        this.levelList = data
      })
    },
    computed: {},
    methods: {
      chooseLevel (level) {
        this.$store.commit(native.setCurrentSubject, {
          levelId: level.refid,
          trainType: this.categoryId,
          major: this.majorId
        })
        this.$router.loadPage('/training/answer/begin')
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped type="text/css">
    .header {
        margin: 0;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: #f5f5f5;
    }
</style>