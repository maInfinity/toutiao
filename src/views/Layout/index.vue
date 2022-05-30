<template>
  <div>
    <div class="routerview_container">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="less" scoped>
.routerview_container {
  padding-bottom: 50px;
}
</style>