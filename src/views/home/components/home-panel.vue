<!--
 * @Author: 丁子豪
 * @Date: 2022-03-25 12:29:47
 * @LastEditTime: 2022-04-09 21:25:59
 * @LastEditors: 丁子豪
-->
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}
          <small>{{ subTitle }}</small>
        </h3>
        <slot name="right" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" name="HomePanel">
import type { PropType } from 'vue'
const porps = defineProps({
  title: {
    type: String as PropType<string>,
    default: ''
  },
  subTitle: {
    type: String as PropType<string>,
    default: ''
  }
})
</script>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>