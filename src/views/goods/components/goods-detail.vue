<!--
 * @Author: 丁子豪
 * @Date: 2022-05-18 21:52:29
 * @LastEditTime: 2022-05-22 17:02:57
 * @LastEditors: 丁子豪
-->
<template>
  <div class="goods-detail">
    <ul class="attrs">
      <li v-for="item in goods.details?.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { PropType } from "vue";
import { PRODUCT_DETAILS } from "@/utils/typeofFile";
interface DETAILS extends PRODUCT_DETAILS {
  details: { pictures: string[]; properties: { name: string; value: string }[] };
}
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: "GoodsDetail",
  },
  goods: {
    type: Object as PropType<DETAILS>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
