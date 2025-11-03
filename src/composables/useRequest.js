// src/composables/useRequest.js
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

/**
 * 通用请求 Hook，用于发送文件或 JSON 数据请求
 * 统一处理 loading / error / response 状态
 */
export function useRequest() {
  const loading = ref(false);
  const response = ref(null);
  const error = ref(null);

  /**
   * @param {string} url 请求地址
   * @param {FormData|Object} data 请求数据
   * @param {Object} options 其他 axios 配置项
   */
  const sendRequest = async (url, data, options = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: "Bearer test",
          "Content-Type": data instanceof FormData
            ? "multipart/form-data"
            : "application/json",
          ...options.headers,
        },
        ...options,
      });
      response.value = res.data;
      ElMessage.success("✅ Request successful!");
      return res.data;
    } catch (err) {
      console.error("❌ Request failed:", err);
      ElMessage.error("❌ Request failed");
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, response, error, sendRequest };
}
