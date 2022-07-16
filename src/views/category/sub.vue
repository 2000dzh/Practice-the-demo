<!--
 * @Author: 丁子豪
 * @Date: 2022-03-22 22:26:16
 * @LastEditTime: 2022-04-10 12:19:40
 * @LastEditors: 丁子豪
-->
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @sort-change="changeFilter" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="changeSort" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="SubCategory">
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
import { REQUEST_PRODUCT_LIST_CONDITION } from '@/utils/typeofFile'
// 1. 基础布局
// 2. 无限加载组件
// 3. 动态加载数据且渲染
// 4. 任何筛选条件变化需要更新列表
const route = useRoute()
const loading = ref(false)
const finished = ref(false)
const goodsList = ref<GOODS_LIST[]>([])
interface GOODS_LIST {
  desc: string,
  discount: string | null,
  id: string,
  name: string,
  orderNum: number,
  picture: string,
  price: string
}
// 查询参数
let reqParams: REQ_PARAMS = {
  page: 1,
  pageSize: 20,
  categoryId: ''
}
interface REQ_PARAMS extends Partial<REQUEST_PRODUCT_LIST_CONDITION> {
  page: number,
  pageSize: number,
  categoryId: string
}
//获取列表数据
const getData = async () => {
  loading.value = true
  reqParams.categoryId = route.params.id as string
  const { result } = await findSubCategoryGoods(reqParams)
  if (result.items.length) {
    goodsList.value.push(...result.items)
    reqParams.page++
  } else {
    // 加载完毕
    finished.value = true
    console.log(finished.value)
  }
  // 请求结束
  loading.value = false
}

// 切换二级分类重新加载
watch(() => route.params.id, (newValue) => {
  if (route.path === `/category/sub/${newValue}` && newValue) {
    reqParams.page = 1
    finished.value = false
    goodsList.value = []
    getData()
  }
})

// 监听筛选区改变
const changeFilter = (filterParams: REQUEST_PRODUCT_LIST_CONDITION) => {
  reqParams = { ...reqParams, ...filterParams }
  reqParams.page = 1
  finished.value = false
  goodsList.value = []
  getData()
}
// 监听排序改变
const changeSort = (filterParams: REQUEST_PRODUCT_LIST_CONDITION) => {
  reqParams = { ...reqParams, ...filterParams }
  reqParams.page = 1
  finished.value = false
  goodsList.value = []
  getData()
}
</script>

<style lang="scss" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>