<!--
 * @Author: 丁子豪
 * @Date: 2022-04-09 17:02:56
 * @LastEditTime: 2022-07-16 11:56:09
 * @LastEditors: 丁子豪
-->
<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
      >默认排序</a>
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
      >最新商品</a>
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
      >最高人气</a>
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
      >评论最多</a>
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc' }"
        />
        <i
          class="arrow down"
          :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc' }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @custom="handleCustom" v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox @custom="handleCustom" v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { PropType } from 'vue'
import { REQUEST_PRODUCT_LIST_CONDITION } from '@/utils/typeofFile'
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: 'SubSort'
  }
})
const emit = defineEmits(['sort-change'])

// 1. 根据后台需要的参数定义数据对象
// 2. 根据数据对象，绑定组件（复选框，排序按钮）
// 3. 在操作排序组件的时候，需要反馈给数据对象
// sortField====>publishTime,orderNum,price,evaluateNum
// sortMethod====>asc为正序 desc为倒序
const sortParams = reactive<REQUEST_PRODUCT_LIST_CONDITION>({
  inventory: false,
  onlyDiscount: false,
  sortField: null as (null | string),  // publishTime,orderNum,price,evaluateNum
  sortMethod: null as (null | string) // asc为正序 desc为倒序 默认 desc
})
const changeSort = (sortField: null | string) => {
  if (sortField === 'price') {
    sortParams.sortField = sortField
    if (!sortParams.sortMethod) {
      //默认倒序
      sortParams.sortMethod = 'desc'
    } else {
      sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
    }
  } else {
    if (sortParams.sortField === sortField) return
    sortParams.sortField = sortField
    //还原排序状态
    sortParams.sortMethod = null
  }
  emit('sort-change', sortParams)
}
const handleCustom = () => {
  emit('sort-change', sortParams)
}
</script>

<style lang="scss" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: $xtxColor;
        border-color: $xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: $xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: $xtxColor;
          }
        }
      }
    }
  }
  .check {
   :deep() .xtx-checkbox-expose {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>