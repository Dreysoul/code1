<template>
  <div id="app">
    <ToopBar></ToopBar>
    <!-- 头部 -->
    <Head></Head>
    <router-view />
    <!-- 底部页面 -->
    <Footer></Footer>
    <!-- 登陆页面 -->
    <!-- v-show="showLoginModel" 从vuex中取数据 -->
    <myLogin v-show="showLoginModel"></myLogin>
  </div>
</template>
<script>
import ToopBar from '@/components/ToopBar.vue'
import Head from '@/components/Head.vue'
import Footer from '@/components/Footer.vue'
import myLogin from '../src/views/myLogin'
import { mapState } from 'vuex'
export default {
  components: {
    ToopBar, Head, Footer, myLogin
  },
  //  修改vuex中的数据
  computed: {
    // 方式二
    // showLoginModel () {
    //   return this.$store.state.showLoginModel
    // }
    // 方式三
    ...mapState(['showLoginModel'])
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
