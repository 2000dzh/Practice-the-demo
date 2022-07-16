<!--
 * @Author: 丁子豪
 * @Date: 2022-05-18 21:10:05
 * @LastEditTime: 2022-05-31 18:49:46
 * @LastEditors: 丁子豪
-->
<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, index) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="[currTagIndex === index ? 'active' : null]"
            @click="changeTag(index)"
          >
            {{ item.title }} {{ `(${item.tagCount})` }}
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <!-- 排序 -->
      <div class="sort">
        <span>排序：</span>
        <a
          @click="changeSort('')"
          href="javascript:;"
          :class="{ active: reqParams.sortField === '' }"
          >默认</a
        >
        <a
          @click="changeSort('praiseCount')"
          href="javascript:;"
          :class="{ active: reqParams.sortField === 'praiseCount' }"
          >最热</a
        >
        <a
          @click="changeSort('createTime')"
          href="javascript:;"
          :class="{ active: reqParams.sortField === 'createTime' }"
          >最新</a
        >
      </div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + '1'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5 - item.score" :key="i + '2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 使用图片预览组件 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i> {{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <XtxPagination
      :pageSize="10"
      :total="reqParams.total"
      :currentPage="reqParams.page"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import type { PropType } from "vue";
import { findCommentInfoByGoods, findGoodsCommentList } from "@/api/product";
import { PRODUCT_DETAILS, COMMENT_LIST, COMMENT_LIST_ITEM } from "@/utils/typeofFile";
import GoodsCommentImage from "./goods-comment-image.vue";
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: "GoodsComment",
  },
  goods: {
    type: Object as PropType<PRODUCT_DETAILS>,
    default: () => ({}),
  },
});
let commentInfo = ref<Partial<COMMENT_INFO>>({});
let currTagIndex = ref(0);
interface COMMENT_INFO {
  salesCount: number;
  praisePercent: number;
  tags: { type: string; title: string; tagCount: number }[];
}
//筛选项
const reqParams = reactive<REQ_PARAMS>({
  page: 1,
  pageSize: 10,
  hasPicture: false,
  tag: "",
  sortField: "",
  total: 1,
});
interface REQ_PARAMS {
  page: number;
  pageSize: number;
  hasPicture: boolean;
  tag: string;
  sortField: string;
  total: number;
}

const getCommentInfo = async () => {
  commentInfo.value = {};
  if (props.goods.id) {
    const { result } = await findCommentInfoByGoods(props.goods.id);
    if (result) {
      result.tags.unshift({
        type: "img",
        title: "有图",
        tagCount: result.hasPictureCount,
      });
      result.tags.unshift({
        type: "all",
        title: "全部评价",
        tagCount: result.evaluateCount,
      });
      commentInfo.value = result;
    }
  }
};
getCommentInfo();

//初始化或者筛选条件变化
const commentList = ref<COMMENT_LIST_ITEM[]>([]);
watch(
  () => reqParams,
  async () => {
    const { result } = await findGoodsCommentList(props.goods.id, reqParams);
    if (result.items) {
      commentList.value = result.items;
      reqParams.total = result.counts;
    }
  },
  { immediate: true, deep: true }
);

const formatSpecs = (specs: { name: string; nameValue: string }[]) => {
  return specs.reduce(
    (sum: string, obj) => (sum += `${obj.name}: ${obj.nameValue} `),
    ""
  );
};
const formatNickname = (nickname: string) => {
  return `${nickname.slice(0, 1)}****${nickname.slice(-1)}`;
};
const changeTag = (i: number) => {
  currTagIndex.value = i;
  //处理筛选项
  if (commentInfo.value.tags?.length) {
    const currTag = commentInfo.value.tags[i];
    if (currTag.type === "all") {
      reqParams.hasPicture = false;
      reqParams.tag = "";
    } else if (currTag.type === "img") {
      reqParams.hasPicture = true;
      reqParams.tag = "";
    } else {
      reqParams.hasPicture = false;
      reqParams.tag = currTag.title;
    }
  }
  reqParams.page = 1;
};

const changeSort = (type: string) => {
  reqParams.sortField = type;
  reqParams.page = 1;
};

const currentChange = (page: number) => {
  reqParams.page = page;
};

const sizeChange = (pageSize: number) => {
  reqParams.pageSize = pageSize
};
</script>

<style lang="scss" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: $priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
            color: $xtxColor;
          }
          &.active {
            border-color: $xtxColor;
            background: $xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: $xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
