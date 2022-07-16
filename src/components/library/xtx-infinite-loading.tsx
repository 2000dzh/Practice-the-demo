/*
 * @Author: 丁子豪
 * @Date: 2022-04-09 17:59:41
 * @LastEditTime: 2022-04-26 23:18:11
 * @LastEditors: 丁子豪
 */
//无限加载列表组件
import { ref, defineComponent } from "vue";
import type { PropType } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import styles from "@/assets/styles/xtx-infinite-loading.module.scss";

export default defineComponent({
  name: "XtxInfiniteLoading",
  //父组件传递的函数,需再次声明(tsx)
  emits: ["infinite"],
  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    finished: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { emit }) {
    const container = ref(null);
    useIntersectionObserver(container, ([{ isIntersecting }], dom) => {
      // isIntersecting 加载状态组件是否可见
      if (isIntersecting) {
        //处于加载中,并且还有数据
        if (props.loading === false && props.finished === false) {
          emit("infinite");
        }
      }
    });
    return () => (
      <>
        <div class={styles["xtx-infinite-loading"]} ref={container}>
          {props.loading ? (
            <div class={styles.loading}>
              <span class={styles.img}></span>
              <span class={styles.text}>正在加载...</span>
            </div>
          ) : null}
          {props.finished ? (
            <div class={styles.none}>
              <span class={styles.img}></span>
              <span class={styles.text}>亲，没有更多了</span>
            </div>
          ) : null}
        </div>
      </>
    );
  },
});
