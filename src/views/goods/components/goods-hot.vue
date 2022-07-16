<!--
 * @Author: 丁子豪
 * @Date: 2022-05-18 21:39:57
 * @LastEditTime: 2022-07-16 11:47:22
 * @LastEditors: 丁子豪
-->
<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { PropType } from "vue";
import GoodsItem from "@/views/category/components/goods-item.vue";
import { findHotGoods } from "@/api/product";
import { merchandiseGoods } from "@/utils/typeofFile";
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: "GoodsHot",
  },
  type: {
    type: Number as PropType<number>,
    default: 1,
  },
  goodsId: {
    type: String as PropType<string>,
    default: "1",
  },
});
//处理标题
const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
// type A = { [n: string]: string };
// interface TITLE_OBJ {
//   [k: string]: string;
// }
const title = computed(() => {
  if (isVaild(props.type, titleObj)) {
    return titleObj[props.type];
  }
});

function isVaild(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
// typeof 获取 object 变量的属性类型 ==>  {1: string, 2: string, 3: string}
// keyof  操作组成新的联合类型 ==> 1 | 2 | 3
// is 判断 key 是否属于 1 | 2 | 3

//商品列表
const goodsList = ref<merchandiseGoods[]>([]);
const getfindHotGoods = async () => {
  const { result } = await findHotGoods({
    id: props.goodsId,
    type: props.type,
    limit: 3,
  });
  if (result) {
    goodsList.value = result.map((item: merchandiseGoods) => {
      item.tag = item.desc;
      return item;
    });
  }
};
getfindHotGoods();
</script>

<style lang="scss" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  // ::v-deep .goods-item {
  //   background: #fff;
  //   width: 100%;
  //   margin-bottom: 10px;
  //   img {
  //     width: 200px;
  //     height: 200px;
  //   }
  //   p {
  //     margin: 0 10px;
  //   }
  //   &:hover {
  //     transform: none;
  //     box-shadow: none;
  //   }
  // }
}
</style>
