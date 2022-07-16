/*
 * @Author: 丁子豪
 * @Date: 2022-05-14 22:39:23
 * @LastEditTime: 2022-05-14 22:57:55
 * @LastEditors: 丁子豪
 */
import { defineComponent } from "vue";
import type { PropType } from "vue";
import styles from "@/assets/styles/xtx-button.module.scss";

export default defineComponent({
  name: 'XtxButton',
  props: {
    size: {
      type: String as PropType<string>,
      default: "middle",
    },
    type: {
      type: String as PropType<string>,
      default: "default",
    },
  },
  setup(props, { slots }) {
    console.log(props.size)
    return () => (
      <>
        <button
          class={[
            styles["xtx-button"],
            styles[props.size],
            styles[props.type],
          ]}
        >
          {
            //默认插槽
            slots.default ? slots.default() : null
          }
        </button>
      </>
    );
  },
});
