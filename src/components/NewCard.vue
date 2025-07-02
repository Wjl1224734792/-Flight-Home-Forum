<template>
    <div class="new-card">
        <div class="colors">
            <p class="color-list" v-for="(item, index) in cardColor" :key="index" :style="{ background: item }"
                :class="{ colorSelected: index == selected }" @click="change(index)"></p>
        </div>
        <div class="new-card-main" :style="{ background: cardColor[selected] }">
            <textarea placeholder="输入内容..." class="content" maxlength="96" v-model="injectInfo.messages"></textarea>
            <input type="text" placeholder="签名" class="name" v-model="injectInfo.name">
        </div>
        <div class="labels">
            <p class="new-itle">选择标签</p>
            <div class="label-tag">
                <p v-for="(item, index) in label" :key="index" class="tags"
                    :class="{ tagsSelected: index == labelIndex }" @click="changeLabel(index)">{{ item }}</p>
            </div>
        </div>
        <div class="mz">
            <p class="mianze">免责声明</p>
            <p class="mzsm">
                飞行之家是个人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br>
                1、反对宪法所确定的基本原则的；<br>
                2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br>
                3、损害国家荣誉和利益的；<br>
                4、煽动民族仇恨、民族歧视，破坏民族团结的；<br>
                5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br>
                6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br>
                7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
                8、侮辱或者诽谤他人，侵害他人合法权益的；<br>
                9、含有法律、行政法规禁止的其他内容的信息。</p>
        </div>
    </div>
</template>

<script setup>
    import { cardColor } from "@/utils/data.js";
    import { ref, inject, watch } from "vue";
    import { useRootStore } from "../store";
    const store = useRootStore();
    const selected = ref(0);
    const label = inject("labels");
    const labelIndex = ref(0)
    const injectInfo = inject('info')
    watch(() => injectInfo.name, (newValue) => {
        injectInfo.name = newValue
    })
    watch(() => injectInfo.message, (newValue) => {
        injectInfo.message = newValue
    })

    const change = (index) => {
        selected.value = index
        injectInfo.color = selected.value
    }
    //切换标签
    const changeLabel = (index) => {
        labelIndex.value = index
        injectInfo.label = labelIndex.value
    }

</script>

<style lang="scss" scoped>
    .new-card {
        width: 100%;
        padding: 0 20px;

        .colors {
            display: flex;
            padding-bottom: 12px;
            height: 36px;

            .color-list {
                width: 24px;
                height: 24px;
                margin-right: 8px;
                cursor: pointer;
            }

            .colorSelected {
                border: 1px solid #3B73F0;
            }
        }

        .new-card-main {
            height: 240px;
            width: 100%;
            background: rgba(252, 175, 162, 0.31);
            padding: 12px;

            .content {
                background: none;
                border: none;
                resize: none;
                height: 172px;
                width: 100%;
                padding: 8px;
                font-size: 15px;
                color: #333; // 确保 placeholder 可见
            }

            .name {
                display: flex;
                align-items: center;
                background: none;
                border: 1px solid rgba(255, 255, 255, 1);
                width: 100%;
                padding: 8px;
                font-size: 15px;
            }
        }

        .labels {
            font-weight: 600;
            padding-top: 30px;

            .new-title {
                font-weight: 600;
                font-size: 14px;
                color: $gray-1;
                letter-spacing: 0;
                text-align: justify;
            }

            .label-tag {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                padding-top: 18px;

                .tags {
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                    padding: 2px 0;
                    font-weight: 400;
                    font-size: 14px;
                    border-radius: 20px;
                    color: $gray-2;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .tagsSelected {
                    width: 72px;
                    height: 24px;
                    background: #EBEBEB;
                    border-radius: 14px;
                }
            }

        }

        .mz {
            width: 100%;
            padding-top: 40px;

            .mianze {

                font-weight: 600;
                font-size: 14px;
                color: #202020;
                letter-spacing: 0;
                text-align: justify;
                margin-bottom: 12px;
            }

            .mzsm {
                font-weight: 400;
                font-size: 12px;
                color: #949494;
                letter-spacing: 0;
                text-align: justify;
                line-height: 18px;
            }
        }
    }
</style>