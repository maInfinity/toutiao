<template>
  <div>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItem
          v-for="art in articlesList"
          :key="art.art_id"
          :art="art"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "./components/ArticleItem";
import { timeAgo } from "@/utils/date";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  data() {
    return {
      articlesList: [],
      isRefresh: false,
      loading: false,
      finished: false,
      pre_timestamp: 0,
    };
  },
  props: ["channel_id"],
  async created() {
    this.getArticles(this.channel_id);
  },
  methods: {
    async getArticles(channel_id, timestamp = Date.now()) {
      try {
        let res = await this.$API.channelArticles(channel_id, timestamp);
        if (!res.data.pre_timestamp) {
          this.finished = true;
        } else {
          res.data.results.forEach((item) => {
            item.pubdate = timeAgo(item.pubdate);
          });
          this.articlesList = [...this.articlesList, ...res.data.results];
          this.pre_timestamp = res.data.pre_timestamp;
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    onLoad() {
      this.getArticles(this.channel_id, this.pre_timestamp);
    },
    async onRefresh() {
      this.articlesList = []
      this.getArticles(this.channel_id)
      this.isRefresh = false;
    },
  },
};
</script>

<style>
</style>