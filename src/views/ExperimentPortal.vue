<template>
  <div class="portal-page">
    <!-- 顶部标题栏 - Shannon Hub -->
    <header class="portal-header">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-icon">▼</span>
          <h1>Shannon Hub AI Engineering Lab</h1>
        </div>
        <p class="subtitle">AI Middleware Experiment Portal - Upload an image and test backend inference or moderation</p>
      </div>
    </header>

    <!-- 主内容区：三栏布局 -->
    <main class="portal-main">
      
      <!-- 左侧导航栏 -->
      <aside class="navigation-sidebar">
        <h3 class="nav-title">Navigation</h3>
        <nav class="nav-list">
          <button
            v-for="item in navItems"
            :key="item.id"
            :class="['nav-item', { active: activeNav === item.id }]"
            @click="switchNav(item)"
          >
            {{ item.label }}
          </button>
        </nav>
      </aside>

      <!-- 中间请求配置区域 -->
      <section class="request-panel">
        <el-card shadow="hover" class="panel-card">
          <h3 class="section-title">⚙️ Request Configuration</h3>
          
          <div class="config-section">
            <!-- 【修复】所有模式都显示 Endpoint -->
            <div class="config-item">
              <label class="config-label">Endpoint:</label>
              
              <!-- Web MVC 特殊处理：显示可切换的按钮 -->
              <div v-if="activeNav === 'web-mvc'" class="endpoint-selector">
                <el-radio-group v-model="apiMode" size="default">
                  <el-radio-button label="classify">Java Lib</el-radio-button>
                  <el-radio-button label="native">Java JNI</el-radio-button>
                </el-radio-group>
              </div>
              
              <!-- 其他模式：只显示路径文本 -->
              <div v-else class="endpoint-display">
                <el-input :value="currentPath" readonly />
              </div>
            </div>

            <!-- Path 显示 -->
            <div class="config-item">
              <label class="config-label">Path:</label>
              <el-input :value="currentPath" readonly />
            </div>

            <!-- 图片上传区域 -->
            <div class="config-item">
              <label class="config-label">Upload Image:</label>
              
              <!-- 未上传：显示上传区域 -->
              <div v-if="!uploadedImage" class="upload-area-simple">
                <input 
                  type="file" 
                  ref="fileInput"
                  accept="image/*"
                  @change="handleFileSelect"
                  style="display: none;"
                />
                <div class="upload-box" @click="triggerFileInput" @drop.prevent="handleFileDrop" @dragover.prevent>
                  <el-icon class="upload-icon"><UploadFilled /></el-icon>
                  <div class="upload-text">Drop file here or click to upload</div>
                  <div class="upload-hint">Support: JPG, PNG, GIF</div>
                </div>
              </div>
              
              <!-- 已上传：显示图片预览和删除按钮 -->
              <div v-else class="image-preview-container">
                <div class="image-preview">
                  <img :src="uploadedImage" alt="Uploaded Image" />
                  <div class="image-overlay">
                    <el-button 
                      type="danger" 
                      :icon="Delete" 
                      circle 
                      size="large"
                      @click="removeImage"
                    />
                  </div>
                </div>
                <div class="image-info">
                  <el-icon><Picture /></el-icon>
                  <span>{{ uploadedFileName }}</span>
                </div>
              </div>
            </div>

            <!-- Top K 配置 -->
            <div class="config-item">
              <label class="config-label">Top K:</label>
              <div class="topk-control">
                <el-button 
                  :icon="Minus" 
                  @click="decreaseTopK"
                  :disabled="form.topK <= 1"
                />
                <el-input-number 
                  v-model="form.topK" 
                  :min="1" 
                  :max="20"
                  controls-position="right"
                />
                <el-button 
                  :icon="Plus" 
                  @click="increaseTopK"
                  :disabled="form.topK >= 20"
                />
              </div>
            </div>

            <!-- 发送按钮 -->
            <el-button 
              type="primary" 
              size="large"
              :loading="loading"
              @click="handleSendRequest"
              class="send-button"
              :disabled="!uploadedImage"
            >
              <el-icon v-if="!loading"><Position /></el-icon>
              {{ loading ? 'Sending Request...' : 'Send Request' }}
            </el-button>
          </div>
        </el-card>
      </section>

      <!-- 右侧响应区域 -->
      <section class="response-panel">
        <!-- Bar Chart 卡片 -->
        <el-card shadow="hover" class="chart-card">
          <h3 class="section-title">📊 Bar Chart</h3>
          <div v-if="response" class="chart-content">
            <div class="summary">
              <div class="summary-item">
                <span class="summary-label">Top Label:</span>
                <el-tag type="success" size="large">{{ response.topLabel || response.label }}</el-tag>
              </div>
              <div class="summary-item">
                <span class="summary-label">Confidence:</span>
                <el-tag type="primary" size="large">{{ (response.topProb || response.score)?.toFixed?.(4) }}</el-tag>
              </div>
            </div>
            <div ref="chartRef" class="chart"></div>
          </div>
          <el-empty v-else description="No response yet" :image-size="120" />
        </el-card>

        <!-- Raw Response 卡片 -->
        <el-card shadow="hover" class="raw-card">
          <h3 class="section-title">📄 Raw Response</h3>
          <div v-if="response" class="json-content">
            <pre class="json-display">{{ JSON.stringify(response, null, 2) }}</pre>
          </div>
          <el-empty v-else description="No response yet" :image-size="120" />
        </el-card>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { 
  UploadFilled, 
  Delete, 
  Picture, 
  Minus, 
  Plus, 
  Position 
} from '@element-plus/icons-vue';
import * as echarts from "echarts";
import { useRequest } from "../composables/useRequest";

const { loading, response, sendRequest } = useRequest();

// 导航配置数组
const navItems = ref([
  {
    id: 'web-mvc',
    label: 'Web MVC',
    impl: 'api',
    defaultPath: '/api/moderation/classify'
  },
  {
    id: 'web-flux',
    label: 'Web Flux',
    impl: 'flux',
    defaultPath: '/flux/moderation/classify'
  },
  {
    id: 'rpc-python',
    label: 'RPC Python',
    impl: 'rpc',
    defaultPath: '/rpc/inference/predict'
  }
]);

// 状态管理
const activeNav = ref('web-mvc');
const apiMode = ref("classify");
const form = ref({ topK: 5 });
const chartRef = ref(null);
const fileInput = ref(null);
const uploadedImage = ref(null);
const uploadedFile = ref(null);
const uploadedFileName = ref('');
let chartInstance = null;

// 计算当前路径
const currentPath = computed(() => {
  const currentNav = navItems.value.find(item => item.id === activeNav.value);
  if (activeNav.value === 'web-mvc') {
    return `/api/moderation/${apiMode.value}`;
  }
  return currentNav?.defaultPath || '';
});

// 切换导航
const switchNav = (item) => {
  activeNav.value = item.id;
  response.value = null;
  if (chartInstance) {
    chartInstance.clear();
  }
};

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    processFile(file);
  }
};

// 处理文件拖拽
const handleFileDrop = (event) => {
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    processFile(file);
  }
};

// 处理文件
const processFile = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('Please upload an image file!');
    return;
  }

  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    ElMessage.error('Image size must be less than 10MB!');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    uploadedFile.value = file;
    uploadedFileName.value = file.name;
    ElMessage.success('Image uploaded successfully!');
  };
  reader.readAsDataURL(file);
};

// 删除图片
const removeImage = () => {
  uploadedImage.value = null;
  uploadedFile.value = null;
  uploadedFileName.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  ElMessage.success('Image removed');
};

// Top K 控制
const decreaseTopK = () => {
  if (form.value.topK > 1) form.value.topK--;
};

const increaseTopK = () => {
  if (form.value.topK < 20) form.value.topK++;
};

const handleSendRequest = async () => {
  if (!uploadedFile.value) {
    ElMessage.error("Please upload an image first!");
    return;
  }

  const currentNav = navItems.value.find(item => item.id === activeNav.value);
  if (!currentNav) return;

  const data = new FormData();
  data.append("impl", currentNav.impl);
  data.append("file", uploadedFile.value);
  data.append("topK", form.value.topK);
  data.append("path", currentPath.value);

  // 使用原来的 sendRequest 方法
  const res = await sendRequest("/v1/run", data);
  if (res) {
    await nextTick();
    renderChart(res);
  }
};

// 绘制 ECharts 柱状图
const renderChart = (res) => {
  if (!res?.topK || !chartRef.value) return;
  
  const data = Object.entries(res.topK).map(([k, v]) => ({ name: k, value: v }));
  data.sort((a, b) => a.value - b.value);

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }
  
  chartInstance.setOption({
    grid: { top: 20, bottom: 60, left: 160, right: 40 },
    xAxis: { 
      type: "value",
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: { 
      type: "category", 
      data: data.map((d) => d.name),
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        type: "bar",
        data: data.map((d) => d.value),
        itemStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' }
          ])
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}'
        }
      },
    ],
    tooltip: { 
      trigger: "axis",
      axisPointer: {
        type: 'shadow'
      }
    },
  });
};

// 组件卸载时销毁图表
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
.portal-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #f7f9fc;
  overflow: hidden;
}

/* 顶部标题栏 */
.portal-header {
  flex: 0 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logo-section h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.95;
  margin: 0;
  font-weight: 400;
}

/* 主内容区 */
.portal-main {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* 左侧导航栏 */
.navigation-sidebar {
  flex: 0 0 200px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.nav-title {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  margin: 0 0 12px 0;
  letter-spacing: 0.5px;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.nav-item:hover {
  background: #e5e7eb;
  transform: translateX(2px);
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

/* 中间请求面板 */
.request-panel {
  flex: 0 0 420px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 配置项样式 */
.config-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.config-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  display: block;
}

.endpoint-selector :deep(.el-radio-group) {
  width: 100%;
  display: flex;
}

.endpoint-selector :deep(.el-radio-button) {
  flex: 1;
}

.endpoint-selector :deep(.el-radio-button__inner) {
  width: 100%;
  font-size: 12px;
}

.endpoint-display {
  width: 100%;
}

/* 上传区域 - 简化版 */
.upload-area-simple {
  width: 100%;
  box-sizing: border-box;
}

.upload-box {
  width: 100%;
  padding: 40px 20px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

.upload-box:hover {
  border-color: #667eea;
  background: #f0f4ff;
}

.upload-icon {
  font-size: 48px;
  color: #9ca3af;
}

.upload-text {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.upload-hint {
  font-size: 12px;
  color: #9ca3af;
}

/* 图片预览样式 */
.image-preview-container {
  width: 100%;
}

.image-preview {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
}

.image-preview img {
  width: 100%;
  height: 280px;
  object-fit: contain;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.image-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 12px;
  background: #f0f9ff;
  border-radius: 6px;
  font-size: 13px;
  color: #0369a1;
}

/* Top K 控制 */
.topk-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topk-control :deep(.el-input-number) {
  flex: 1;
}

/* 发送按钮 */
.send-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
}

/* 右侧响应面板 */
.response-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}

.chart-card {
  flex: 0 0 55%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.raw-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-card :deep(.el-card__body),
.raw-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 24px;
}

.chart-content,
.json-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 摘要样式 */
.summary {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  border-left: 4px solid #0ea5e9;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

/* ECharts 图表 */
.chart {
  flex: 1;
  width: 100%;
  min-height: 0;
}

/* JSON 显示 */
.json-display {
  flex: 1;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  overflow: auto;
  margin: 0;
  line-height: 1.6;
}

/* 滚动条样式 */
.json-display::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.json-display::-webkit-scrollbar-track {
  background: #0f172a;
  border-radius: 4px;
}

.json-display::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.json-display::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>