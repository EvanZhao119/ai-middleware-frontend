<template>
  <div class="portal-page">
    <!-- Header -->
    <header class="portal-header">
      <h1>🧠 AI Middleware Experiment Portal</h1>
      <p>Upload an image and test backend inference or moderation</p>
    </header>

    <!-- Main Content -->
    <main class="portal-main">
      <!-- Left Control Panel -->
      <section class="control-panel">
        <el-card shadow="hover" class="panel-card">
          <el-tabs v-model="activeTab" type="border-card" stretch>
            <!-- API 模式 -->
            <el-tab-pane label="API" name="api">
              <el-radio-group v-model="apiMode" size="large" style="margin-bottom: 16px;">
                <el-radio-button label="classify">/api/moderation/classify</el-radio-button>
                <el-radio-button label="native">/api/moderation/native</el-radio-button>
              </el-radio-group>
              <UploadPanel
                :path="apiPath"
                :topk="form.topK"
                @update:topk="form.topK = $event"
                showTopk
                @send="(f) => sendPortalRequest('api', f)"
                :loading="loading"
              />
            </el-tab-pane>

            <!-- Flux 模式 -->
            <el-tab-pane label="Flux" name="flux">
              <UploadPanel
                path="/flux/moderation/classify"
                :topk="form.topK"
                @update:topk="form.topK = $event"
                showTopk
                @send="(f) => sendPortalRequest('flux', f)"
                :loading="loading"
              />
            </el-tab-pane>

            <!-- RPC 模式 -->
            <el-tab-pane label="RPC" name="rpc">
              <UploadPanel
                path="/rpc/inference/predict"
                :topk="form.topK"
                @update:topk="form.topK = $event"
                showTopk
                @send="(f) => sendPortalRequest('rpc', f)"
                :loading="loading"
              />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </section>

      <!-- Right Result Panel -->
      <section class="result-panel">
        <el-card shadow="hover" class="panel-card">
          <h3>📦 Response</h3>
          <div v-if="response">
            <div class="summary">
              <p><strong>Top Label:</strong> {{ response.topLabel || response.label }}</p>
              <p><strong>Confidence:</strong> {{ (response.topProb || response.score)?.toFixed?.(4) }}</p>
            </div>

            <!-- ECharts 区域 -->
            <div ref="chart" class="chart"></div>
            <el-divider />

            <!-- 原始 JSON -->
            <el-collapse v-model="activeCollapse">
              <el-collapse-item title="Raw JSON Response" name="json">
                <pre>{{ JSON.stringify(response, null, 2) }}</pre>
              </el-collapse-item>
            </el-collapse>
          </div>
          <el-empty v-else description="No response yet" />
        </el-card>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import UploadPanel from "../components/UploadPanel.vue";
import { useRequest } from "../composables/useRequest";

// 状态管理
const activeTab = ref("api");
const apiMode = ref("classify");
const form = ref({ topK: 5 });
const chart = ref(null);
const activeCollapse = ref(["json"]);
let chartInstance = null;

// 网络请求 Hook
const { loading, response, sendRequest } = useRequest();

// 计算路径
const apiPath = computed(() => `/api/moderation/${apiMode.value}`);

// 发送请求逻辑
const sendPortalRequest = async (impl, file) => {
  if (!file) return ElMessage.error("Please upload an image first!");

  const data = new FormData();
  data.append("impl", impl);
  data.append("file", file);
  data.append("topK", form.value.topK);

  if (impl === "api") data.append("path", apiPath.value);
  else if (impl === "flux") data.append("path", "/flux/moderation/classify");
  else if (impl === "rpc") {
    data.append("path", "/rpc/inference/predict");
  }

  const res = await sendRequest("/v1/run", data);
  if (res) {
    await nextTick();
    renderChart(res);
  }
};

// 绘制 ECharts 柱状图
const renderChart = (res) => {
  if (!res?.topK) return;
  const data = Object.entries(res.topK).map(([k, v]) => ({ name: k, value: v }));
  data.sort((a, b) => a.value - b.value);

  chartInstance ||= echarts.init(chart.value);
  chartInstance.setOption({
    grid: { top: 20, bottom: 60, left: 160, right: 40 },
    xAxis: { type: "value" },
    yAxis: { type: "category", data: data.map((d) => d.name) },
    series: [
      {
        type: "bar",
        data: data.map((d) => d.value),
        itemStyle: { color: "#3b82f6" },
      },
    ],
    tooltip: { trigger: "axis" },
  });
};
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
  text-align: center;
  background: linear-gradient(120deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 主内容区：左右两栏 */
.portal-main {
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* 左边面板（40%） */
.control-panel {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
}

/* 右边结果面板（60%） */
.result-panel {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
}

/* 卡片样式 */
.panel-card {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

/* ECharts 图表区 */
.chart {
  height: 420px;
  width: 100%;
}

/* 响应摘要 */
.summary {
  font-size: 15px;
  margin-bottom: 10px;
}

/* JSON 样式 */
pre {
  background: #1e1e1e;
  color: #e0e0e0;
  border-radius: 6px;
  padding: 10px;
  font-size: 13px;
  overflow-x: auto;
}
</style>
