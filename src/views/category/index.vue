<!--
 * @Author: 丁子豪
 * @Date: 2022-03-22 22:24:34
 * @LastEditTime: 2022-05-31 21:02:09
 * @LastEditors: 丁子豪
-->
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem to="/">{{ topCategory.name }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="TopCategory">
import { findBanner } from "@/api/home";
import { findTopCategory } from "@/api/category";
import { ref, computed, watch } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";
import { categoryCategoryStore } from "@/store/modules/category";
import GoodsItem from "./components/goods-item.vue";
import { List, CLASSIFIED_GOODS } from "@/utils/typeofFile";
const route = useRoute();

const title = ref("");
//获取轮播图数据
const sliders = ref([]);
const getFindBannerDate = async () => {
  const { result } = await findBanner();
  sliders.value = result;
};
getFindBannerDate();

// 面包屑+所有分类
const categoryStore = categoryCategoryStore();
const { list } = storeToRefs(categoryStore);
const topCategory = computed(() => {
  let cate = {};
  const item = list.value.find((obj) => obj.id == route.params.id);
  if (item) cate = item;
  //指定类型
  return cate as List;
});

//推荐商品
// Partial 用于将一个类型中的所有属性转变为可选属性
// type Partial<T> = { [P in keyof T]?: T[P]; }
const subList = ref([] as Partial<CLASSIFIED_GOODS>[]);
const getSubList = async () => {
  const { result } = await findTopCategory(route.params.id as string);
  if (result?.children?.length) {
    subList.value = result.children;
  }
};
watch(
  () => route.params.id,
  (value) => {
    if (value && `/category/${value}` === route.path) {
      getSubList();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
