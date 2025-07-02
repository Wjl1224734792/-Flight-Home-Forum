<template>
    <div class="wall-index">
        <TopBar />
        <router-view />
        <FootBar />
    </div>
</template>

<script setup>
    import TopBar from '@/components/TopBar.vue'
    import FootBar from '@/components/FootBar.vue';
    import { getIp } from '@/api/index.js'
    import { onMounted } from 'vue'
    import { useRootStore } from '../store';
    const store = useRootStore()
    onMounted(async () => {
        try {
            const res = await getIp()
            console.log('获取 IP 成功:', res.ip)
            store.getUser(res.ip) // 正确使用 action 方法
        } catch (error) {
            console.error('获取 IP 失败:', error.message)
        }
    })

</script>

<style lang="scss" scoped>
    .wall-index {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        justify-content: space-between;

        .bg-video {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 840px;
            z-index: -1;
            object-fit: cover;
        }

    }
</style>