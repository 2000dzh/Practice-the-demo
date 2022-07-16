<!--
 * @Author: 丁子豪
 * @Date: 2022-03-23 22:09:55
 * @LastEditTime: 2022-04-23 13:13:17
 * @LastEditors: 丁子豪
-->
<template>
  <div class="xtx-skeleton" :style="{ width, height }" :class="{ shan: animated }">
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>

<script setup lang="ts" name="XtxSkeleton">
import type { PropType } from 'vue'
const props = defineProps({
  width: {
    type: String as PropType<string>,
    default: '100px'
  },
  height: {
    type: String as PropType<string>,
    default: '100px'
  },
  animated: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  bg: {
    type: String as PropType<string>,
    default: '#efefef'
  },
  name: {
    type: String as PropType<string>,
    default: 'XtxSkeleton'
  }
})
</script>

<style lang="scss" scoped>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  animation: fade 1s linear infinite alternate;

  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}

.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%);
    transform: skewX(-45deg);
  }
}

@keyframes shan {
  0% {
    left: -100%;
  }

  100% {
    left: 120%;
  }
}

@keyframes fade {
  from {
    opacity: 0.2;
  }

  to {
    opacity: 1;
  }
}
</style>