// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { AxiosResponse } from 'axios'
import { ref } from 'vue'
import { GOODS } from '@/utils/typeofFile'

interface APIFN {
  (limit?: number): Promise<AxiosResponse<any, any>>
}

/**
 * 数据懒加载
 * @param {Function} apiFn - API函数
 * @return {Array, Element}
 */
export const useLazyData = (apiFn: APIFN) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const data = ref<GOODS[]>([])
  const { stop } = useIntersectionObserver(target, async ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      stop()
      //调用API获取数据
      const { result } = await apiFn()
      data.value = result
    }
  })
  return { target, data }
}