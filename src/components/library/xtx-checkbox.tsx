/*
 * @Author: 丁子豪
 * @Date: 2022-04-09 16:01:43
 * @LastEditTime: 2022-05-22 19:10:23
 * @LastEditors: 丁子豪
 */
import { defineComponent } from "vue";
import type { PropType } from "vue";
import styles from "@/assets/styles/xtx-checkbox.module.scss";
console.log(styles)
//vue3 v-model ===> :modelValue + @updata:modelValue

export default defineComponent({
  name: "XtxCheckbox",
  emits: ["update:modelValue", "custom"],
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, emit }) {
    const changeChecked = () => {
      emit("update:modelValue", !props.modelValue);
      emit("custom");
    };
    return () => (
      <>
        <div
          class={[styles["xtx-checkbox"], "xtx-checkbox-expose"]}
          onClick={changeChecked}
        >
          {props.modelValue ? (
            <i
              class={[
                styles["icon-checked"],
                "iconfont",
                props.modelValue ? "icon-checked" : "icon-unchecked",
              ]}
            ></i>
          ) : (
            <i
              class={[
                styles["icon-unchecked"],
                "iconfont",
                props.modelValue ? "icon-checked" : "icon-unchecked",
              ]}
            ></i>
          )}
          {
            //使用默认插槽
            slots.default ? <span>{slots.default()}</span> : null
          }
        </div>
      </>
    );
  },
});
