import { isString } from 'lodash'
import type { PropType, Component } from 'vue'
import { UPDATE_MODEL_EVENT } from "@/packages/constants";

export const inputProps = {
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  modelValue: {
    type: [Object, String, Number] as PropType<Object | string | number>,
    default: ''
  },
  // 是否显示切换密码图标,密码框
  showPassword: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  placeholder: {
    type: String as PropType<string>
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  //自定义后缀图标
  suffixIcon: {
    type: [String, Object, Function] as PropType<string | Object | Function | Component>,
    default: ''
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  //是否显示输入字数统计
  showWordLimit: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  //指定输入值的格式 (只有当 type 是"text"时才能工作)
  formatter: {
    type: Function
  },
  //指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)
  parser: {
    type: Function
  },
}

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  change: (value: string) => value,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
}