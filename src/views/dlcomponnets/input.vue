<!--
 * @Author: 丁子豪
 * @Date: 2022-03-12 23:14:24
 * @LastEditTime: 2022-06-18 22:22:52
 * @LastEditors: 丁子豪
-->
<template>
  <div>
    <el-input
      v-model="input"
      maxlength="1000"
      class="w-50 m-2"
      placeholder="Please input"
      clearable
      @focus="focusFn"
      :suffix-icon="MoreFilled"
      type="textarea"
      show-word-limit
      minlength="10"
      :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
    >
      <template #prefix>
        <el-icon class="el-input__icon"></el-icon>
      </template>
      <template #prepend> 1212 </template>
    </el-input>

    <DlInput
      v-model="input"
      @focus="focusFn"
      clearable
      disabled
      maxlength="10000"
      placeholder="Please input"
      :suffixIcon="MoreFilled"
      minlength="10"
      type="text"
      showWordLimit
      :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
    >
      <template #prefix>
        <el-icon class="el-input__icon"></el-icon>
      </template>
      <template #append> 2121 </template>
      <!-- <template #suffix>
        <CircleClose />
        <component :is="CircleClose" />
      </template> -->
    </DlInput>
    <XtxBreadItem />
    <!-- <button @click="fn">dassasa</button>
    <CircleClose /> -->
    {{ input }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { DlInput } from "@/packages/components";
import {
  DArrowLeft,
  DArrowRight,
  MoreFilled,
  CircleClose,
} from "@element-plus/icons-vue";
const input = ref("");
const age = ref("测试");

const ceshsd = computed(() => {
  const sdad = age.value;
  return sdad;
});
const fn = () => {
  age.value = "212121";
};
const focusFn = (value: any) => {
  console.log(value);
  console.log(input.value);
};
</script>

<style scoped lang="scss"></style>
