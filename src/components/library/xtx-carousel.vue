<!--
 * @Author: 丁子豪
 * @Date: 2022-03-24 19:52:05
 * @LastEditTime: 2022-05-18 20:54:53
 * @LastEditors: 丁子豪
-->
<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li
          class="carousel-item"
          v-for="(obj, i) in (sliders as SLIDERS[])"
          :key="obj.id"
          :class="{ fade: index === i }"
        >
          <RouterLink v-if="obj.hrefUrl" :to="obj.hrefUrl">
            <img :src="obj.imgUrl" />
          </RouterLink>
          <div v-else class="slider">
            <RouterLink
              v-for="goods in (obj as SLIDERS[])"
              :key="goods.id"
              :to="`/product/?id=${goods.id}`"
            >
              <img :src="goods.picture" alt="" />
              <p class="name ellipsis">{{ goods.name }}</p>
              <p class="price">&yen;{{ goods.price }}</p>
            </RouterLink>
          </div>
        </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div class="carousel-indicator">
      <span
        v-for="(item, k) in (sliders as SLIDERS[])"
        :key="item.id"
        @click="index = k"
        :class="{ active: k === index }"
      ></span>
    </div>
  </div>
</template>

<!-- 轮播图组件 -->
<script setup lang="ts" name="XtxCarousel">
import { ref, watch, onMounted } from "vue";
import type { PropType } from "vue";
interface SLIDERS {
  hrefUrl: string;
  id: string;
  imgUrl: string;
  type: string;
  picture: string;
}
const props = defineProps({
  name: {
    type: String,
    default: "XtxCarousel",
  },
  //轮播图数据
  sliders: {
    // 模版使用 as 类型断言,区分二维数组
    type: Array as PropType<SLIDERS[] | SLIDERS[][]>,
    default: [],
  },
  //时间间隔
  duration: {
    type: Number as PropType<number>,
    default: 3000,
  },
  autoPlay: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

// 默认显示的图片的索引
const index = ref(0);
// 自动播放
let time: number = 0;
const autoPlayFn = () => {
  clearInterval(time);
  time = window.setInterval(() => {
    index.value++;
    if (index.value >= props.sliders.length) {
      index.value = 0;
    }
  }, props.duration);
};
watch(
  () => props.sliders,
  (newValue) => {
    //有数据开启自动播放
    if (props.sliders.length && props.autoPlay) {
      index.value = 0;
      autoPlayFn();
    }
  },
  {
    immediate: true,
  }
);

//// 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
const stop = () => {
  if (time) clearInterval(time);
};
const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlayFn();
  }
};

//手动切换
const toggle = (num: number) => {
  const newIndex = index.value + num;
  if (newIndex < 0) {
    index.value = props.sliders.length - 1;
    return;
  }
  if (newIndex >= props.sliders.length) {
    index.value = 0;
    return;
  }
  index.value = newIndex;
};

//销毁定时器
onMounted(() => {
  clearInterval(time);
});
</script>

<style lang="scss" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
      // 轮播商品
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: $priceColor;
            margin-top: 15px;
          }
        }
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
