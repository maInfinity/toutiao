<template>
  <div>
    <van-nav-bar fixed>
      <template #left>
        <img class="logo" src="@/assets/toutiao_logo.png" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="white" />
      </template>
    </van-nav-bar>
    <div class="content">
      <van-tabs
        v-model="channel_id"
        color="#007bff"
        sticky
        animated
        offset-top="1.226667rem"
      >
        <van-tab
          :title="channel.name"
          v-for="channel in channelsList"
          :key="channel.id"
          :name="channel.id"
        >
          <ArticleList :channel_id="channel.id"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ArticleList from "./components/ArticleList";
export default {
  name: "Home",
  components: {
    ArticleList,
  },
  data() {
    return {
      channel_id: 0,
      channelsList: [],
    };
  },
  async created() {
    // 获得用户频道数据
    let res = await this.$API.userChannels();
    this.channelsList = res.data.channels;
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
.content {
  padding-top: 44px;
}
</style>