<!--
 * @Author: 丁子豪
 * @Date: 2022-04-08 20:31:58
 * @LastEditTime: 2022-04-08 20:57:42
 * @LastEditors: 丁子豪
-->
<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem
      v-if="category?.top?.name"
      :to="`/category/?id=${category.top.id}`"
    >{{ category.top.name }}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem
        v-if="category?.sub?.name"
        :to="`/category/sub/${category.sub.id}`"
        :key="category.sub.id"
      >{{ category.sub.name }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { categoryCategoryStore } from '@/store/modules/category'
const categoryStore = categoryCategoryStore()
const { list } = storeToRefs(categoryStore)
const route = useRoute()

interface classification<T> {
  sub: T
  top: T
}
const category = computed(() => {
  const obj: Partial<classification<{ name: string, id: string }>> = {}
  list.value.forEach(top => {
    top.children && top.children.find(sub => {
      if (sub.id === route.params.id) {
        //设置二级类目
        obj.sub = { id: sub.id, name: sub.name }
        //设置一级类目
        obj.top = { id: top.id, name: top.name }
      }
    })
  })
  return obj
})
</script> 

<style lang="scss" scoped>
</style>