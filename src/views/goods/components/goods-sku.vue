<!--
 * @Author: 丁子豪
 * @Date: 2022-04-30 20:28:30
 * @LastEditTime: 2022-07-16 11:44:23
 * @LastEditors: 丁子豪
-->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            @click="clickSpecs(item, val)"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { PropType } from "vue";
import {
  PRODUCT_DETAILS,
  SPECS,
  SPEC_VALUES,
  SKUS,
  SKUS_SPECS,
} from "@/utils/typeofFile";
import getPowerSet from "@/utils/power-set";
const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: "GoodsSku",
  },
  goods: {
    type: Object as PropType<Partial<PRODUCT_DETAILS>>,
    required: true,
    default: () => ({ specs: [], skus: [] }),
  },
  skuId: {
    type: String as PropType<string>,
    default: "",
  },
  age: {
    type: Number as PropType<number>,
    default: 111,
  },
  //自定义修饰符
  ageModifiers: {
    default: () => ({}),
  },
});
const emit = defineEmits(["change"]);

//初始化选中状态
const initSelectedStatus = (goods: PRODUCT_DETAILS, skuid: string) => {
  const sku = goods.skus?.find((sku) => sku.id === skuid);
  if (sku) {
    goods.specs.forEach((obj, index: number) => {
      const value = sku.specs[index].valueName;
      obj.values.forEach((item) => (item.selected = item.name === value));
    });
  }
};

const spliter = "★";
// 根据skus数据得到路径字典对象
const getPathMap = (skus: SKUS[]) => {
  const pathMap: any = {};
  skus?.forEach((sku) => {
    //有库存的
    if (sku.inventory) {
      // 获得 sku 属性值数组
      const specs = sku.specs.map((obj) => obj.valueName);
      //进一步处理数据
      const powerSet = getPowerSet(specs);
      //设置字典对象
      powerSet.forEach((val) => {
        const key = val.join(spliter);
        if (pathMap[key]) {
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};

//得到当前选中规格集合
const getSelectedArr = (specs: SPECS[]) => {
  const selectedArr: any = [];
  specs.forEach((k) => {
    const selectedVal = k.values.find((item) => item.selected);
    selectedArr.push(selectedVal ? selectedVal.name : undefined);
  });
  return selectedArr;
};

// 更新按钮的禁用状态
const updateDisabledStatus = (specs: SPECS[], pathMap: any) => {
  specs?.forEach((spec, index: number) => {
    const selectedArr = getSelectedArr(specs);
    spec.values.forEach((val) => {
      //已经选中的按钮不做判断
      if (val.name === selectedArr[index]) return false;
      //未选中的替换对应位置
      selectedArr[index] = val.name;
      //过滤值
      const key = selectedArr.filter(Boolean).join(spliter);
      //根据路径字典判断状态
      val.disabled = !pathMap[key];
    });
  });
};

const pathMap = getPathMap(props.goods.skus as SKUS[]);
//根据传入的skuId默认选中规格按钮
initSelectedStatus(props.goods as PRODUCT_DETAILS, props.skuId);
// 组件初始化的时候更新禁用状态
updateDisabledStatus(props.goods.specs as SPECS[], pathMap);

const clickSpecs = (item: SPECS, val: SPEC_VALUES) => {
  if (val.disabled) return false;
  if (val.selected) {
    val.selected = false;
  } else {
    item.values.forEach((item) => (item.selected = false));
    val.selected = true;
  }
  //更新商品禁用状态
  updateDisabledStatus(props.goods.specs as SPECS[], pathMap);

  const selectedArr = getSelectedArr(props.goods.specs as SPECS[]).filter(Boolean);
  //当用户选择完整的规格
  if (selectedArr.length === props.goods.specs?.length) {
    //根据路径字典对象,查找商品id
    const skuIds = pathMap[selectedArr.join(spliter)];
    const sku = props.goods.skus?.find((sku) => sku.id === skuIds[0]);
    sku &&
      emit("change", {
        skuId: sku.id,
        price: sku.price,
        oldPrice: sku.oldPrice,
        inventory: sku.inventory,
        specsText: sku.specs
          .reduce((p, item) => `${p} ${item.name}:${item.valueName}`, "")
          .replace(" ", ""),
      });
  } else {
    emit("change", {});
  }
};

</script>

<style lang="scss">
// .sku-state-mixin () {
//   border: 1px solid #e4e4e4;
//   margin-right: 10px;
//   cursor: pointer;

//   &.selected {
//     border-color: $xtxColor;
//   }

//   &.disabled {
//     opacity: 0.6;
//     border-style: dashed;
//     cursor: not-allowed;
//   }
// }

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        // .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        // .sku-state-mixin ();
      }
    }
  }
}
</style>
