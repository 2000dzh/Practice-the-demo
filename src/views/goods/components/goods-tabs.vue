<!--
 * @Author: 丁子豪
 * @Date: 2022-05-18 20:57:07
 * @LastEditTime: 2022-05-30 21:54:08
 * @LastEditors: 丁子豪
-->
<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        :class="{ active: activeName === 'GoodsDetial' }"
        @click="activeName = 'GoodsDetial'"
        >商品详情</a
      >
      <a
        href="javascript:;"
        :class="{ active: activeName === 'GoodsComment' }"
        @click="activeName = 'GoodsComment'"
      >
        商品评价
        <span>({{ goods.commentCount }})</span>
      </a>
    </nav>
    <el-pagination
      :page-size="10"
      :pager-count="7"
      layout="prev, pager, next"
      :total="86"
    />
    <!-- 切换内容的地方 -->
    <component :is="dynamicComponents" :goods="goods"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, Prop } from "vue";
import type { PropType } from "vue";
import GoodsDetail from "./goods-detail.vue";
import GoodsComment from "./goods-comment.vue";
import { PRODUCT_DETAILS } from "@/utils/typeofFile";
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: "GoodsTabs",
  },
  goods: {
    type: Object as PropType<Partial<PRODUCT_DETAILS>>,
    default: "",
  },
});
const activeName = ref("GoodsDetial");
//动态切换组件
const dynamicComponents = computed(() =>
  activeName.value === "GoodsDetial" ? GoodsDetail : GoodsComment
);
</script>

<style lang="scss" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: $xtxColor;
        }
      }
    }
  }
}
</style>
