// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展


// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
// context函数,会返回一个导入函数, importFn
const importFn = require.context('./', false, /\.vue$/)
//默认图片
import defaultIMg from '@/assets/images/200.png'
import XtxBread from './xtx-bread'
import XtxCheckbox from './xtx-checkbox'
import XtxInfiniteLoading from './xtx-infinite-loading'
import XtxCity from './xtx-city'
import XtxNumbox from './xtx-numbox'
import XtxButton from './xtx-button'
import XtxPagination from './xtx-pagination'
import XtxMore from './xtx-more'
import XtxBreadItem from './xtx-bread-item'
export default {
  install(app: any) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    importFn.keys().forEach(path => {
      // 模块话导入组件,对象里面的 .default属性才是真正的组件
      const component = importFn(path).default
      //竟然没有百度到 vue3 怎么给组件定义name！！！！！！！！！！！！！
      app.component(component.props.name.default, component)
    })
    app.component('XtxBread', XtxBread)
    app.component('XtxCheckbox', XtxCheckbox)
    app.component('XtxInfiniteLoading', XtxInfiniteLoading)
    app.component('XtxCity', XtxCity)
    app.component('XtxNumbox', XtxNumbox)
    app.component('XtxButton', XtxButton)
    app.component('XtxPagination', XtxPagination)
    app.component('XtxMore', XtxMore)
    app.component('XtxBreadItem', XtxBreadItem)
    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
// 指令具有一组生命周期钩子：
const defineDirective = (app: any) => {
  // 1.图片懒加载指令
  // 原理:先存储图片地址不能在src上,当图片进入可视区,将你存储图片的地址设置给图片元素即可
  app.directive('lazy', {
    // Vue2.0 监听使用指令的DOM是否创建好,钩子函数: inserted
    // Vue3.0 的指令拥有的钩子函数和组件的一样,具有生命周期函数 钩子函数: mounted
    mounted(el: HTMLImageElement, binding: any) {
      // 创建一个观察对象,来观察当前使用指令的元素
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        //进入可视区
        if (isIntersecting) {
          //停止观察
          observer.unobserve(el)
          el.onerror = () => {
            //加载失败,使用默认图片
            el.src = defaultIMg
          }
          //赋值
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      //开始监听 dom
      observer.observe(el)
    }
  })
}


// 创建观察对象实例
// const observer = new IntersectionObserver(callback[, options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom