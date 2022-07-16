/*
 * @Author: 丁子豪
 * @Date: 2022-05-14 22:05:26
 * @LastEditTime: 2022-05-14 22:39:17
 * @LastEditors: 丁子豪
 */
import { defineComponent } from "vue";
import type { PropType } from "vue";
import styles from "@/assets/styles/xtx-numbox.module.scss";

export default defineComponent({
  name: "XtxNumbox",
  emits: ['update:modeValue'],
  props: {
    label: {
      type: String as PropType<string>,
      default: "",
    },
    modeValue: {
      type: Number as PropType<number>,
      default: 1,
    },
    min: {
      type: Number as PropType<number>,
      default: 1,
    },
    max: {
      type: Number as PropType<number>,
      default: 100,
    },
  },
  setup(props,{emit}) {
    const changeNum = (value: number) => {
      const newValue = props.modeValue + value
      if(newValue < props.min || newValue > props.max) return
      emit('update:modeValue',newValue)
    };
    return () => (
      <>
        <div class={styles["xtx-numbox"]}>
          <div class={styles.label}>数量</div>
          <div class={styles.numbox}>
            <a href="javascript:;" onClick={() => changeNum(-1)}>
              -
            </a>
            <input type="text" readonly value={props.modeValue} />
            <a href="javascript:;" onClick={() => changeNum(1)}>
              +
            </a>
          </div>
        </div>
      </>
    );
  },
});
