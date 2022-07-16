<!--
 * @Author: 丁子豪
 * @Date: 2022-03-25 12:36:19
 * @LastEditTime: 2022-07-16 12:11:56
 * @LastEditors: 丁子豪
-->
<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <div ref="target" style="position: relative;height: 406px;">
        <Transition name="fade">
          <!-- 面板内容 -->
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/?id=${item.id}`">
                <img :src="item.picture" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script setup lang="ts" name="HomeNew">
import { ref, onMounted } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findNew } from '@/api/home'
// import { useIntersectionObserver } from '@vueuse/core'
import { useLazyData } from '@/hook/index'
//广告图数据
// const goods = ref<GOODS[]>([])
// const getFindNewLsit = async () => {
//   const { result } = await findNew()
//   goods.value = result
//   console.log(goods.value)
// }

//数据懒加载
// const box = ref(null)
// const { stop } = useIntersectionObserver(box, ([{ isIntersecting }]) => {
//   if (isIntersecting) {
//     stop()
//     console.log(isIntersecting)
//     getFindNewLsit()
//   }
// })

//封装
const { target, data: goods } = useLazyData(findNew)

</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // .hoverShadow();
    @include hoverShadow;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: $priceColor;
    }
  }
}
</style>