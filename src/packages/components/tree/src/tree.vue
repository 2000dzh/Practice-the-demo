<!--
 * @Author: 丁子豪
 * @Date: 2022-06-08 10:58:48
 * @LastEditTime: 2022-07-08 12:35:43
 * @LastEditors: 丁子豪
-->
<template>
  <div ref="TREE" :class="[nsTree.b()]">
    <TreeNode />
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, useAttrs } from "vue";
import { treeProps, treeEmits } from "./index";
import { useDlUseNamespace } from "@/packages/hooks";
import TreeNode from "./tree-node.vue";
defineOptions({
  name: "DlTree",
});

const props = defineProps(treeProps);
const emit = defineEmits(treeEmits);

const slots = useSlots();
const attrs = useAttrs();
const nsTree = useDlUseNamespace("tree");
</script>

<style scoped lang="scss"></style>
