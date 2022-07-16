<!--
 * @Author: 丁子豪
 * @Date: 2022-03-26 13:31:12
 * @LastEditTime: 2022-07-16 12:11:57
 * @LastEditors: 丁子豪
-->
<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative;height: 426px;">
      <Transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup lang="ts" name="HomeNew">
import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findHot } from '@/api/home'
// import { GOODS } from '@/utils/typeofFile'
import { useLazyData } from '@/hook/index'
// const goods = ref<GOODS[]>([])
// const getFindHotData = async () => {
//   const { result } = await findHot()
//   goods.value = result
// }
// getFindHotData()
const { data: goods, target } = useLazyData(findHot)
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    // .hoverShadow();
    @include hoverShadow;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>