<!--
 * @Author: 丁子豪
 * @Date: 2022-07-15 21:28:22
 * @LastEditTime: 2022-07-16 13:21:06
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
      >
        <SidebarItem />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SidebarItem from "./SidebarItem.vue";

defineOptions({
  name: "Sidebar",
});

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
