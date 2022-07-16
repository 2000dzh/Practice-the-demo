import axios from 'axios'
import { storeToRefs } from "pinia";
import { categoryCategoryStore } from "@/store/modules/category";

//请求城市数据
export const cityList = () => {
  const categoryStore = categoryCategoryStore();
  const { setcityData } = categoryStore;
  const { cityData } = storeToRefs(categoryStore);
  return new Promise((resolve, reject) => {
    if (cityData.value.length) {
      resolve(cityData.value);
    } else {
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((res) => {
        setcityData(res.data);
        resolve(res.data);
      });
    }
  });
};