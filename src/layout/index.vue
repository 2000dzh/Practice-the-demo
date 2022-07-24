<!--
 * @Author: 丁子豪
 * @Date: 2022-07-15 21:25:10
 * @LastEditTime: 2022-07-17 19:16:50
 * @LastEditors: 丁子豪
-->
<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
      </div>
      <AppMain />
    </div>
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
    z-index: 111;
  }
  .main-container {
    position: relative;
    width: calc(100% - 210px);
    height: 100%;
    margin-left: 210px;
    background-color: red;
  }
}
</style>
