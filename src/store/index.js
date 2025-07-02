import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRootStore = defineStore('root', () => {
    // 使用 ref 声明响应式状态
    const count = ref(0)
    const user = ref('')

    // 使用函数更新状态
    function increment() {
        count.value++
    }

    function getUser(n) {
        user.value = n
    }

    return {
        count,
        user,
        increment,
        getUser
    }
})