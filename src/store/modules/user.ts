/*
 * @Author: 丁子豪
 * @Date: 2022-03-13 00:00:01
 * @LastEditTime: 2022-03-13 00:33:45
 * @LastEditors: 丁子豪
 */
import { defineStore } from 'pinia'

interface Profile {
  id: string,
  avatar: string,
  nickname: string,
  account: string,
  mobile: string,
  token: string
}


export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  actions: {
    // 修改用户信息
    setUser(payload: Profile) {
      this.profile = payload
    }
  }
})