<template>
    <div class="foot-bar">
        <div class="left">
            <div class="logo">
                <img src="@/assets/images/demo.svg" class="logo-img">
                <p class="logo-name">飞行之家</p>
            </div>
            <p class="content">飞行之家由个人独立开发会持续更新新功能，为便于网友交流飞行器相关话题的平台</p>
            <p class="content">用户将话题/问题写在便签贴在飞友圈，用户可以自定义便签颜色和内容属性</p>
            <p class="state">
                <span>声明</span>
                <span>备案/许可证</span>
                <span>网站备案/许可证</span>
            </p>
        </div>
        <div class="middle">
            <p class="title">链接</p>
            <div class="link">
                <a href="#">还没有</a>
                <a href="#">没有</a>
            </div>
        </div>
        <div class="right">
            <p class="title">打赏</p>
            <div class="container">
                <div class="pay">
                    <img src="../assets/images/wechatpay.jpg">
                    <p>微信支付</p>
                </div>
                <div class="pay">
                    <img src="../assets/images/alipay.jpg">
                    <p>支付宝支付</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .foot-bar {
        display: flex;
        justify-content: space-between;
        width: 1600px;
        height: 200px;
        background: $gray-1;
        padding: 20px 200px;

        .title {
            width: 32px;
            height: 22px;
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            letter-spacing: 0;
            text-align: justify;
            opacity: 0.5;
            color: $gray-10;
        }

        .left {
            height: 158px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;

            .logo {
                display: flex;
                align-items: center; // 垂直居中
                width: 200px;

                img {
                    width: 40px;
                    height: 40px;
                }

                .logo-name {
                    height: 20px;
                    font-weight: 600;
                    font-size: $size-20;
                    line-height: 20px;
                    color: $gray-10;
                    padding-left: 10px;
                }

            }

            .content {
                height: 17px;
                line-height: 17px;
                opacity: 0.5;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 12px;
                color: $gray-10;
                letter-spacing: 0;
                text-align: justify;
            }

            .state {
                span {
                    height: 17px;
                    line-height: 17px;
                    opacity: 0.5;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    font-size: 12px;
                    color: $gray-10;
                    letter-spacing: 0;
                    text-align: justify;
                }

                span:first-child,
                span:nth-child(2) {
                    padding-right: 20px;
                }

            }

        }

        .middle {
            display: flex;
            flex-direction: column;

            .link {
                flex: 1;
                padding-top: 8px;
                display: flex;
                flex-direction: column;
                align-items: flex-starts;

                >a {
                    width: 48px;
                    height: 17px;
                    opacity: 0.5;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-align: justify;
                }
            }

        }

        .right {
            display: flex;
            flex-direction: column;

            .container {
                margin-top: 12px;
                width: 240px;
                display: flex;
                justify-content: space-between;

                .pay {
                    height: 126px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        height: 17px;
                        opacity: 0.5;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        font-size: 12px;
                        color: $gray-10;
                        letter-spacing: 0;
                        text-align: justify;
                    }
                }
            }
        }
    }

</style>