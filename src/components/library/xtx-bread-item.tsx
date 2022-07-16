/*
 * @Author: 丁子豪
 * @Date: 2022-05-31 20:05:48
 * @LastEditTime: 2022-06-07 20:23:24
 * @LastEditors: 丁子豪
 */
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "XtxBreadItem",
  props: {
    to: {
      type: [String, Object] as PropType<string | Object>,
      requried: true,
    },
  },
  setup(props, { slots }) {
    const router = useRouter();
    function jump() {
      if (props.to) {
        router.push(props.to);
      }
    }
    return () => (
      <div class="xtx-bread-item">
        {props.to ? (
          <a href="javascript:;" onClick={jump}>
            {slots.default ? slots.default() : null}
          </a>
        ) : (
          <span>{slots.default ? slots.default() : null}</span>
        )}
        <i class="iconfont icon-angle-right"></i>
      </div>
    );
  },
});
