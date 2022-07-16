<!--
 * @Author: 丁子豪
 * @Date: 2022-04-08 20:58:45
 * @LastEditTime: 2022-04-10 12:46:11
 * @LastEditors: 丁子豪
-->
<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          :class="{ active: filterData.selectedBrand === brand.id }"
          href="javasript:;"
          v-for="brand in filterData.brands"
          :key="brand.id"
          @click="changeBrand(brand.id)"
        >{{ brand.name }}</a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <a
          :class="{ active: p.selectedProp === attr.id }"
          href="javasript:;"
          v-for="attr in p.properties"
          :key="attr.id"
          @click="changeAttr(p, attr.id)"
        >{{ attr.name }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script setup lang="ts" >
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
import { id } from 'element-plus/lib/locale';
import { type } from 'os';
const route = useRoute()
const emit = defineEmits(['sort-change'])

const filterLoading = ref(false)
interface PUBLICTYPE {
  id: string,
  name: string
}
interface FILTER_LOADING {
  selectedBrand: string,
  brands: PUBLICTYPE[],
  saleProperties: { id: string, name: string, selectedProp: string, properties: PUBLICTYPE[] }[]
}
const filterData = ref<FILTER_LOADING | null>(null)
interface SALE_PROPERTIES {
  id: string | null
  name: string
  properties: { id: string | null, name: string }[]
  selectedProp: string | null
}
//处理数据
watch(() => route.params.id, async (newVal, oldVal) => {
  if (newVal && route.path === `/category/sub/${newVal}`) {
    filterLoading.value = true
    const { result } = await findSubCategoryFilter(newVal as string)
    result.selectedBrand = null
    result.brands.unshift({ id: null, name: '全部' })
    //销售属性全部
    result.saleProperties.forEach((p: SALE_PROPERTIES) => {
      p.selectedProp = null
      p.properties.unshift({ id: null, name: '全部' })
    })
    filterData.value = result
    filterLoading.value = false
  }
}, { immediate: true })

//获取筛选参数
type FILTER_PARAMS = { attrs: PUBLICTYPE[], brandId: string | null }
const getFilterParams = () => {
  const filterParams: Partial<FILTER_PARAMS> = {}
  const attrs: PUBLICTYPE[] = []
  filterParams.brandId = filterData.value?.selectedBrand
  filterData.value?.saleProperties.forEach(item => {
    const attr = item.properties.find(attr => attr.id === item.selectedProp)
    if (attr?.id) {
      attrs.push(attr)
    }
  })
  if (attrs?.length) filterParams.attrs = attrs
  return filterParams
}

//切换品牌
const changeBrand = (id: string) => {
  if (filterData.value) {
    if (filterData.value.selectedBrand === id) return
    filterData.value.selectedBrand = id
    emit('sort-change', getFilterParams())
  }
}

//切换类目
const changeAttr = (p: SALE_PROPERTIES, id: string) => {
  if (p.selectedProp === id) return
  p.selectedProp = id
  emit('sort-change', getFilterParams())
}
</script>

<style lang="scss" scoped>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>