<!--
 * @Author: 丁子豪
 * @Date: 2022-07-15 21:25:10
 * @LastEditTime: 2022-07-16 13:14:48
 * @LastEditors: 丁子豪
-->
<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import { AppMain, NavBar, Sidebar } from "./components";
defineOptions({
  name: "Layout",
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .sidebar-container {
    position: fixed;
    width: 210px;
    height: 100%;
    top: 0px;
    left: 0px;
    bottom: 0px;
    background-color: #304156;
    overflow: hidden;
  }
}
</style>
