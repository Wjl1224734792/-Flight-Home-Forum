// 引入 Vue 核心功能
import { createApp } from 'vue';
// 引入根组件 App.vue
import App from './App.vue';
// 引入路由配置
import router from '@/router/index.js';
// 引入 Pinia 状态管理库
import { createPinia } from 'pinia';

//引入iconfont图标
import '@/assets/fonts/icon/iconfont.css';
//全局引入scss文件
import './styles/global.scss';


// 创建 Pinia 实例，用于全局状态管理
const pinia = createPinia();
// 创建 Vue 应用实例
const app = createApp(App);

// 使用路由插件，启用 Vue Router 功能
app.use(router);
// 使用 Pinia 插件，启用全局状态管理
app.use(pinia);

// 将 Vue 应用挂载到 DOM 中 id 为 #app 的元素上
app.mount('#app');
