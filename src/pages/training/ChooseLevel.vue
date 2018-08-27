<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>选择专业级别</f7-nav-center>
        </f7-navbar>
        <section>
            <f7-block-title class="header">{{name}}专业题库</f7-block-title>
            <template v-if="currentTrainMode.test">
                <f7-list>
                    <f7-list-item v-for="(level,index) in levelList" @click="chooseLevel(level)" :key="index" link
                                  :title="level.name"></f7-list-item>
                </f7-list>
            </template>
            <template v-else>
               <list>
                   <list-item title="一级" :startTime="2018" :endTime="2019" :limit="60"></list-item>
                   <list-item title="一级" :startTime="2018" :endTime="2019" :limit="60"></list-item>
               </list>
            </template>
        </section>
    </f7-page>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import TestList from 'components/testList/TestList'
  import TestListItem from 'components/testList/TestListItem'

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
    computed: {
      ...mapState({
        currentTrainMode: ({answer}) => answer.currentTrainMode
      })
    },
    methods: {
      chooseLevel (level) {
        this.$store.commit(native.setCurrentSubject, {
          levelId: level.refid,
          trainType: this.categoryId,
          major: this.majorId
        })
        this.$router.loadPage('/training/begin')
      }
    },
    components: {'list': TestList, 'list-item': TestListItem}
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