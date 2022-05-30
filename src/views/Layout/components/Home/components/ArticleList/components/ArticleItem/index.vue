<template>
  <div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="cancelText"
      close-on-click-action
      get-container="body"
      @select="onSelect"
      @cancel="onCancel"
    />
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ art.title }}</span>
          <img
            class="thumb"
            v-if="art.cover.type == 1"
            :src="art.cover.images[0]"
          />
        </div>
        <div v-if="art.cover.type > 1" class="thumb-box">
          <img
            :src="item"
            class="thumb"
            v-for="(item, index) in art.cover.images"
            :key="index"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ art.aut_name }}</span>
            <span>{{ art.comm_count }} 评论</span>
            <span>{{ art.pubdate }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "ArticleItem",
  props: ["art"],
  data() {
    return {
      show: false,
      actions: [{ name: "不感兴趣" }, { name: "反馈垃圾内容" }],
      firstActions: [{ name: "不感兴趣" }, { name: "反馈垃圾内容" }],
      secondActions: [
        {
          value: 0,
          name: "其它问题",
        },
        {
          value: 1,
          name: "标题夸张",
        },
        {
          value: 2,
          name: "低俗色情",
        },
        {
          value: 3,
          name: "错别字多",
        },
        {
          value: 4,
          name: "旧闻重复",
        },
        {
          value: 6,
          name: "内容不实",
        },
        {
          value: 8,
          name: "侵权",
        },
        {
          value: 5,
          name: "广告软文",
        },
        {
          value: 7,
          name: "涉嫌违法犯罪",
        },
      ],
      cancelText: "取消",
    };
  },
  methods: {
    async onSelect(action) {
      if (action.name == "不感兴趣") {
        await this.$API.dislikeArticle({
          target: this.art.art_id,
        });
        Notify({ type: "success", message: "反馈成功" });
      } else if (action.name == "反馈垃圾内容") {
        this.actions = this.secondActions;
        this.cancelText = "返回";
        this.show = true;
      } else {
        this.actions = this.firstActions;
        this.cancelText = "取消";
        await this.$API.reportsArticle({
          target: this.art.art_id,
          type: action.value,
          remark: "举报文章哈哈",
        });
        Notify({ type: "success", message: "举报成功" });
      }
    },
    onCancel() {
      if (this.cancelText == "返回") {
        this.actions = this.firstActions;
        this.cancelText = "取消";
        this.show = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
</style>
