<template>
    <Transition name="modal">
        <div class="fh-modal" v-if="isModal">
            <div class="fh-modal-head">
                <p class="modal-name">{{ title }}</p>
                <i class="iconfont icon-guanbi" @click="closeModal"></i>
            </div>
            <div class="fh-modal-main">
                <div class="inner">
                    <slot></slot>
                </div>
            </div>
            <div class="footer" v-if="isShow == -1" :style="{
                'opacity:0;': isShow == -1,
                'width:0;': isShow == 1
            }">
                <FhButton size="max" nom="secondary" style="width:100px;" @click="cancel">丢弃</FhButton>
                <FhButton size="max" style="width:200px;" @click="submit">确定</FhButton>
            </div>
        </div>
    </Transition>
    <Teleport to="body">
        <FhMessage v-if="isTo" :type="type" :message="message" @isto="changIsTo"></FhMessage>
    </Teleport>
</template>

<script setup>
    import FhMessage from "@/components/FhMessage.vue";
    import FhButton from "@/components/FhButton.vue";
    import { defineProps, defineEmits, reactive, provide, toRaw, ref } from 'vue'
    import { createTiezi } from "@/api/index.js";
    import { useRootStore } from "@/store";
    import { formatDate } from "@/utils/fhsg";

    const isTo = ref(false)
    const type = ref('success')
    const message = ref('发布成功')
    const store = useRootStore()
    const info = reactive({
        name: '匿名',
        messages: '',
        userId: '',
        color: 0,
        imgUrl: '',
        moment: 0,
        label: 0,
        type: 0
    })
    provide('info', info)
    const props = defineProps({
        title: {
            type: String,
            default: '标题'
        },
        isModal: {
            type: Boolean,
            default: true
        },
        isShow: {
            type: Number,
            default: 0
        }
    })
    const emit = defineEmits(['close', 'clickbt'])
    const closeModal = () => {
        emit('close')
    }

    const changIsTo = (bool) => {
        isTo.value = bool

    }
    const submit = async () => {
        info.moment = formatDate(new Date())
        info.userId = store.user
        try {
            await createTiezi(toRaw(info))
            emit('clickbt', toRaw(info))
            type.value = 'success'
            message.value = '发布成功'
            isTo.value = true
        } catch (error) {
            console.log(error)
        }

    }
    const cancel = () => {
    }

</script>

<style lang="scss" scoped>


    .modal-enter-from {
        transform: translateX(100%);
    }

    .modal-enter-active {
        transition: all 0.2s ease-out;
    }

    .modal-enter-to {
        transform: translateX(0);
    }



    .modal-leave-from {
        transform: translateX(0);
    }

    .modal-leave-active {
        transition: all 0.2s ease-in;
    }

    .modal-leave-to {
        transform: translateX(100%);
    }


    .fh-modal {
        position: fixed;
        top: 52px;
        right: 0;
        width: 360px;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); // 添加前缀
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2); // 更明显
            pointer-events: none;
            z-index: 0; // 修改为 0 测试是否显示
        }

        .fh-modal-head {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;

            .modal-name {
                font-weight: 600;
                font-size: 16px;
                color: $gray-1;
                letter-spacing: 0;
                text-align: justify;
            }

            .icon-guanbi {
                color: $gray-2;
                cursor: pointer;
                padding-left: 10px;
            }


        }

        .fh-modal-main {
            width: 100%;
            height: 80%;
            overflow: auto;

            .inner {
                height: 800px;
                margin: 2px;
            }
        }

        &>.footer {
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }
    }


    /* 整个滚动条 */
    .fh-modal-main::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    /* 滚动条轨道 */
    .fh-modal-main::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
        border-radius: 4px;
    }

    /* 滚动条上的滑块 */
    .fh-modal-main::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    /* 滚动条滑块在悬停时的样式 */
    .fh-modal-main::-webkit-scrollbar-thumb:hover {
        background: #333;
    }

    /* 右下角滚动条交汇处的拖动块 */
    .fh-modal-main::-webkit-scrollbar-corner {
        background: #179a16;
    }
</style>