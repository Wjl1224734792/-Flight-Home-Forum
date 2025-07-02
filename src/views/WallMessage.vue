<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p class="label-list" :class="{ lbselected: nlabel === -1 }" @click="selectNodes()">
                全部</p>
            <p class="label-list" :class="{ lbselected: nlabel === index }" @click="selectNodes(index)"
                v-for="(item, index) in label[id]" :key="index">{{
                    item }}</p>
        </div>
        <div class="card" :style="{ width: nwidth + 'px' }">
            <div @click="selectedCard(index)" v-for="(item, index) in data" :key="item.id">
                <NoteCard :note="[item]" width="288px" @to="changeModal" :class="{ selected: index == selectedIndex }">
                </NoteCard>
            </div>
        </div>
        <!-- 卡片状态 -->
        <div class="none-msg" v-if="isOk === 0">
            <img src="../assets/images/留言板.svg" alt="">
            <p>还没有话题，快写下一个吧</p>
        </div>
        <div class="loading" v-if="isOk === -1">
            <div id="lottie">
            </div>
            <p>加载中</p>
        </div>
        <p class="none" v-if="isOk === 2">没有更多了...</p>
        <div class="add" :style="{ bottom: addButton + 'px' }" @click="addCard" v-show="!isModal">
            <span class="iconfont icon-tianjia"></span>
        </div>
        <div>
            <FhModal :title="title" @close="changeModal" :isModal="isModal" @clickbt="updateCard"
                :isShow="selectedIndex">
                <NewCard v-if="selectedIndex == -1"></NewCard>
                <CardDetail v-if="selectedIndex != -1" :card="[data[selectedIndex]]">
                </CardDetail>
            </FhModal>
        </div>
    </div>
</template>

<script setup>
    import { wallType, label as labels } from '../utils/data.js'
    import { ref, onMounted, onUnmounted, provide, nextTick, toRaw, watch } from 'vue'
    import { useRootStore } from '@/store/index.js';
    import CardDetail from '@/components/CardDetail.vue';
    import NoteCard from '@/components/NoteCard.vue';
    import FhModal from '@/components/FhModal.vue';
    import NewCard from '@/components/NewCard.vue';
    import lottie from 'lottie-web'
    import loading from '@/assets/lottie/loading.json'
    import { postTiezi, getIp } from '@/api/index.js'
    // import { note } from "../../mock/index.js"
    const store = useRootStore()
    const id = ref(0)
    const nlabel = ref(-1)
    const wall = ref({})
    const nwidth = ref(0)//卡片模块宽度
    const addButton = ref(30)//add按钮距离底部距离
    const title = ref('输入框')
    const isModal = ref(false)
    const label = ref(labels)
    const selectedIndex = ref(-1)
    const isOk = ref(-1)//-1 加载中 0 没有卡片 2 没有更多了 1 加载成功
    const page = ref(1);
    const pageSize = ref(10);
    const userId = ref('')
    const data = ref([])
    // 监听标签变化并自动加载数据
    watch(
        () => nlabel.value,
        async (newVal, oldVal) => {

            if (newVal !== oldVal) {
                data.value = []
                page.value = 1 // 重置页码为第一页
                await getCard() // 调用获取数据的方法
            }
        }
    )

    provide('labels', label.value[id.value])
    const getCard = async (id = 0) => {
        const ip = await getUserIp()
        if (page.value > 0) {
            isOk.value = -1;
            wall.value = {
                type: id,
                page: page.value,
                pageSize: pageSize.value,
                userId: ip || 0, // 确保是 number 类型
                label: nlabel.value !== null && typeof nlabel.value !== 'undefined' ? nlabel.value : -1
            }
            console.log('设置 wall.value:', wall.value)
        }
        const res = await postTiezi(wall.value)
        // ✅ 使用 id 字段去重
        const combined = [...data.value, ...res.messages.data]
        const uniqueMap = new Map()
        combined.forEach(item => {
            if (!uniqueMap.has(item.id)) {
                uniqueMap.set(item.id, item)
            }
        })
        data.value = Array.from(uniqueMap.values())
        if (res.messages.data.length) {
            page.value += 1
        } else {
            page.value = 0
        }
        if (data.value.length > 0) {
            isOk.value = 1
            if (page.value == 0) {
                isOk.value = 2
            }
        } else {
            isOk.value = 0
        }
    }

    //前端插入卡片
    const updateCard = async (obj) => {
        wall.value = { ...obj, page: 1, pageSize: 1 }
        const res = await postTiezi(wall.value)
        let check = new Set(data.value.concat(res.messages.data))
        data.value = Array.from(check)
        if (data.value.length > 0) {
            isOk.value = 1
            if (page.value == 0) {
                isOk.value = 2
            }
        } else {
            isOk.value = 0
        }
        changeModal()
    }
    //切换标签
    const selectNodes = (index = -1) => {
        nlabel.value = index
    }

    const updateWidth = () => {
        let wWidth = document.body.clientWidth
        nwidth.value = Math.floor((wWidth - 112) / 300) * 300
    }
    const Loading = () => {
        if (isOk.value === -1) {
            nextTick(async () => {
                let params = {
                    container: document.getElementById('lottie'),
                    render: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: loading,
                }
                lottie.loadAnimation(params)
            })
        }
    }
    function debounce(fn, delay) {
        let timer
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
    const getUserIp = async () => {
        try {
            const res = await getIp()
            // console.log('获取 IP 成功:', res.ip)
            return res.ip
        } catch (error) {
            // console.error('获取 IP 失败:', error.message)
            return null
        }
    }
    // 初始设置宽度
    onMounted(() => {
        updateWidth()
        window.addEventListener('resize', debounce(updateWidth, 200))
        window.addEventListener('scroll', scrollBottom)
        Loading()
        getCard()
    })

    // 组件卸载时移除事件监听器
    onUnmounted(() => {
        window.removeEventListener('resize', debounce(updateWidth, 200))
        window.removeEventListener('scroll', scrollBottom())
    })

    const scrollBottom = () => {
        //距离顶部高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        //屏幕的高度
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        //内容高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

        if (scrollTop + clientHeight + 230 >= scrollHeight) {
            addButton.value = scrollTop + clientHeight + 230 - scrollHeight
        } else {
            addButton.value = 30
        }
        if (scrollTop + clientHeight == scrollHeight) {
            getCard()
        }
    }
    const addCard = () => {
        title.value = '输入框'
        selectedIndex.value = -1
        changeModal()
    }
    //切换弹窗
    const changeModal = () => {
        isModal.value = !isModal.value
    }

    const selectedCard = (index) => {
        title.value = ''
        if (index != selectedIndex.value) {
            selectedIndex.value = index;
            isModal.value = true
            return
        }
        else {
            selectedIndex.value = -1
            isModal.value = false
            return
        }
    }
</script>

<style lang="scss" scope>
    .wall-message {
        min-height: 900px;
        padding-top: 98px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: 20px;

        &:after {
            content: '';
            display: block;
        }

        &:before {
            content: '';
            display: block;
        }

        .title {
            width: 168px;
            height: 78px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            font-size: 56px;
            color: $gray-1;
            letter-spacing: 0;
            text-align: justify;
        }

        .slogan {
            margin-top: 8px;
            height: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: $gray-2;
            letter-spacing: 0;
            text-align: justify;
        }

        .label {
            height: 28px;
            margin-top: 44px;
            line-height: 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .label-list {
                display: flex;
                justify-content: center; // 水平居中
                align-items: center;
                width: 70px;
                height: 20px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 14px;
                color: $gray-2;
                letter-spacing: 0;
                text-align: center;
                margin: 4px 18px;
                cursor: default;

            }

            .lbselected {
                height: 28px;
                border: 2px solid $gray-1;
                border-radius: 14px;
                color: $gray-1;
                font-weight: 600;
            }
        }

        .card {

            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 12px;
            padding-top: 28px;

            >div {
                padding: 0;
                margin: 0;
                cursor: pointer;
            }

            .selected {
                outline: 1px solid $primary-color;
            }
        }

        .none-msg {
            width: 100%;
            padding-top: 80px;
            text-align: center;
            position: absolute;
            top: 280px;

            >img {
                display: inline;
            }

            >p {
                font-family: serif;
                font-weight: 700;
                font-size: 24px;
                color: $gray-3;
            }
        }

        .none {
            text-align: center;
            color: $gray-3;
            padding: 20px;
            z-index: 900;
        }

        .loading {
            width: 100%;
            text-align: center;

            .p {
                margin-top: -72px;
                font-family: serif;
                font-size: 24px;
                color: $gray-3;
            }

        }

        .add {

            width: 56px;
            height: 56px;
            background: $gray-1;
            box-shadow: 0 4px 8px 0 rgba($color: #000000, $alpha: 0.08);
            border-radius: 28px;
            position: fixed;
            right: 30px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            transition: $tr;
            z-index: 2000;

            .icon-tianjia {
                color: $gray-10;
                font-size: 24px;
            }
        }

    }

    #lottie {
        margin-top: 20px;
        height: 200px;
    }
</style>