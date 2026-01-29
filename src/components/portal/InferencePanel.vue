<template>
  <div class="inference-layout">
    
    <section class="request-panel">
      <el-card shadow="hover" class="panel-card">
        <h3 class="section-title">⚙️ Request Configuration</h3>

        <div class="config-section">
          <div class="config-item">
            <label class="config-label">Endpoint:</label>
            <div class="endpoint-display">
              <div class="path-label">{{ endpointLabel }}</div>
            </div>
          </div>

          <div class="config-item">
            <label class="config-label">Path:</label>
            <el-input :value="currentPath" readonly />
          </div>

          <div class="config-item">
            <label class="config-label">Upload Image:</label>
            <div v-if="!uploadedImage" class="upload-area-simple">
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                @change="handleFileSelect"
                style="display: none;"
              />
              <div
                class="upload-box"
                @click="triggerFileInput"
                @drop.prevent="handleFileDrop"
                @dragover.prevent
              >
                <el-icon class="upload-icon"><UploadFilled /></el-icon>
                <div class="upload-text">Drop file here or click to upload</div>
                <div class="upload-hint">Support: JPG, PNG, GIF</div>
              </div>
            </div>

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

          <div class="config-item">
            <label class="config-label">Top K:</label>
            <div class="topk-control">
              <el-button :icon="Minus" @click="decreaseTopK" :disabled="form.topK <= 1" />
              <el-input-number v-model="form.topK" :min="1" :max="20" controls-position="right" />
              <el-button :icon="Plus" @click="increaseTopK" :disabled="form.topK >= 20" />
            </div>
          </div>

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

    <section class="response-panel">
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
              <el-tag type="primary" size="large">
                {{ (response.topProb || response.score)?.toFixed?.(4) }}
              </el-tag>
            </div>
          </div>
          <div ref="chartRef" class="chart"></div>
        </div>
        <el-empty v-else description="No response yet" :image-size="120" />
      </el-card>

      <el-card shadow="hover" class="raw-card">
        <h3 class="section-title">📄 Raw Response</h3>
        <div v-if="response" class="json-content">
          <pre class="json-display">{{ JSON.stringify(response, null, 2) }}</pre>
        </div>
        <el-empty v-else description="No response yet" :image-size="120" />
      </el-card>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled, Delete, Picture, Minus, Plus, Position } from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { useRequest } from "../../composables/useRequest"; 

const props = defineProps({
  activeNav: String,
  currentNavItem: Object
});

const { loading, response, sendRequest } = useRequest();
const form = ref({ topK: 5 });
const chartRef = ref(null);
const fileInput = ref(null);
const uploadedImage = ref(null);
const uploadedFile = ref(null);
const uploadedFileName = ref("");
let chartInstance = null;

const currentPath = computed(() => props.currentNavItem.path || "");
const endpointLabel = computed(() => {
  const map = {
    'web-mvc': 'Java Lib (MVC)',
    'jni': 'Java JNI (Native)',
    'web-flux': 'Java WebFlux',
    'grpc': 'Python gRPC'
  };
  return map[props.activeNav] || 'Unknown Endpoint';
});

watch(() => props.activeNav, () => {
  response.value = null;
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  nextTick(() => {
    chartRef.value = null;
  });
});

const triggerFileInput = () => fileInput.value?.click();
const handleFileSelect = (event) => { const file = event.target.files?.[0]; if (file) processFile(file); };
const handleFileDrop = (event) => { const file = event.dataTransfer?.files?.[0]; if (file) processFile(file); };

const processFile = (file) => {
  if (!file.type.startsWith("image/")) return ElMessage.error("Please upload an image file!");
  if (file.size / 1024 / 1024 > 10) return ElMessage.error("Image size must be less than 10MB!");
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    uploadedFile.value = file;
    uploadedFileName.value = file.name;
    ElMessage.success("Image uploaded successfully!");
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  uploadedImage.value = null;
  uploadedFile.value = null;
  uploadedFileName.value = "";
  if (fileInput.value) fileInput.value.value = "";
  ElMessage.success("Image removed");
};

const decreaseTopK = () => { if (form.value.topK > 1) form.value.topK--; };
const increaseTopK = () => { if (form.value.topK < 20) form.value.topK++; };

const handleSendRequest = async () => {
  if (!uploadedFile.value) { ElMessage.error("Please upload an image first!"); return; }
  const nav = props.currentNavItem;
  if (!nav || !nav.impl) return;

  const data = new FormData();
  data.append("impl", nav.impl);
  data.append("file", uploadedFile.value);
  data.append("topK", form.value.topK);
  data.append("path", nav.path);
  data.append("method", "POST");

  const res = await sendRequest("/v1/run", data);
  if (res) {
    await nextTick();
    renderChart(res);
  }
};

const renderChart = (res) => {
  if (!res?.topK || !chartRef.value) return;
  const data = Object.entries(res.topK).map(([k, v]) => ({ name: k, value: v })).sort((a, b) => a.value - b.value);
  if (!chartInstance) chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption({
    grid: { top: 20, bottom: 60, left: 160, right: 40 },
    xAxis: { type: "value", axisLabel: { formatter: "{value}" } },
    yAxis: { type: "category", data: data.map((d) => d.name), axisLabel: { fontSize: 12 } },
    series: [{
      type: "bar",
      data: data.map((d) => d.value),
      itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#667eea" }, { offset: 1, color: "#764ba2" }]) },
      label: { show: true, position: "right", formatter: "{c}" },
    }],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  });
};

onUnmounted(() => { if (chartInstance) { chartInstance.dispose(); chartInstance = null; } });
</script>

<style scoped>
/* 核心布局修复：确保这是 Row 布局 */
.inference-layout {
  display: flex;
  flex-direction: row; /* 强制左右排列 */
  height: 100%;
  width: 100%;
  gap: 16px;
  overflow: hidden;
}

/* 左侧宽度固定 */
.request-panel {
  flex: 0 0 420px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 右侧自适应，且内部上下排列 */
.response-panel {
  flex: 1;
  display: flex;
  flex-direction: column; /* 右侧内部上下排列 */
  gap: 16px;
  overflow: hidden;
}

/* 通用 Card 样式 */
.panel-card { height: 100%; display: flex; flex-direction: column; }
.panel-card :deep(.el-card__body) { flex: 1; display: flex; flex-direction: column; overflow: auto; padding: 24px; }
.section-title { font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; }

/* 左侧配置项样式 */
.config-section { display: flex; flex-direction: column; gap: 20px; }
.config-item { display: flex; flex-direction: column; gap: 8px; }
.config-label { font-size: 14px; font-weight: 600; color: #374151; display: block; }
.path-label { background-color: #409eff; color: #ffffff; font-weight: 600; padding: 8px 14px; border-radius: 6px; border: 1px solid #409eff; font-family: monospace; width: fit-content; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }
.topk-control { display: flex; align-items: center; gap: 12px; }
.topk-control :deep(.el-input-number) { flex: 1; }
.send-button { width: 100%; height: 44px; font-size: 16px; font-weight: 600; margin-top: 8px; }

/* 上传框样式 */
.upload-area-simple { width: 100%; box-sizing: border-box; }
.upload-box { width: 100%; padding: 40px 20px; border: 2px dashed #d1d5db; border-radius: 8px; background: #f9fafb; transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; box-sizing: border-box; }
.upload-box:hover { border-color: #667eea; background: #f0f4ff; }
.upload-icon { font-size: 48px; color: #9ca3af; }
.upload-text { font-size: 14px; color: #374151; font-weight: 500; }
.upload-hint { font-size: 12px; color: #9ca3af; }
.image-preview-container { width: 100%; }
.image-preview { position: relative; width: 100%; border-radius: 8px; overflow: hidden; background: #f3f4f6; border: 2px solid #e5e7eb; }
.image-preview img { width: 100%; height: 280px; object-fit: contain; display: block; }
.image-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
.image-preview:hover .image-overlay { opacity: 1; }
.image-info { display: flex; align-items: center; gap: 8px; margin-top: 8px; padding: 8px 12px; background: #f0f9ff; border-radius: 6px; font-size: 13px; color: #0369a1; }

/* 右侧内部卡片样式 */
.chart-card { flex: 0 0 55%; display: flex; flex-direction: column; overflow: hidden; }
.raw-card { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.chart-card :deep(.el-card__body), .raw-card :deep(.el-card__body) { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 24px; }
.chart-content, .json-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.summary { display: flex; gap: 16px; margin-bottom: 20px; padding: 16px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 8px; border-left: 4px solid #0ea5e9; }
.summary-item { display: flex; align-items: center; gap: 8px; }
.summary-label { font-size: 14px; font-weight: 600; color: #374151; }
.chart { flex: 1; width: 100%; min-height: 0; }
.json-display { flex: 1; background: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 20px; font-size: 13px; font-family: monospace; overflow: auto; margin: 0; line-height: 1.6; }
.json-display::-webkit-scrollbar { width: 8px; height: 8px; }
.json-display::-webkit-scrollbar-track { background: #0f172a; border-radius: 4px; }
.json-display::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
</style>