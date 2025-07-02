<template>
    <Transition name="down">
        <div class="Fh-message" v-if="isShow">
            <div class="Fh-m-i">
                <i class="iconfont" :class="style[type].icon"></i>
                <span class="text">{{ message }}</span>
            </div>
        </div>
    </Transition>
</template>

<script setup>
    import { defineProps, onMounted, ref, defineEmits } from 'vue';
    const isShow = ref(false)
    const emit = defineEmits(['isto'])
    const props = defineProps({
        message: {
            type: String,
            default: '提示'
        },
        type: {
            type: String,
            default: 'warning'
            //warning 警告 error 错误 success 成功
        }
    })
    const style = {
        warning: {
            icon: 'icon-warning'
        },
        error: {
            icon: 'icon-error'
        },
        success: {
            icon: 'icon-success'
        }
    }
    onMounted(() => {
        isShow.value = true
        setTimeout(() => {
            isShow.value = false
            emit('isto', false)
        }, 3000)
        return { style, isShow }
    })
</script>

<style lang="scss" scoped>
    .down {
        &-enter-from {
            transform: translateY(-30px);
            opacity: 0;
        }

        &-enter-active {
            transition: all 0.3s;
        }

        &-enter-to {
            transform: translateY(0);
            opacity: 1;
        }

        &-leave-from {
            transform: translateY(0);
            opacity: 1;
        }

        &-leave-active {
            transition: all 0.3s;
        }

        &-leave-to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }

    .Fh-message {
        width: 100%;
        height: 40px;
        position: fixed;
        z-index: 9999;
        line-height: 40px;
        top: 20px;
        display: flex;
        justify-content: center;

        .Fh-m-i {
            padding: 0 20px;
            color: $gray-1 ;
            border-radius: 4px;
            background: #ffffff;
            box-shadow: 0 4px 16px rgba($color: #000000, $alpha: 0.1);

            i {
                margin-right: 6px;
                vertical-align: middle;
            }

            .text {
                vertical-align: middle;
            }
        }
    }

    .icon-error {
        color: $error-color;
    }

    .icon-warning {
        color: $warning-color;
    }

    .icon-success {
        color: $success-color;
    }


</style>