import axios from 'axios';

// 动态读取环境变量
const API_BASE_URL = import.meta.env.VITE_API_URL + '/api';

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: API_BASE_URL, // 使用完整的 API 地址
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器（可选）
apiClient.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，比如添加 token
        if (config.data instanceof Object) {
            // 确保所有 POST/PUT/PATCH 请求使用 JSON 格式
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器（可选）
apiClient.interceptors.response.use(
    response => {
        // 对响应数据做处理
        return response.data; // 返回原始响应对象，便于获取 status 等信息
    },
    error => {
        // 统一错误处理
        const errorMessage = {
            code: error.response?.status || 500,
            message: error.message,
            detail: error.response?.data || '网络异常'
        };
        return Promise.reject(errorMessage);
    }
);

/**
 * 封装 GET 请求
 * 支持查询参数和 JSON body 同时传递
 * @param {string} url - 接口路径（如 '/selectTiezi'）
 * @param {Object} [data] - // JSON 数据作为 body 传参（某些后端要求 GET 携带 body）
 * @returns {Promise<*>}
 */
export function get(url, data = {}) {
    return apiClient.get(url, data);
}

/**
 * 封装 POST 请求
 * @param {string} url - 接口路径（如 '/createTiezi'）
 * @param {Object} data - 请求体数据
 * @returns {Promise<*>}
 */
export function post(url, data = {}) {
    return apiClient.post(url, data);
}

/**
 * 封装 PUT 请求
 * @param {string} url - 接口路径（如 '/updateTiezi'）
 * @param {Object} data - 请求体数据
 * @returns {Promise<*>}
 */
export function put(url, data = {}) {
    return apiClient.put(url, data);
}

/**
 * 封装 PATCH 请求
 * 用于部分更新资源
 * @param {string} url - 接口路径（如 '/updateTiezi/1'）
 * @param {Object} data - 需要更新的部分字段
 * @returns {Promise<*>}
 */
export function patch(url, data = {}) {
    return apiClient.patch(url, data);
}

/**
 * 封装 DELETE 请求
 * @param {string} url - 接口路径（如 '/deleteTiezi'）
 * @param {Object} data - 请求体数据
 * @returns {Promise<*>}
 */
export function del(url, data = {}) {
    return apiClient.delete(url, data);
}