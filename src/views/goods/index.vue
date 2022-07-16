<!--
 * @Author: 丁子豪
 * @Date: 2022-04-10 18:26:21
 * @LastEditTime: 2022-05-22 17:00:48
 * @LastEditors: 丁子豪
-->
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread v-if="goods.categories?.length">
        <XtxBreadItem to="/">首页1</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/'">{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览组件 -->
          <GoodsImage :images="goods.mainPictures" />
          <!-- 商品收藏等信息 -->
          <GoodsSales :goods="goods" />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" v-model:age.capitalize="num" @change="changeSku" />
          <!-- 数量组件 -->
          <XtxNumbox v-model:modeValue="num" label="数量" :max="goods.inventory" />
          <XtxButton :type="'primary'">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { findGoods } from "@/api/product";
import { PRODUCT_DETAILS } from "@/utils/typeofFile";
import GoodsRelevant from "./components/goods-relevant.vue";
import GoodsImage from "./components/goods-image";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsTabs from "./components/goods-tabs.vue";
import GoodsHot from "./components/goods-hot.vue";
import GoodsWarn from "./components/goods-warn.vue";
const route = useRoute();
let num = ref<number>(1);
//商品详情数据
let goods = ref<Partial<PRODUCT_DETAILS>>({});
//监听商品id的变化,获取商品详情
watch(
  () => route.query.id,
  async (newValue) => {
    if (newValue && route.fullPath === `/product/?id=${newValue}`) {
      const { result } = await findGoods(newValue as string);
      //还原状态
      goods.value = {};
      nextTick(() => {
        goods.value = result;
      });
    }
  },
  { immediate: true }
);
interface CHANGE_SKU {
  inventtory: number;
  oldPrice: string;
  price: string;
  skuId: string;
  specsText: string;
}
const changeSku = (sku: CHANGE_SKU) => {
  //客户选择的商品信息
  console.log(sku);
  if (sku.skuId && goods.value) {
    goods.value.price = sku.price;
    goods.value.oldPrice = sku.oldPrice;
    goods.value.inventory = sku.inventtory;
  }
};
</script>

<style scoped lang="scss">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.xtxButton {
  margin-top: 20px;
}
</style>
