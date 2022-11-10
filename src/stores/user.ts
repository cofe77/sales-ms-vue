import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    name: ''
  }),
  getters: {
    userInfo: (state) => state,
  },
  actions: {
    // increment() {
    //   this.counter++
    // },
  },
})
