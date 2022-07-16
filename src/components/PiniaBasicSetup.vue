<!--
 * @Author: 丁子豪
 * @Date: 2022-03-12 20:27:15
 * @LastEditTime: 2022-03-20 20:57:42
 * @LastEditors: 丁子豪
-->
<template>
  <div class="box-styl">
    <h1>Setup模式</h1>
    <p class="section-box">
      Pinia的state: count =
      <b>{{ count }}</b>
    </p>
    <p class="section-box">
      Pinia的getters: doubleCount() =
      <b>{{ doubleCount() }}</b>
    </p>
    <div class="section-box">
      <p>Pinia的action: increment()</p>
      <button @click="increment">点我</button>
    </div>
  </div>
</template>

<script setup lang="ts" name="PiniaBasicSetup">
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStoreForSetup } from '@/store/modules/user'
const counterStoreForSetup = useCounterStoreForSetup()
const { count } = storeToRefs(counterStoreForSetup)
const { increment, doubleCount } = counterStoreForSetup
</script>

<style lang="scss" scoped>
.box-styl {
  margin: 10px;
  .section-box {
    margin: 20px auto;
    width: 300px;
    background-color: #d7ffed;
    border: 1px solid #000;
  }
}
</style>
