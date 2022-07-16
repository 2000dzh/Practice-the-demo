<!--
 * @Author: 丁子豪
 * @Date: 2022-03-23 11:11:36
 * @LastEditTime: 2022-03-24 19:26:00
 * @LastEditors: 丁子豪
-->
<template>
  <div class="home-category" @mouseleave="categoryId = ''">
    <ul class="menu">
      <li
        v-for="obj in menuList"
        :key="obj.id"
        @mouseenter="displaySecondaryType(obj.id)"
        :class="{ 'active': categoryId === obj.id }"
      >
        <RouterLink :to="`/category/${obj.id}`">{{ obj.name }}</RouterLink>
        <template v-if="obj.children?.length">
          <RouterLink
            v-for="value in obj.children"
            :key="value.id"
            :to="`/category/sub/${value.id}`"
          >{{ value.name }}</RouterLink>
        </template>
        <span v-else>
          <XtxSkeleton
            width="60px"
            height="18px"
            style="margin-right:5px"
            bg="rgba(255,255,255,0.2)"
          />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        分类推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currCategory?.goods?.length">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price">
                <i>¥</i>
                {{ item.price }}
              </p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-if="currCategory?.brands?.length">
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>
                {{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- 左侧分类组件 -->
<script lang="ts" setup name="HomeCategory">
import { reactive, computed, ref } from 'vue'
import { findBrand } from '@/api/home'
import { storeToRefs } from 'pinia'
import { categoryCategoryStore } from '@/store/modules/category'
const categoryStore = categoryCategoryStore()
const { list } = storeToRefs(categoryStore)
// 1. 获取pinia的一级分类，并且只需要两个二级分类
// 2. 需要在组件内部，定义一个品牌数据
// 3. 根据pinia的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
// 4. 进行渲染即可
const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chilren', name: '品牌推荐' }],
  brands: [],
  goods: []
})
interface CHILDREN { id: string, name: string }
interface BRANDS extends CHILDREN {
  picture: string,
  place: string,
  desc: string
}
const menuList = computed(() => {
  const listArr = list.value.map(obj => ({
    id: obj.id,
    name: obj.name,
    children: (obj.children && obj.children.slice(0, 2)) as CHILDREN[],
    goods: obj.goods,
    brands: [] as BRANDS[]
  }))
  listArr.push(brand)
  return listArr
})

//获取品牌推荐数据
const getFindBrand = async (): Promise<void> => {
  const { result } = await findBrand(6)
  brand.brands = result
}
getFindBrand()

//鼠标经过显示二级分类数据
const displaySecondaryType = (id: string) => {
  //防止数据未加载出来,会自动赋值 undefind ,导致全部高亮
  id && (categoryId.value = id)
}

//获取鼠标经过的分类id
const categoryId = ref<null | string>(null)
const currCategory = computed(() => menuList.value.find(obj => obj.id === categoryId.value))
</script>

<style lang="scss" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: $xtxColor;
      }
      &.active {
        background: $xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: $priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>