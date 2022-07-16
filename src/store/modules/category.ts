/*
 * @Author: 丁子豪
 * @Date: 2022-03-13 12:40:25
 * @LastEditTime: 2022-05-31 20:45:05
 * @LastEditors: 丁子豪
 */
import { defineStore } from 'pinia'
// 存储的分类数据
import { topCategory } from '@/utils/constants'
import { findAllCategory } from '@/api/category'
export interface List {
  id: string,
  name: string,
  picture: string,
  goods: GOODS[],
  children: List[],
  open: boolean,
  brands?: []
}

interface GOODS {
  desc: string,
  id: string,
  name: string,
  picture: string,
  price: string
}

interface CityData {
  name: string
  code: string
  level: number
  areaList: CityData[]
}

export const categoryCategoryStore = defineStore({
  id: 'category',
  state: () => {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: (topCategory.map(item => ({ name: item }))) as List[],
      cityData: [] as CityData[]
    }
  },
  actions: {
    setList(headCategory: List[]) {
      this.list = headCategory
    },
    async getList(): Promise<void> {
      try {
        const { result } = await findAllCategory()
        //给一级分类数据,加上一个控制二级分类显示隐藏的变量
        result.forEach((item: List) => item.open = false)
        this.setList(result)
      } catch (err) {
        console.log(err)
      }
    },
    //控制二级分类数据的显示隐藏
    show(id: string) {
      const obj = this.list.find((item: List) => item.id === id)
      if (obj?.id) obj.open = true
    },
    hide(id: string) {
      const obj = this.list.find((item: List) => item.id === id)
      if (obj?.id) obj.open = false
    },
    setcityData(arr: CityData[]) {
      this.cityData = arr
    }
  }
})