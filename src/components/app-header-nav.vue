<!--
 * @Author: 丁子豪
 * @Date: 2022-03-13 12:33:35
 * @LastEditTime: 2022-07-16 11:35:23
 * @LastEditors: 丁子豪
-->
<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li
      v-for="obj in list"
      :key="obj.id"
      @mousemove="show(obj.id)"
      @mouseleave="hide(obj.id)"
      @click="jump(obj.id)"
    >
      <a href="javascript:;" @click="hide(obj.id)">{{ obj.name }}</a>
      <template v-if="obj.children && obj.children.length">
        <div class="layer" :class="{ opne: obj.open }">
          <ul>
            <li v-for="item in obj.children" :key="item.id" @click.stop="jumpsubLevel(item.id)">
              <a
                href="javascript:;"
                @click="hide(obj.id)"
              >
                <img :src="item.picture" />
                <p>{{ item.name }}</p>
              </a>
            </li>
          </ul>
        </div>
      </template>
    </li>
  </ul>
</template>

<!-- 分类数据展示组件 -->
<script setup lang="ts" name="AppHeaderNav">
import { storeToRefs } from "pinia";
import { categoryCategoryStore } from "@/store/modules/category";
import { useRouter } from "vue-router";
const categoryStore = categoryCategoryStore();
const { show, hide } = categoryStore;
const { list } = storeToRefs(categoryStore);

const router = useRouter();
const jump = (id: string) => {
  router.push(`/category/${id}`);
};
const jumpsubLevel = (id: string) => {
  router.push(`/category/sub/${id}`);
};
</script>

<style scoped lang="scss">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
    .layer {
      &.opne {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: $xtxColor;
        }
      }
    }
  }
}
</style>
