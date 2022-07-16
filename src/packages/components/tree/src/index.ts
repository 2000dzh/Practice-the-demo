import type { PropType } from 'vue'

export const treeProps = {
  data: {
    type: Array as PropType<object[]>
  }
}

export const treeEmits = {
  // 三个参数: 节点点击的节点对象,属性,事件对象
  'node-click': (node: any, nodeAttribute: any, event: any) => { }
}