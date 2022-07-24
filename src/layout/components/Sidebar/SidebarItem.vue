<!--
 * @Author: 丁子豪
 * @Date: 2022-07-15 22:24:42
 * @LastEditTime: 2022-07-19 21:23:14
 * @LastEditors: 丁子豪
-->
<template>
  <div class="sidebar-item" v-if="route && !route.hidden">
    <!-- 当只有一个路由显示 -->
    <template
      v-if="
        hasOneShowingChild(route.children, route) &&
        (onlyOneChil.noShowingChildren || !onlyOneChil.children)
      "
    >
      <router-link v-if="onlyOneChil.meta" :to="resolvePath(onlyOneChil.path)">
        <el-menu-item :index="onlyOneChil.path">
          <el-icon><location /></el-icon>
          <span>
            {{ onlyOneChil.meta.title }}
          </span>
        </el-menu-item>
      </router-link>
    </template>

    <el-sub-menu v-else :index="route.path" ref="subMenu">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <!-- 递归组件 -->
      <SidebarItem
        v-for="child in route.children"
        :key="child.path"
        :route="child"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { baseParse } from "@vue/compiler-dom";

defineOptions({
  name: "SidebarItem",
});

const props = defineProps({
  route: {
    type: Object as PropType<any>,
    requried: true,
  },
});

interface ROUTE {
  hidden?: boolean;
  path: string;
  children?: ROUTE[];
  meta: Object;
}
let onlyOneChil = ref<any>({});
const hasOneShowingChild = (children: ROUTE[] = [], parent: ROUTE) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChil.value = item;
      return true;
    }
  });

  if (showingChildren.length === 0) {
    onlyOneChil.value = {
      ...parent,
      noShowingChildren: true,
    };
    return true;
  }

  if (showingChildren.length === 1) {
    return false;
  }
  return false;
};

const resolvePath = (routePath: string) => {
  console.log(routePath)
  return routePath
};

const fn = (item: any) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
.sidebar-item {
  :deep() .is-active > .el-sub-menu__title {
    color: $subMenuActiveText !important;
  }
}
</style>
