/*
 * @Author: 丁子豪
 * @Date: 2022-05-31 19:56:28
 * @LastEditTime: 2022-05-31 20:15:06
 * @LastEditors: 丁子豪
 */
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";
import styles from "@/assets/styles/xtx-more.module.scss";

export default defineComponent({
  name: "XtxMore",
  props: {
    path: {
      type: String as PropType<string>,
      default: "/",
    },
  },
  setup(props) {
    const router = useRouter();
    function jump() {
      if (props.path) {
        router.push(props.path);
      }
    }
    return () => (
      <>
        <a href="javascript:;" class={styles["xtx-more"]} onClick={jump}>
          <span>查看全部</span>
          <i class="iconfont icon-angle-right"></i>
        </a>
      </>
    );
  },
});
