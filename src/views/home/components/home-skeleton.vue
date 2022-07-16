<!--
 * @Author: 丁子豪
 * @Date: 2022-03-26 16:34:57
 * @LastEditTime: 2022-04-09 21:26:03
 * @LastEditors: 丁子豪
-->
<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeSkeleton">
import type { PropType } from 'vue'
const props = defineProps({
  bg: {
    type: String as PropType<string>,
    default: '#fff'
  }
})
</script>

<style lang="scss" scoped>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton{
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>