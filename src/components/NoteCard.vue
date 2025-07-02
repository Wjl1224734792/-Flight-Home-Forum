<template>
    <div class="fh-note-card" :style="{ width: width, background: cardBgColor[note[0].color] }">
        <div class="mtop">
            <p class="time">{{ date(note[0].moment) }}</p>
            <p class="tag">{{ label[note[0].type][note[0].label] }}</p>
        </div>
        <p class="message" @click="toDetail">
            {{ note[0].messages }}
        </p>
        <div class="foot">
            <div class="ft-left">
                <div class="xihuan" @click.stop="like">
                    <span class="iconfont aixin" :class="{ islike: note[0].like > 0 }">&#xe663;</span>
                    <span class="value">{{ note[0].like }}</span>
                </div>
                <div class="pinglun">
                    <span class="iconfont pl">&#xe606;</span>
                    <span class="value">{{ note[0].commentCount }}</span>
                </div>
            </div>
            <div class="name">{{ note[0].name }}</div>
        </div>
    </div>
</template>
<script setup>
    import { label, cardBgColor } from '@/utils/data.js'
    import { formatDate as date } from '@/utils/fhsg.js'
    import {
        defineProps, defineEmits, ref
    } from 'vue';
    import { createFeedback } from '@/api/index.js';
    const { width, background, note } = defineProps({
        width: {
            type: String,
            default: '100%'
        },
        background: {
            type: String
        },
        note: {
            type: Array
        }
    })
    const isLike = ref(false)
    let id = 0
    const emits = defineEmits(['to'])
    const toDetail = () => {
        emits('to')
    }

    const like = async () => {


        let data = {
            type: note[0].label,
            tieziId: note[0].id,
            userId: note[0].userId,
            moment: date(new Date())
        }
        const res = await createFeedback(data)
        // id = res.messages.insertId
        // console.log(id)
        note[0].like++
    }

</script>
<style lang="scss" scoped>
    .fh-note-card {
        height: 240px;
        background: #c87c6f4d;
        display: flex;
        flex-direction: column;
        padding: 10px 20px;


        .mtop {
            height: 17px;
            display: flex;
            justify-content: space-between;

            p {
                width: 100%;
                font-size: $size-12;
                color: $gray-3;
            }

            .tag {
                text-align: right;
            }
        }

        .message {
            height: 140px;
            font-size: 14px;
            color: $gray-1;
            text-align: justify;
            margin-top: 19px;
            overflow: hidden;

            /* 自动换行设置 */
            white-space: pre-wrap; // 保留换行符并自动换行
            word-break: break-all; // 打破长单词
            overflow-wrap: break-word; // 在边界处换行
        }

        .foot {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 18px;

            .ft-left {
                display: flex;

                .xihuan {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    .aixin {

                        &:hover {
                            color: $like-color;
                        }

                    }

                    .islike {
                        color: $like-color;
                    }
                }

                .pinglun {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }

                span {

                    display: flex;
                    justify-content: center; // 水平居中
                    align-items: center;
                    width: 13px;
                    height: 16px;
                    font-weight: 400;
                    font-size: 12px;
                    color: $gray-3;
                    letter-spacing: 0;
                    text-align: justify;
                }

                span:nth-child(2n) {
                    margin-right: 11px;
                }

                span:nth-child(2n-1) {
                    margin-right: 5px;
                }

                .name {
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    font-size: 1px;
                    color: $gray-1;
                    letter-spacing: 0;
                    text-align: right;
                }
            }
        }
    }

    .fh-node-card {
        height: 240px;
        background: #c87c6f4d;
        padding: 10px 20px;
        margin: 12px;
        display: flex;
        flex-direction: column;

        .mtop {
            height: 17px;
            display: flex;
            justify-content: space-between;

            p {
                width: 100%;
                font-size: $size-12;
                color: $gray-3;
            }

            .tag {
                text-align: right;
            }
        }

        .message {
            height: 140px;
            font-size: 14px;
            color: $gray-1;
            text-align: justify;
            margin-top: 19px;
            cursor: pointer;
            overflow: hidden;

            /* 自动换行设置 */
            white-space: pre-wrap; // 保留换行符并自动换行
            word-break: break-all; // 打破长单词
            overflow-wrap: break-word; // 在边界处换行
        }

        .foot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 18px;

            .ft-left {
                display: flex;

                .xihuan {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 16px;

                    .aixin {
                        transition: all 0.3s;

                        &:hover {
                            color: $like-color; // 修复 hover 写法
                        }

                        .islike {
                            color: $like-color;
                        }

                    }
                }

                .pinglun {
                    display: flex;
                    align-items: $tr;
                    font-size: 16px;
                }
            }

            .name {
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 17px;
                color: $gray-1;
                letter-spacing: 0;
                text-align: right;
            }
        }
    }


</style>