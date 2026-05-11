import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useStore = defineStore('main', () => {

  const currentItem = ref({})
  const setItem = (v: any) => {
    currentItem.value = v
  }
  return {
    currentItem,
    setItem
  }
}, {
  persist: {
    storage: localStorage,
  }
})
