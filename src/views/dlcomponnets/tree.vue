<!--
 * @Author: 丁子豪
 * @Date: 2022-07-02 19:52:20
 * @LastEditTime: 2022-07-02 20:27:45
 * @LastEditors: 丁子豪
-->
<template>
  <div>
    <DlTree @node-click="handleNodeClick" />
    <el-tree :data="data" @node-click="handleNodeClick" />
  </div>
</template>

<script lang="ts" setup>
import { DlTree } from "@/packages/components";
interface Tree {
  label: string;
  children?: Tree[];
}

const handleNodeClick = (data: Tree,node:any,event: any) => {
  console.log(data);
  console.log(node);
  console.log(event);
};

const data: Tree[] = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
</script>

<style lang="scss" scoped></style>
