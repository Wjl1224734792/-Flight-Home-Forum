<template>
    <div class="card-detail">
        <div class="top-bt">
            <p class="del">联系圈主撕掉这个便签</p>
            <p class="report">举报</p>
        </div>
        <NoteCard :note="card">
        </NoteCard>
        <div class="form">
            <textarea class="pl" placeholder="请输入..." v-model="content"></textarea>
            <div class="bt">
                <input type="text" placeholder="签名" v-model="name">
                <FhButton nom="primary" size="base" :class="{ notellowed: !isInput }" @click="shubmit">确定</FhButton>
            </div>
        </div>
        <div class="pinglun">
            <p class="bt">评论{{ card[0].commentCount }}</p>
            <div class="comment">
                <div class="user-list" v-for="(item, index) in comment" :key="item.id">
                    <div class="head" :style="{ backgroundImage: picture[item.imgUrl] }"></div>
                    <div class="comm-m">
                        <div class="m-top">
                            <p class="name">{{ item.name }}</p>
                            <p class="time">{{ item.moment }}</p>
                        </div>
                        <div class="mm">{{ item.content }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import NoteCard from './NoteCard.vue';
    import FhButton from './FhButton.vue';
    import { formatDate as date } from '@/utils/fhsg.js'
    import { picture } from '@/utils/data.js'
    import { createComment, postComment, postCommentId } from '@/api/index.js'
    import { ref, computed, onMounted, toRaw } from 'vue';

    const name = ref('匿名')
    const content = ref('')
    const data = ref([])
    const comment = ref([])
    const props = defineProps({
        card: {
            type: Array,
            required: true,
            default: () => []
        }
    });

    onMounted(() => {
        render()
    })
    const render = async () => {
        if (props.card.length > 0) {
            let data = {
                tieziId: props.card[0].id,
                page: 1,
                pageSize: 10
            }
            try {
                const res = await postComment(data)
                // ✅ 确保 messages 是数组
                console.log('获取评论成功:', res.messages)
                comment.value = Array.isArray(res?.messages) ? [...res.messages] : []
                console.log('设置 comment.value:', toRaw(comment.value))
            } catch (err) {
                console.error('获取评论失败:', err)
                comment.value = [] // 出错时重置为空数组
            }
        }
    }

    const isInput = computed(() => {
        return content.value && name.value
    })

    const shubmit = async () => {
        if (!isInput.value) return

        let img = Math.floor(Math.random() * 13)
        const data = {
            name: name.value,
            content: content.value,
            imgUrl: img,
            moment: date(Date.now()),
            userId: props.card[0].userId,
            tieziId: props.card[0].id
        }

        try {
            const res = await createComment(data)
            if (res.code === 200 && res.messages) {
                let data = {
                    id: res.messages.insertId
                }
                const com = await postCommentId(data)
                comment.value = [...com.messages, ...comment.value]
                props.card[0].commentCount++
            }
        } catch (err) {
            console.error('提交评论失败:', err)
        }
    }
</script>
<style lang="scss" scoped>
    .card-detail {
        position: relative;
        padding: 0 $pd-20;

        .top-bt {
            position: fixed;
            top: 0;
            left: 0;
            padding: 20px;
            display: flex;

            .del {
                font-weight: 400;
                font-size: $size-16;
                color: $primary-color;
                letter-spacing: 0;
                text-align: justify;
                cursor: pointer;
            }

            .report {
                font-weight: 400;
                font-size: $size-16;
                color: $warning-color;
                letter-spacing: 0;
                text-align: justify;
                margin-left: 30px;
            }
        }

        .form {
            padding-top: 12px;

            >.pl {
                background: none;
                height: 56px;
                border: 1px solid rgb(148, 148, 148);
                resize: none;
                width: 100%;
                padding: 8px 10px;
                color: #333; // 确保 placeholder 可见
                margin-bottom: 12px;
            }

            >.bt {
                display: flex;
                justify-content: space-between;
                align-items: center;

                >.notellowed {
                    opacity: 0.6;
                    // color: $gray-1;
                }

                >input {
                    display: flex;
                    align-items: center;
                    background: none;
                    border: 1px solid rgb(148, 148, 148);
                    width: 200px;
                    height: 36px;
                    padding: 0 8px;

                }
            }
        }

        >.pinglun {
            padding: 30px 0;

            .bt {
                margin-bottom: 20px;
                width: 56px;
                height: 20px;
                font-weight: 600;
                font-size: 14px;
                color: #202020;
                letter-spacing: 0;
                text-align: justify;
            }
        }

        .comment {
            display: flex;
            flex-direction: column;

            .user-list {
                display: flex;

                margin-bottom: 32px;



                >.head {
                    width: 28px;
                    height: 28px;
                    border-radius: 20px;
                    background-image: linear-gradient(180deg, #FFA9D9 0%, #E83D3D 100%);
                    flex: none;
                }

                .comm-m {
                    padding-left: 8px;

                    .m-top {
                        display: flex;
                        align-items: center;

                        >.name {
                            font-weight: 600;
                            font-size: 14px;
                            color: $gray-1;
                            margin-bottom: 4px;
                        }

                        >.time {
                            font-size: $size-12;
                            margin-left: 4px;
                            color: #949494;

                        }
                    }
                }
            }

        }
    }
</style>