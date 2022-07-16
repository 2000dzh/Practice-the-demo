<!--
 * @Author: 丁子豪
 * @Date: 2022-03-26 17:48:36
 * @LastEditTime: 2022-03-26 21:07:40
 * @LastEditors: 丁子豪
-->
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a
        @click="toggle(-1)"
        :class="{ disabled: index === 0 }"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="target">
      <Transition>
        <ul
          v-if="data.length"
          class="list"
          :style="{ 'transform': `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in data" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" />
            </RouterLink>
          </li>
        </ul>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup lang="ts" name="HomeBrand">
import HomePanel from './home-panel.vue'
import { ref } from 'vue'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hook/index'

//获取热门品牌数据
const { target, data } = useLazyData(() => findBrand(10))

//切换
const index = ref(0)
const toggle = (num: number) => {
  const newIndex = index.value + num
  if (newIndex < 0 || newIndex > 1) return
  index.value = newIndex
}

</script>

<style lang="scss" scoped>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: $xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>