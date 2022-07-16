<!--
 * @Author: 丁子豪
 * @Date: 2022-04-06 20:51:33
 * @LastEditTime: 2022-07-16 12:07:50
 * @LastEditors: 丁子豪
-->
<template>
  <RouterLink :to="`/product/?id=${goods.id}`" class="goods-item">
    <img :src="goods.picture" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.tag }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import { merchandiseGoods } from '@/utils/typeofFile'
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: 'GoodsItem'
  },
  goods: {
    type: Object as PropType<Partial<merchandiseGoods>>,
    default: () => ({})
  }
})
</script>

<style scoped lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  // .hoverShadow();
  @include hoverShadow;
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>