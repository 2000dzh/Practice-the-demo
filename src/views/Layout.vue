<!--
 * @Author: 丁子豪
 * @Date: 2022-03-12 23:14:24
 * @LastEditTime: 2022-06-18 22:25:06
 * @LastEditors: 丁子豪
-->
<template>
  <!-- 顶部通栏 -->
  <AppTopnav />
  <!-- 头部组件 -->
  <AppHeader />
  <!-- 吸顶头部 -->
  <AppHeaderSticky />
  <!-- 二级路由 -->
  <RouterView />
  <AppFooter />
</template>

<script setup lang="ts" name="XtxLayout">
import AppTopnav from "@/components/app-topnav.vue";
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";
import AppHeaderSticky from "@/components/app-header-sticky.vue";
// 获取下拉分类数据
import { categoryCategoryStore } from "@/store/modules/category";
const categoryStore = categoryCategoryStore();
const { getList } = categoryStore;
getList();
</script>

<style scoped lang="scss">
.app-body {
  min-height: 600px;
}
</style>
