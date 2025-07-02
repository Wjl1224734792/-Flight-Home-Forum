# 飞行之家 - 基于 Vue3 和 Vite 的留言板应用

## 项目概述

飞行之家是一个基于 Vue3 和 Vite 构建的前端留言板应用，旨在为学习用途的前端开发者提供一个用于学习和展示的留言板功能。该项目使用了现代前端技术栈，包括 Vue3、Vite、Pinia 状态管理、Axios HTTP 库等，以实现响应式布局和流畅的用户体验。

## 目录结构

项目的目录结构如下：

```plaintext
web/
│   ├── .env.development
│   ├── .env.production
│   ├── .gitignore
│   ├── .vscode/
│   │   └── extensions.json
│   ├── index.html
│   ├── mock/
│   │   └── index.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   └── favicon.icon
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── App.vue
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   │   └── icon/
│   │   │   │       ├── demo.css
│   │   │   │       ├── demo_index.html
│   │   │   │       ├── iconfont.css
│   │   │   │       ├── iconfont.js
│   │   │   │       ├── iconfont.json
│   │   │   │       ├── iconfont.ttf
│   │   │   │       ├── iconfont.woff
│   │   │   │       └── iconfont.woff2
│   │   │   ├── images/
│   │   │   │   ├── alipay.jpg
│   │   │   │   ├── demo.svg
│   │   │   │   ├── wechatpay.jpg
│   │   │   │   └── 留言板.svg
│   │   │   └── lottie/
│   │   │       └── loading.json
│   │   ├── components/
│   │   │   ├── CardDetail.vue
│   │   │   ├── FhButton.vue
│   │   │   ├── FhMessage.vue
│   │   │   ├── FhModal.vue
│   │   │   ├── FootBar.vue
│   │   │   ├── NewCard.vue
│   │   │   ├── NoteCard.vue
│   │   │   └── TopBar.vue
│   │   ├── main.js
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── store/
│   │   │   └── index.js
│   │   ├── styles/
│   │   │   ├── global.scss
│   │   │   └── publicVariables.scss
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── data.js
│   │   │   └── fhsg.js
│   │   └── views/
│   │       ├── Home.vue
│   │       └── WallMessage.vue
│   ├── static/
│   ├── vite.config.js
│   ├── 开发文档.md
│   └── 文件目录结构.md
```

## 技术栈

### 前端技术

- **框架**: Vue 3.5.13
- **构建工具**: Vite 6.3.5
- **状态管理**: Pinia 3.0.3
- **路由管理**: Vue Router 4.5.1
- **HTTP库**: Axios 1.10.0
- **CSS预处理器**: Sass 1.89.2
- **动画支持**: Lottie-web 5.13.0
- **Mock方案**: Mockjs 1.1.0
- **PostCSS插件**:
  - `postcss-preset-env`
  - `postcss-px-to-viewport`

### 开发环境

- **Node.js**: v12+
- **包管理器**: npm/yarn/pnpm
- **Vite**: 6.3.5

### 运行环境

- **构建命令**: `npm run build`
- **本地开发**: `npm run dev`
- **预览部署**: `npm run preview`

### 部署要求

- **静态资源服务器**
- **支持ES模块的浏览器环境**

## 主要功能

### 展示留言卡片列表

用户可以查看由其他用户发布的留言卡片列表。每张卡片包含发布者的信息、留言内容、发布时间等。

### 发布新留言

用户可以通过输入框编写新的留言，并选择不同的背景颜色和标签进行发布。

### 查看留言详情

点击某张留言卡片，可以进入详情页面，查看该留言的详细信息，并进行评论或点赞操作。

### 模拟后端接口数据交互

使用 Mock.js 模拟后端 API，实现与后端的数据交互功能，如获取留言列表、发布新留言、评论留言等。

## 关键特性

### 使用 Mock.js 模拟后端 API

在开发阶段，通过 Mock.js 模拟后端接口数据，方便前端快速迭代和测试。

### 支持响应式布局

采用 Flexbox 和 Grid 布局，确保应用在不同设备和屏幕尺寸下都能良好展示。

### 使用 Lottie 动画提升用户体验

引入 Lottie 动画库，为应用添加动态效果，提升整体视觉体验。

### 使用 Pinia 进行状态管理

利用 Pinia 进行全局状态管理，简化组件间的状态传递和管理。

## 快速开始

### 克隆项目

```bash
git clone <repository-url>
cd web
```

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览部署

```bash
npm run preview
```

## 项目配置

### 环境变量

项目中使用了 `.env.development` 和 `.env.production` 来区分开发和生产环境的配置。

### Vite 配置

[vite.config.js](\web\vite.config.js) 中配置了项目的别名、插件等，具体如下：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/publicVariables.scss" as *;',
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### PostCSS 配置

`postcss.config.js` 中配置了 PostCSS 插件，用于自动添加浏览器厂商前缀和将 px 单位转换为视口单位（vw）。

```javascript
export default {
  plugins: {
    'postcss-preset-env': {},
    'postcss-px-to-viewport': {
      viewportWidth: 1600,
      unitToConvert: 'px',
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'swiper'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: /node_modules/i,
    },
  },
}
```

## 代码规范

项目目前没有明确的代码规范文档，建议参考 Vue 官方编码规范和 ESLint 规则进行代码编写。

## 性能要求

项目当前没有具体的性能要求，但在开发过程中应注意优化代码，避免不必要的渲染和网络请求，确保应用的加载速度和响应性能。

