<!--
 * @Author: 丁子豪
 * @Date: 2022-03-24 19:55:28
 * @LastEditTime: 2022-03-26 13:21:02
 * @LastEditors: 丁子豪
-->
<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders"  :autoPlay="true"/>
  </div>
</template>

<!-- 首页广告组件 -->
<script lang="ts" setup name="HomeBanner">
import { findBanner } from '@/api/home'
import { ref ,Ref} from 'vue'
const sliders = ref([])
const getFindBannerData = async () => {
  const { result } = await findBanner()
  sliders.value = result
}
getFindBannerData()
</script>

<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
//覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>