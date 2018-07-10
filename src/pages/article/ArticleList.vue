<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回"></f7-nav-left>
            <f7-nav-center>推荐文章</f7-nav-center>
            <f7-nav-right>
                <img @click="changeModel" src="../../assets/icon_change.png" class="icon" alt="">
            </f7-nav-right>
        </f7-navbar>
        <section>
            <!--<article-list v-if="articleList">
                <article-list-item @click="handleDetail(article)" v-for="(article,index) in articleList" :key="index">
                    <f7-card :title="article.title" :content="article.desc"></f7-card>
                </article-list-item>
            </article-list>-->
            <div v-if="mode">
                <f7-list media-list v-if="articleList">
                    <f7-list-item @click="handleDetail(article)"
                                  v-for="(article,index) in articleList"
                                  :key="index"
                                  :title="article.title"
                                  subtitle=''
                                  :text='article.desc'>
                        <div slot="media">
                            <img :src="mediaImgUrl(article)" class="article_img" alt="">
                        </div>
                    </f7-list-item>
                </f7-list>
            </div>
            <div v-else>
                <div v-if="articleList">
                    <div @click="handleDetail(article)" v-for="(article,index) in articleList" :key="index">
                        <f7-card>
                            <f7-card-header class="card-header">
                                <img :src="mediaBigImgUrl(article)" class="article_big_img" alt="">
                            </f7-card-header>
                            <f7-card-content>
                                {{article.title}}
                            </f7-card-content>
                            <f7-card-footer>{{article.desc}}</f7-card-footer>
                        </f7-card>
                    </div>
                </div>
            </div>
        </section>
        <infinite-loading @infinite="loadData">
            <div slot="no-result">没有文章数据</div>
            <div slot="no-more">没有更多文章</div>
        </infinite-loading>
    </f7-page>
</template>

<script>
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
  import { pageSize } from 'lib/const'
  import ArticleList from 'components/articleList/ArticleList'
  import ArticleListItem from 'components/articleList/chilren/Item'

  export default {
    name: '',
    data () {
      return {
        page: 1,
        articleList: [],
        mode: false
      }
    },
    created () {

    },
    methods: {
      changeModel () {
        this.mode = !this.mode
      },
      mediaImgUrl (article) {
        return article.imgUrl + '?x-oss-process=image/resize,m_lfit,w_50'
      },
      mediaBigImgUrl (article) {
        return article.imgUrl + '?x-oss-process=image/resize,m_lfit,w_200'
      },
      loadData ($state) {
        this.$store.dispatch({
          type: native.doArticleList,
          page: this.page
        }).then(({data}) => {
          console.log('data', data)
          if (Array.isArray(data) && data.length > 0) {
            this.articleList = this.articleList.concat(data)
            $state.loaded()
            this.page += 1
          } else {
            $state.complete()
          }
          if (data.length < pageSize) {
            $state.complete()
          }
        })
      },
      handleDetail (article) {
        console.log('article', article)
        location.href = article.link
      }
    },
    computed: {
      ...mapState({
        userCode: ({auth}) => auth.userCode
      })
    },
    components: {InfiniteLoading, ArticleListItem, ArticleList}
  }
</script>

<style scoped>
    .article_img {
        width: 50px; /*no*/
        height: 50px; /*no*/
    }

    .article_big_img {
        width: 200px; /*no*/
    }

    .card-header {
        justify-content: center;
    }

    .card {
        border-radius: 14px; /*no*/
    }
</style>