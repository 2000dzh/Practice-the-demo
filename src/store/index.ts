/*
 * @Author: 丁子豪
 * @Date: 2022-03-12 20:15:57
 * @LastEditTime: 2022-03-12 23:59:08
 * @LastEditors: 丁子豪
 */
// import { ref } from 'vue'
// import { defineStore } from 'pinia'

// // 使用setup模式定义
// export const useCounterStoreForSetup = defineStore('counterForSetup', () => {
//   const count = ref<number>(1)
//   function increment () {
//     count.value++
//   }

//   function doubleCount () {
//     return count.value++
//   }

//   return { count, increment, doubleCount }
// })

import { createPinia } from 'pinia'

const store = createPinia()

export default store
