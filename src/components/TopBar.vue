<template>
    <div class="top-bar">
        <div class="logo">
            <img src="@/assets/images/demo.svg" class="logo-img">
            <p class="logo-name">飞行之家</p>
        </div>
        <div class="menu">
            <FhButton size="base" nom="cprimary " class="menu1">飞友圈</FhButton>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script setup>
    import FhButton from '@/components/FhButton.vue';
</script>

<style lang="scss" scoped>

    .top-bar {

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 52px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
            pointer-events: none;
            z-index: -1;
        }

        .logo {
            display: flex;
            align-items: center; // 垂直居中
            width: 200px;

            >.logo-img {
                height: 60px;
            }

            .logo-name {
                height: 20px;
                font-weight: 600;
                font-size: $size-20;
                line-height: 20px;
                color: $gray-1;
                padding-left: 10px;
            }

        }

        // .menu {

        // }

        .user {
            display: flex;
            flex-direction: row-reverse;
            width: 200px;

            .user-head {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background-image: linear-gradient(180deg, #FFA9D9 0%, #E83D3D 100%);
            }
        }
    }

</style>