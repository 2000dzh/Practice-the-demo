/*
 * @Author: 丁子豪
 * @Date: 2022-05-22 18:53:07
 * @LastEditTime: 2022-07-16 11:36:17
 * @LastEditors: 丁子豪
 */
import { defineComponent, ref, computed, watchEffect } from "vue";
import type { PropType } from "vue";
import { DArrowLeft, DArrowRight, MoreFilled } from "@element-plus/icons-vue";
import styles from "@/assets/styles/xtx-pagination.module.scss";

export default defineComponent({
  name: "XtxPagination",
  props: {
    // 当前页数
    currentPage: {
      type: Number as PropType<number>,
      default: 1,
    },
    //每页显示数据个数
    pageSize: {
      type: Number as PropType<number>,
      required: true,
    },
    //每页显示个数选择器的选项设置
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    //设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠(奇数)
    pagerCount: {
      type: Number as PropType<number>,
      default: 7,
    },
    total: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  emits: ["current-change", "size-change"],
  setup(props, { slots, emit }) {
    const groove = {
      prefix: () => {
        return "-_-";
      },
    };
    const innerPageSize = ref<number>(props.pageSize);
    const showPrevMore = ref(false); //左侧按钮
    const showNextMore = ref(false); //右侧按钮
    const quickPrevHover = ref(false); //上一组
    const quickNextHover = ref(false); //下一组
    const pageCount = computed(() => {
      //按钮总数
      return Math.max(1, Math.ceil(props.total / props.pageSize));
    });

    const pagers = computed(() => {
      // 允许按钮显示数
      const pagerCount = props.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2; //对称值
      const currentPage = props.currentPage;

      let showPrevMore = false;
      let showNextMore = false;
      if (pageCount.value > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }
        if (currentPage < pageCount.value - halfPagerCount) {
          showNextMore = true;
        }
      }
      // 1.上一个显示,下一个不显示
      // 2.上一个不显示,下一个显示
      // 3.两个都显示
      // 4.两个都不显示
      const array: number[] = [];
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount.value - (pagerCount - 2);
        for (let i = startPage; i < pageCount.value; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount.value; i++) {
          array.push(i);
        }
      }
      return array;
    });

    watchEffect(() => {
      const currentPage = props.currentPage;
      const pagerCount = props.pagerCount;
      const halfPagerCount = (props.pagerCount - 1) / 2;

      showPrevMore.value = false;
      showNextMore.value = false;

      if (pageCount.value > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore.value = true;
        }
        if (currentPage < pageCount.value - halfPagerCount) {
          showNextMore.value = true;
        }
      }
    });

    function onMouseenter(direction: "right" | "left") {
      if (direction === "right") {
        quickNextHover.value = true;
      } else {
        quickPrevHover.value = true;
      }
    }

    function onPagerClick(event: UIEvent) {
      const target = event.target as HTMLElement;
      console.log(target);
      if (target.tagName.toLowerCase() === "ul") {
        return;
      }

      let newPage = Number(target.textContent);
      const currentPage = props.currentPage;
      const pagerCountOffset = props.pagerCount - 2;
      //利用 css 属性 pointer-events: none; 排除 svg 标签的鼠标事件
      if (target.className.includes("dl-icon")) {
        if (target.className.includes("dl-quickprev")) {
          //上一页
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.includes("dl-quicknext")) {
          //下一页
          newPage = currentPage + pagerCountOffset;
        }
      }
      // 排除NaN
      if (!Number.isNaN(+newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount.value) {
          newPage = pageCount.value;
        }
      }
      if (newPage !== currentPage) {
        emit("current-change", newPage);
      }
    }

    function selectChaneg(value: number) {
      if (value !== props.pageSize) {
        emit("size-change", value);
      }
    }

    return () => (
      <>
        <div class={styles["xtx-pagination"]}>
          <span class={styles["pagination__total"]}>共 {pageCount.value}</span>
          <el-select
            placeholder="   请选择"
            class={["m-2", styles["pagination-slect"]]}
            v-slots={groove}
            v-model={innerPageSize.value}
            onChange={selectChaneg}
          >
            {props.pageSizes.map((item) => (
              <el-option key={item} value={item} label={item} />
            ))}
          </el-select>
          <ul class={styles["pagination-pagers"]} onClick={onPagerClick}>
            <li class={[1 === props.currentPage ? styles.active : ""]}>1</li>
            {showPrevMore.value ? (
              <li
                class={[styles["dl-icon"], "dl-quickprev"]}
                onMouseenter={() => {
                  onMouseenter("left");
                }}
                onMouseleave={() => {
                  quickPrevHover.value = false;
                }}
              >
                {quickPrevHover.value ? <DArrowLeft /> : <MoreFilled />}
              </li>
            ) : null}
            {pagers.value.map((item) => (
              <li class={[item === props.currentPage ? styles.active : ""]}>
                {item}
              </li>
            ))}
            {showNextMore.value ? (
              <li
                class={[styles["dl-icon"], "dl-quicknext"]}
                onMouseenter={() => {
                  onMouseenter("right");
                }}
                onMouseleave={() => {
                  quickNextHover.value = false;
                }}
              >
                {quickNextHover.value ? <DArrowRight /> : <MoreFilled />}
              </li>
            ) : null}
            <li
              class={[
                pageCount.value === props.currentPage ? styles.active : "",
              ]}
            >
              {pageCount.value}
            </li>
          </ul>
        </div>
      </>
    );
  },
});
