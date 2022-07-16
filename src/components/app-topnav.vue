<!--
 * @Author: 丁子豪
 * @Date: 2022-03-12 23:33:23
 * @LastEditTime: 2022-05-31 18:58:34
 * @LastEditors: 丁子豪
-->
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-user"></i>
            {{ profile.account }}
          </a>
        </li>
        <li>
          <a href="javascript:;">退出登录</a>
        </li>
        <li>
          <RouterLink to="/login">请先登录</RouterLink>
        </li>
        <li>
          <a href="javascript:;">免费注册</a>
        </li>
        <li>
          <a href="javascript:;">我的订单</a>
        </li>
        <li>
          <a href="javascript:;">会员中心</a>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;"> <i class="iconfont icon-phone"></i>手机版 </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<!-- 顶部通栏 -->
<script setup lang="ts" name="AppTopnav">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
</script>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: $xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
