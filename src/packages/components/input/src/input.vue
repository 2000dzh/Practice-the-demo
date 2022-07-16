<!--
 * @Author: 丁子豪
 * @Date: 2022-06-01 12:53:34
 * @LastEditTime: 2022-07-15 13:15:17
 * @LastEditors: 丁子豪
-->
<template>
  <div
    v-show="type !== 'hidden'"
    :class="[
      $attrs.class,
      'dl-input',
      type === 'textarea' ? nsTextarea.b() : nsInput.b(),
      nsInput.is('disabled', disabled),
     
      // {
      //   ['2121']: true,
      //   [nsInput.bm('group', 'prepend')]: $slots.prepend,
      // },
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div
        v-if="$slots.prepend"
        :class="['dl-input-group__prepend', nsInput.be('group', 'prepend')]"
      >
        <slot name="prepend" />
      </div>

      <div
        :class="[
          'el-input__wrapper',
          'dl-input__wrapper',
          nsInput.is('focus', focused),
        ]"
      >
        <!-- prefix slot -->
        <span v-if="$slots.prefix">
          <span>
            <slot name="prefix" />
          </span>
        </span>

        <input
          ref="input"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          class="el-input__inner dl-input__inner"
          v-bind="$attrs"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- suffix slot -->
        <span v-if="suffixVisible" :class="nsInput.e('suffix')">
          <span :class="nsInput.e('suffix-inner')">
            <template v-if="!showClear || !showPwdVisible">
              <slot name="suffix" />
              <el-icon v-if="suffixIcon" :class="nsInput.e('icon')">
                <component :is="suffixIcon" />
              </el-icon>
            </template>
            <el-icon
              v-if="showClear"
              :class="[nsInput.e('icon'), nsInput.e('clear')]"
              @mousedown.prevent
              @click="clear"
            >
              <CircleClose />
            </el-icon>
            <el-icon
              v-if="showPwdVisible"
              :class="[nsInput.e('icon'), nsInput.e('password')]"
              @click="handlePasswordVisible"
            >
              <component :is="passwordIcon" />
            </el-icon>
            <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
              <span :class="nsInput.e('count-inner')">
                {{ textLength }} / {{ attrs.maxlength }}
              </span>
            </span>
            <!-- form 校验暂时不做 -->
          </span>
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" :class="nsInput.be('group', 'append')">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textarea"
        :class="nsTextarea.e('inner')"
        v-bind="attrs"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="isWordLimitVisible" :class="nsInput.e('count')">
        <span :class="nsInput.e('count-inner')">
          {{ textLength }} / {{ attrs.maxlength }}
        </span>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useSlots,
  useAttrs,
  shallowRef,
  nextTick,
  watch,
} from "vue";
import { inputProps, inputEmits } from "./inputs";
import { isNil } from "lodash-unified";
import { useNamespace, useCursor } from "@/packages/hooks";
import {
  CircleClose,
  Hide as IconHide,
  View as IconView,
} from "@element-plus/icons-vue";
import { UPDATE_MODEL_EVENT } from "@/packages/constants";
defineOptions({
  name: "DlInput",
  inheritAttrs: false,
});

type TargetElement = HTMLInputElement | HTMLTextAreaElement;

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const slots = useSlots();
const attrs = useAttrs();
const nsInput = useNamespace("input");
const nsTextarea = useNamespace("textarea");

const input = shallowRef<HTMLInputElement>();
const textarea = shallowRef<HTMLTextAreaElement>();

const focused = ref(false);
const hovering = ref(false);
const passwordVisible = ref(false);

const _ref = computed(() => input.value || textarea.value);

const passwordIcon = computed(() =>
  passwordVisible.value ? IconView : IconHide
);

const nativeInputValue = computed(() =>
  isNil(props.modelValue) ? "" : String(props.modelValue)
);

const suffixVisible = computed(
  () =>
    !!slots.suffix || // 输入框尾部插槽
    !!props.suffixIcon || // 自定义后缀图标
    showClear.value ||
    props.showPassword
);
const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !!nativeInputValue.value &&
    (hovering.value || focused.value)
);
const showPwdVisible = computed(
  () =>
    props.showPassword &&
    !props.disabled &&
    !!nativeInputValue.value &&
    (!!nativeInputValue.value || focused.value)
);
const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    !!attrs.maxlength &&
    (props.type === "text" || props.type === "textarea") &&
    !props.disabled &&
    !props.showPassword
);
const textLength = computed(() => Array.from(nativeInputValue.value).length);

const setNativeInputValue = () => {
  const input = _ref.value;
  if (!input || input.value === nativeInputValue.value) return;
  input.value = nativeInputValue.value;
};

const [recordCursor, setCursor] = useCursor(input);

const handleInput = async (event: Event) => {
  recordCursor();

  let { value } = event.target as TargetElement;

  //格式化处理 value
  if (props.formatter) {
    value = props.parser ? props.parser(value) : value;
    value = props.formatter(value);
  }

  if (value === nativeInputValue.value) return;

  emit(UPDATE_MODEL_EVENT, value);
  emit("input", value);

  await nextTick();
  setNativeInputValue();
  setCursor();
};

const handleFocus = (event: FocusEvent) => {
  focused.value = true;
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  focused.value = false;
  emit("blur", event);
};

const clear = () => {
  emit(UPDATE_MODEL_EVENT, "");
  emit("change", "");
  emit("clear");
  emit("input", "");
};

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
  focus();
};

const focus = async () => {
  //解决点击显示密码图标,光标自动定位到开头
  await nextTick();
  _ref.value?.focus();
};

const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false;
  emit("mouseleave", evt);
};

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true;
  emit("mouseenter", evt);
};

watch(nativeInputValue, () => setNativeInputValue());
</script>

<style lang="scss" scoped>
@import "../style/input.scss";
</style>
