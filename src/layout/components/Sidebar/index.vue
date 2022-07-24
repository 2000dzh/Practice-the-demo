<!--
 * @Author: 丁子豪
 * @Date: 2022-07-15 21:28:22
 * @LastEditTime: 2022-07-19 21:27:29
 * @LastEditors: 丁子豪
-->
<template>
  <div class="sidebar">
    <el-scrollbar>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
      >
        <SidebarItem
          v-for="route in realRoutingAddress"
          :key="route.path"
          :route="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/assets/styles/variables.scss";
import manageRouter from "@/router/modules/manage"; //管理系统
import { RouteRecordRaw } from "vue-router";
defineOptions({
  name: "Sidebar",
});

const permission_routes = ref<PERMISSION_ROUTES[]>([
  {
    path: "/13434434",
    children: [
      {
        hidden: true,
        path: "23435643",
        meta: {},
      },
      {
        path: "12121212234423",
        meta: {},
      },
    ],
  },
  {
    path: "/dzh",
    children: [
      {
        path: "121",
        meta: {},
      },
    ],
  },
  {
    path: "/asdas",
  },
]);
interface PERMISSION_ROUTES {
  hidden?: boolean;
  path: string;
  children?: PERMISSION_ROUTES[];
  meta?: any;
}

let str = "";
let realRoutingAddress: Array<RouteRecordRaw> = JSON.parse(
  JSON.stringify(manageRouter)
);
const routeLsit = (arr: Array<RouteRecordRaw>) => {
  arr.forEach((route) => {
    if (route.children?.length) {
      route.children.map((item, index) => {
        str = `${route.path}/${item.path}`;
        item.path = str;
        if (item.children?.length) {
          route.children && routeLsit([route.children[index]]);
        }
      });
    }
    str = "";
  });
};
routeLsit(realRoutingAddress);
console.log(manageRouter);

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.sidebar {
  :deep() .el-menu {
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgb(48, 65, 86);
  }
}
</style>
