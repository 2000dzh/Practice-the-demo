<!--
 * @Author: 丁子豪
 * @Date: 2022-04-10 18:28:54
 * @LastEditTime: 2022-05-18 20:56:23
 * @LastEditors: 丁子豪
-->
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders" style="height: 380px" auto-play />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import { findRelGoods } from "@/api/product";
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: "GoodsRelevant",
  },
  goodsId: {
    type: String as PropType<string>,
    default: "",
  },
});
const sliders = ref<any>([]);
const useRelGoodsData = async () => {
  if (props.goodsId) {
    const res = await findRelGoods(props.goodsId);
    const size = 4;
    const total = Math.ceil(res.result.length / size);
    for (let i = 0; i < total; i++) {
      sliders.value.push(res.result.slice(i * size, (i + 1) * size));
    }
  }
};
useRelGoodsData();
</script>

<style scoped lang="scss">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid $xtxColor;
      border-right: 4px solid $xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten($xtxColor, 40%);
      }
    }
  }
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: $xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
