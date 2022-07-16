/*
 * @Author: 丁子豪
 * @Date: 2022-03-27 17:08:03
 * @LastEditTime: 2022-05-31 20:28:35
 * @LastEditors: 丁子豪
 */

import { h, useSlots, defineComponent } from "vue";
//解决 tsx 直接引入 css 文件,可能导致的类名污染的问题
import "@/assets/styles/xtx-bread.module.scss";

//render 函数写法
// export default defineComponent({
//   render(context: any) {
//     const items = context.$slots.default();
//     const dymanicItems: any = [];
//     items.forEach((v: dymanicItems.length - 1H{TMLElement, index: number) => {
//       dymanicItems.push(v);
//       if (index < items.length - 1) {
//         dymanicItems.push(h("i", { class: "iconfont icon-angle-right" }));
//       }
//     });
//     return h("div", { class: "xtx-bread" }, dymanicItems);
//   },
//   setup(props, { slots }: any) {},
// });

//使用jsx
export default defineComponent({
  name: "XtxBread",
  setup(props, { slots }: any) {
    const items = slots.default();
    return () => (
      <>
        {/* <div class="xtx-bread">{items.map((item: HTMLElement, index: number) => item)}</div> */}
        <div class="xtx-bread">
          {items.map((item: HTMLElement, index: number) => item)}
        </div>
      </>
    );
  },
});
