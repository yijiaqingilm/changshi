<template>
    <div>
        <f7-popup class="popup-autocomplate">
            <div class="city-navbar">
                <div class="navbar-left">
                    <a href="#" class="link" @click="close">
                        <i class="icon icon-back"></i>
                        <span>返回</span>
                    </a>
                </div>
                <div class="navbar-center">作业点搜索</div>
            </div>
            <form class="searchbar searchbar-init hybrid-background" action="">
                <div class="searchbar-input">
                    <input type="search" @keyup.enter="onSearch" :value="value" @input="updateSearchValue"
                           class="input-search"
                           placeholder="搜索">
                    <a href="#" class="searchbar-clear"></a>
                </div>
                <a href="#" class="searchbar-cancel">关闭</a>
            </form>
            <div class="city-content">
                <f7-list v-if="searchList">
                    <f7-list-item v-for="(row,index) in searchList"
                                  :key="index"
                                  :title="row.work_base"
                                  :value="row.id"
                                  name="workbase"
                                  :checked="value==row.work_base"
                                  @click="selectWorkbase(row)"
                                  radio>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popup>
    </div>
</template>

<script>
  import { globalConst as native, modalTitle } from 'lib/const'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: '',
    props: {
      value: {},
      loadData: {},
    },
    data () {
      return {
        searchList: []
      }
    },
    created () {
    },
    methods: {
      selectWorkbase (row) {
        this.$emit('input', row.work_base)
        this.$emit('change', row)
        this.close()
      },
      updateSearchValue (e) {
        this.$emit('input', e.target.value)
      },
      onSearch () {
        if (this.loadData && Object.prototype.toString.call(this.loadData) === '[object Function]') {
          this.loadData().then(({data}) => {
            this.searchList = data.work_base
          }).catch((error) => {
            this.$f7.alert(error, modalTitle)
          })
        }
      },
      open () {
        this.$f7.popup('.popup-autocomplate')
      },
      close () {
        this.$f7.closeModal('.popup-autocomplate')
        this.$f7.closeModal()
      },
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    computed: {},
  }
</script>

<style lang="scss" scoped type="text/css">

</style>