<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在主页和搜索页显示，在登录、注册时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: { Header, Footer },
  mounted() {
    //通知Vuex发送请求，获取数据，存储再仓库中
    //派发一个action获取三级分类的数组
    this.$store.dispatch('categoryList')
  },
}
</script>

<style>
</style>
