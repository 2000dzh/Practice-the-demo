/*
 * @Author: 丁子豪
 * @Date: 2022-04-16 21:44:22
 * @LastEditTime: 2022-04-30 20:26:59
 * @LastEditors: 丁子豪
 */
import { defineComponent, ref, watch, computed, reactive } from "vue";
import type { PropType } from "vue";
import styles from "@/assets/styles/xtx-city.module.scss";
import { storeToRefs } from "pinia";
import { categoryCategoryStore } from "@/store/modules/category";
import { cityList } from "@/utils/externalInterface";

export default defineComponent({
  props: {
    fullLocation: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    //注册全局点击
    document.onclick = (event) => {
      if (target.value) {
        //如果不是点击 target内的元素,就隐藏target
        let flag = target.value.contains(event.target as HTMLElement);
        if (!flag) {
          active.value = false;
        }
      }
    };
    const target = ref<HTMLElement | null>(null);
    const active = ref<boolean>(false);
    const loading = ref<boolean>(false);
    interface CityData {
      name: string;
      code: string;
      level: number;
      areaList: CityData[];
    }
    let theCityData = ref<CityData[]>([]);
    //切换状态
    const toggleDialog = () => {
      active.value = !active.value;
      getcityList();
    };
    // 获取城市数据
    // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
    // 2. 何时获取？打开城市列表的时候，做个内存中缓存
    // 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
    const categoryStore = categoryCategoryStore();
    const { cityData } = storeToRefs(categoryStore);
    //请求城市数据
    const getcityList = async () => {
      loading.value = true;
      await cityList();
      theCityData.value = JSON.parse(JSON.stringify(cityData.value));
      loading.value = false;
    };

    const changeResult = reactive({
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      countyCode: "",
      countyName: "",
      fullLocation: props.fullLocation, //默认地址
    });
    const changeItem = (item: CityData) => {
      setTimeout(() => {
        loading.value = true;
        if (item.areaList?.length) {
          theCityData.value = item.areaList;
          //省份
          if (item.level === 0) {
            changeResult.provinceCode = item.code;
            changeResult.provinceName = item.name;
          }
          // 市
          if (item.level === 1) {
            changeResult.cityCode = item.code;
            changeResult.cityName = item.name;
          }
        }
        // 地区
        if (item.level === 2) {
          changeResult.countyCode = item.code;
          changeResult.countyName = item.name;
          changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
          active.value = false;
          //通知父组件
          emit("change", changeResult);
          //还原状态
          theCityData.value = JSON.parse(JSON.stringify(cityData.value));
        }
        loading.value = false;
      }, 0);
    };

    return () => (
      <>
        <div class={styles["xtx-city"]} ref={target}>
          <div
            class={[styles["select"], active.value ? styles["active"] : ""]}
            onClick={toggleDialog}
          >
            <span class={styles["placeholder"]}>
              {changeResult.fullLocation || "请选择配送地址"}
            </span>
            <span class={styles["value"]}></span>
            <i class="iconfont icon-angle-down"></i>
          </div>
          {active.value ? (
            <div class={styles["option"]}>
              {loading.value ? (
                <div class={styles.loading}></div>
              ) : (
                theCityData.value.map((obj) => (
                  <span
                    class={styles.ellipsis}
                    key={obj.code}
                    onClick={() => changeItem(obj)}
                  >
                    {obj.name}
                  </span>
                ))
              )}
            </div>
          ) : null}
        </div>
      </>
    );
  },
});
