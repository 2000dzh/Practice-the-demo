/*
 * @Author: 丁子豪
 * @Date: 2022-03-12 20:11:07
 * @LastEditTime: 2022-07-16 12:14:05
 * @LastEditors: 丁子豪
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/common.scss'
import ui from '@/components/library/index'
//重置样式的包
import 'normalize.css'

createApp(App).use(router).use(store).use(ui).use(ElementPlus).use(createPinia()).mount('#app')
