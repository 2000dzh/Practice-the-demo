/*
 * @Author: 丁子豪
 * @Date: 2022-04-15 20:41:56
 * @LastEditTime: 2022-07-16 11:28:53
 * @LastEditors: 丁子豪
 */
import { defineComponent, ref, reactive, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
import type { PropType } from "vue";
import styles from "@/assets/styles/goods-image.module.scss";

export default defineComponent({
  name: "GoodsImage",
  props: {
    images: {
      type: Array as unknown as PropType<string[]>,
      default: [],
    },
  },
  setup(props) {
    //当前预览图的索引
    let currIndex = ref<number>(0);
    //被观察的DOM
    const target = ref(null);
    //是否显示遮罩和大图
    const show = ref(false);
    //遮罩层图标
    const layerPosition = reactive({
      left: "0",
      top: "0",
    });
    //大图背景定位
    const largePosition = reactive({
      backgroundPositionX: "0",
      backgroundPositionY: "0",
    });
    //使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
    // elementX 鼠标基于容器左上角X轴偏移
    // elementY 鼠标基于容器左上角Y轴偏移
    // isOutside 鼠标是否在模板容器外
    const { elementX, elementY, isOutside } = useMouseInElement(target);
    watch([elementX, elementY, isOutside], () => {
      show.value = !isOutside.value;
      //计算遮罩层的坐标
      const position = { x: 0, y: 0 };
      switch (true) {
        case elementX.value < 100:
          position.x = 0;
          break;
        case elementX.value > 300:
          position.x = 200;
          break;
        default:
          position.x = elementX.value - 100;
          break;
      }
      switch (true) {
        case elementY.value < 100:
          position.y = 0;
          break;
        case elementY.value > 300:
          position.y = 200;
          break;
        default:
          position.y = elementY.value - 100;
          break;
      }
      //样式赋值
      layerPosition.left = position.x + "px";
      layerPosition.top = position.y + "px";
      largePosition.backgroundPositionX = -2 * position.x + "px";
      largePosition.backgroundPositionY = -2 * position.y + "px";
    });
    return () => (
      <>
        <div class={styles["goods-image"]}>
          <div
            class={styles["large"]}
            v-show={show.value}
            style={{
              backgroundImage: `url(${props.images[currIndex.value]})`,
              ...largePosition,
            }}
          ></div>
          <div ref={target} class={styles.middle}>
            <img src={props.images[currIndex.value]} alt="" />
            <div
              class={styles.layer}
              v-show={show.value}
              style={layerPosition}
            ></div>
          </div>
          <ul class={styles.small}>
            {props.images.map((item, index: number) => {
              return (
                <li class={[index == currIndex.value ? styles.active : ""]}>
                  <img
                    src={item}
                    onMouseenter={() => (currIndex.value = index)}
                  ></img>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  },
});
