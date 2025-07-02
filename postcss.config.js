// PostCSS 配置文件（使用 ES Module 语法）
export default {
    // 插件配置列表
    plugins: {
        // 使用 postcss-preset-env 替代 autoprefixer
        // 它会根据 browserslist 配置自动添加浏览器厂商前缀（如 -webkit-、-moz- 等）
        'postcss-preset-env': {},

        // 将 px 单位自动转换为视口单位（如 vw），用于响应式布局
        'postcss-px-to-viewport': {
            // 设计稿的宽度，通常为 750（移动端）或 1600（PC 端）
            viewportWidth: 1600,

            // 指定需要转换的 CSS 属性单位，默认是 px
            unitToConvert: 'px',

            // 转换后的目标单位，默认是 vw（也可以设为 vh、vmin、vmax）
            viewportUnit: 'vw',

            // 忽略转换的选择器黑名单，例如第三方类名或不希望被转换的组件
            selectorBlackList: ['ignore', 'swiper'],

            // 设置最小像素值，小于等于该值的 px 不会被转换（用于保留细小边框等）
            minPixelValue: 1,

            // 是否转换媒体查询中的 px 值，默认不转换
            mediaQuery: false,

            // 是否直接替换原始样式中的 px 值（true）还是保留原样并新增 vw 样式（false）
            replace: true,

            // 排除不需要处理的文件目录，通常设置为 node_modules
            exclude: /node_modules/i,
        },
    },
};