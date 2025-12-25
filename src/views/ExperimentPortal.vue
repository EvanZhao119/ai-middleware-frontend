<template>
  <div class="portal-page">
    <header class="portal-header">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-icon">▼</span>
          <h1>Shannon Hub AI Engineering Lab</h1>
        </div>
        <p class="subtitle">
          AI Middleware Experiment Portal - Upload an image and test backend inference or moderation
        </p>
      </div>
    </header>

    <main class="portal-main">
      <aside class="navigation-sidebar">
        <nav class="nav-list">
          <template v-for="(item, index) in navStructure" :key="index">
            <div v-if="item.type === 'header'" class="nav-category-header">
              {{ item.label }}
            </div>

            <button
              v-else
              :class="['nav-item', { active: activeNav === item.id }]"
              @click="switchNav(item)"
            >
              <span class="nav-icon" v-if="item.id === 'overview'">🏠</span>
              
              <span class="nav-indent" v-else>├─</span>
              
              {{ item.label }}
            </button>
          </template>
        </nav>
      </aside>

      <template v-if="activeNav === 'overview'">
        <section class="overview-panel">
          <el-card shadow="hover" class="overview-card">
            <div class="welcome-header">
              <span class="welcome-icon">👋</span>
              <h2>Welcome to Shannon Hub</h2>
              <p>Select a system from the left sidebar to begin testing.</p>
            </div>
            
            <div class="system-status-grid">
              <div class="status-item">
                <div class="status-label">AI Systems</div>
                <div class="status-value success">4 Online</div>
                <div class="status-desc">Inference Backends</div>
              </div>

              <div class="status-item">
                <div class="status-label">AI Agents</div>
                <div class="status-value warning">1 Experimental</div>
                <div class="status-desc">Autonomous Agents</div>
              </div>

              <div class="status-item">
                <div class="status-label">Products</div>
                <div class="status-value food">1 Active</div>
                <div class="status-desc">Smart Applications</div>
              </div>

              <div class="status-item">
                <div class="status-label">Data Analysis</div>
                <div class="status-value teal">1 Dashboard</div>
                <div class="status-desc">Real-time Intelligence</div>
              </div>
            </div>
          </el-card>
        </section>
      </template>

      <template v-else-if="activeNav === 'opspanel'">
        <section class="demo-panel">
          <el-card shadow="hover" class="demo-card opspanel-card">
            <div class="opspanel-hero">
              <div class="hero-badge">OPEN SOURCE</div>
              <h1 class="hero-title">
                OpsPanel <span class="gradient-text">Intelligence</span>
              </h1>
              <p class="hero-subtitle">
                A unified, extensible Ops + AI platform designed to streamline system management, automation, and data insights.
              </p>
            </div>

            <div class="opspanel-body">
              <div class="feature-section">
                <h3 class="section-header">Key Capabilities</h3>
                <div class="feature-list">
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-blue">
                      <el-icon><UserFilled /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Enterprise-Grade RBAC</div>
                      <div class="feature-desc">Fine-grained permission control with flexible User-Role-Menu mappings.</div>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-purple">
                      <el-icon><Menu /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Dynamic Module Architecture</div>
                      <div class="feature-desc">Scalable menu management allowing runtime configuration of modules.</div>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-orange">
                      <el-icon><Timer /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Distributed Job Scheduling</div>
                      <div class="feature-desc">Reliable task execution monitoring with real-time tracking.</div>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-green">
                      <el-icon><Monitor /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Unified Observability</div>
                      <div class="feature-desc">Centralized logging center for diagnostics and audit trails.</div>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-red">
                      <el-icon><Cpu /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">AI-Native Integration</div>
                      <div class="feature-desc">Built-in middleware layer bridging Ops with AI model inference.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="demo-cta-section">
                <div class="cta-box">
                  <div class="cta-header">
                    <h3>🚀 Live Experience</h3>
                    <p>Instant access to the admin console.</p>
                  </div>
                  <div class="credential-panel">
                    <div class="cred-row">
                      <span class="cred-label">Username</span>
                      <code class="cred-value">admin</code>
                    </div>
                    <div class="cred-row">
                      <span class="cred-label">Password</span>
                      <code class="cred-value">admin</code>
                    </div>
                  </div>
                  <div class="action-buttons">
                    <el-button type="primary" size="large" class="launch-btn" @click="openUrl(OPSPANEL_DEMO_URL)">
                      Launch Demo Portal
                      <el-icon class="el-icon--right"><Position /></el-icon>
                    </el-button>
                    <el-button size="large" class="github-btn" @click="openUrl(OPSPANEL_GITHUB_URL)">
                      <span class="github-icon">GitHub</span>
                    </el-button>
                  </div>
                  <div class="link-footer">
                    <a :href="OPSPANEL_DEMO_URL" target="_blank" rel="noopener noreferrer">{{ OPSPANEL_DEMO_URL }}</a>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </section>
      </template>

      <template v-else-if="activeNav === 'maceats'">
        <section class="demo-panel">
          <el-card shadow="hover" class="demo-card opspanel-card">
            <div class="opspanel-hero">
              <div class="hero-badge badge-orange">CAMPUS LIFE</div>
              <h1 class="hero-title">
                MacEats <span class="gradient-text-food">Smart Dining</span>
              </h1>
              <p class="hero-subtitle">
                An intelligent restaurant recommendation system for McMaster University students, powered by user preference analysis and feedback loops.
              </p>
            </div>

            <div class="opspanel-body">
              <div class="feature-section">
                <h3 class="section-header">How it works</h3>
                <div class="feature-list">
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-orange">
                      <el-icon><KnifeFork /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">1. Define Your Cravings</div>
                      <div class="feature-desc">
                        Select multiple categories (e.g., Ramen, Burgers, Bubble Tea) based on what you want to eat right now.
                      </div>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-red">
                      <el-icon><MagicStick /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">2. AI Recommendation</div>
                      <div class="feature-desc">
                        The system filters the best rated restaurants around McMaster campus that match your specific combination of cravings.
                      </div>
                    </div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-icon-wrapper color-purple">
                      <el-icon><DataLine /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">3. Feedback & Training</div>
                      <div class="feature-desc">
                        After the recommendation, you confirm your final choice. We collect this data to refine the model's future accuracy.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="demo-cta-section">
                <div class="cta-box cta-food-theme">
                  <div class="cta-header">
                    <h3>🍔 Hungry?</h3>
                    <p>Find the perfect spot in seconds.</p>
                  </div>
                  <div class="app-preview-text">
                    Supported Categories:
                    <div class="tag-cloud">
                      <span>🍜 Ramen</span>
                      <span>🌮 Tacos</span>
                      <span>☕ Café</span>
                      <span>🍕 Pizza</span>
                    </div>
                  </div>
                  <div class="action-buttons">
                    <el-button type="warning" size="large" class="launch-btn food-btn" @click="openUrl(MACEATS_URL)">
                      Find Food Now
                      <el-icon class="el-icon--right"><Position /></el-icon>
                    </el-button>
                  </div>
                  <div class="link-footer">
                    <a :href="MACEATS_URL" target="_blank" rel="noopener noreferrer">{{ MACEATS_URL }}</a>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </section>
      </template>

      <template v-else-if="activeNav === 'agent-s'">
        <section class="demo-panel">
          <el-card shadow="hover" class="demo-card">
            <h3 class="section-title">🎬 Agent S Demo</h3>
            <div class="agent-demo-wrapper">
              <iframe
                class="agent-demo-frame"
                src="https://www.youtube.com/embed/Dc9ltHlA06M"
                title="Agent S Demo"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </el-card>
        </section>
      </template>

      <template v-else-if="activeNav === 'hsr-grafana'">
        <section class="demo-panel">
          <el-card shadow="hover" class="demo-card opspanel-card">
            
            <div class="hsr-hero-banner">
              <div class="hero-badge badge-white-outline">
                <el-icon><DataAnalysis /></el-icon> CITY ANALYTICS
              </div>
              <h1 class="hero-title white-text">
                HSR OpsPanel Intelligent Transit
              </h1>
              <p class="hero-subtitle white-text-alpha">
                A real-time transit data platform leveraging AI for delay prediction, route efficiency analysis, and network health monitoring.
              </p>
            </div>

            <div class="opspanel-body">
              <div class="feature-section">
                <div class="hsr-feature-header">
                   <el-icon class="bulb-icon"><Opportunity /></el-icon> 
                   <h3>Key Capabilities</h3>
                </div>
                
                <div class="feature-list hsr-list">
                  <div class="feature-item hsr-item">
                    <div class="feature-icon-wrapper bg-purple-light">
                      <el-icon class="icon-purple"><Van /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Real-Time Tracker</div>
                      <div class="feature-desc">Live map visualization of all active HSR buses and routes.</div>
                    </div>
                  </div>
                  <div class="feature-item hsr-item">
                    <div class="feature-icon-wrapper bg-purple-light">
                      <el-icon class="icon-purple"><Cpu /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">AI Delay Prediction</div>
                      <div class="feature-desc">Machine learning models forecasting bus arrival times versus schedule.</div>
                    </div>
                  </div>
                  <div class="feature-item hsr-item">
                    <div class="feature-icon-wrapper bg-purple-light">
                      <el-icon class="icon-purple"><TrendCharts /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Route Efficiency</div>
                      <div class="feature-desc">Analysis of fastest, slowest, and busiest routes.</div>
                    </div>
                  </div>
                  <div class="feature-item hsr-item">
                    <div class="feature-icon-wrapper bg-purple-light">
                      <el-icon class="icon-purple"><Odometer /></el-icon>
                    </div>
                    <div class="feature-content">
                      <div class="feature-title">Network Risk Level</div>
                      <div class="feature-desc">Overall system health score and congestion alerts.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="demo-cta-section">
                <div class="cta-box cta-hsr-theme">
                  <div class="cta-header-purple">
                    <h3>🚀 Live Experience</h3>
                  </div>
                  <div class="cta-body-white">
                    <p class="cta-main-text">Instant access to live data visualization.</p>
                    
                    <div class="metrics-preview">
                        <span class="metric-label">Data Availability:</span>
                        <div class="metric-val">
                          Real-time Fleet Count | Dynamic Risk Score
                        </div>
                    </div>

                    <div class="action-buttons">
                        <el-button type="primary" size="large" class="launch-btn purple-btn" @click="openUrl('https://evanzhao119.grafana.net/public-dashboards/31e3e2b9b16743529577e5db5cdb3db9')">
                        Launch Live Dashboard
                        <el-icon class="el-icon--right"><Link /></el-icon>
                        </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </section>
      </template>

      <template v-else>
        <section class="request-panel">
          <el-card shadow="hover" class="panel-card">
            <h3 class="section-title">⚙️ Request Configuration</h3>

            <div class="config-section">
              <div class="config-item">
                <label class="config-label">Endpoint:</label>
                <div class="endpoint-display">
                  <div class="path-label">
                    {{ getEndpointLabel(activeNav) }}
                  </div>
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
      </template>
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
  Position,
  UserFilled,
  Menu,
  Timer,
  Monitor,
  Cpu,
  KnifeFork,
  MagicStick,
  DataLine,
  // New Icons for HSR
  Van,
  TrendCharts,
  Odometer,
  Opportunity,
  DataAnalysis,
  Link
} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { useRequest } from "../composables/useRequest";

const { loading, response, sendRequest } = useRequest();

/**
 * Navigation Data Structure
 */
const navStructure = ref([
  { type: "item", id: "overview", label: "Overview", impl: null },
  
  { type: "header", label: "AI Systems" },
  { type: "item", id: "web-mvc", label: "Web MVC", impl: "api", path: "/api/moderation/classify" },
  { type: "item", id: "jni", label: "JNI", impl: "api", path: "/api/moderation/native" },
  { type: "item", id: "web-flux", label: "WebFlux", impl: "flux", path: "/flux/moderation/classify" },
  { type: "item", id: "grpc", label: "gRPC", impl: "rpc", path: "/rpc/inference/predict" },

  { type: "header", label: "AI Agents" },
  { type: "item", id: "agent-s", label: "Agent S", impl: null },

  { type: "header", label: "Architecture + Intelligence" },
  { type: "item", id: "opspanel", label: "OpsPanel", impl: null },

  { type: "header", label: "Products" },
  { type: "item", id: "maceats", label: "MacEats", impl: null },

  // --- Data Analysis 区域 ---
  { type: "header", label: "Data Analysis" },
  { 
    type: "item", 
    id: "hsr-grafana", 
    label: "HSR OpsPanel: Real-time Intelligence", 
    impl: null 
  }
]);

// URL Constants
const OPSPANEL_DEMO_URL = "https://macstuforum.top/opspanel";
const OPSPANEL_GITHUB_URL = "https://github.com/EvanZhao119/OpsPanel";
const MACEATS_URL = "https://macstuforum.top/maceats/";

// State
const activeNav = ref("overview"); 
const form = ref({ topK: 5 });
const chartRef = ref(null);
const fileInput = ref(null);
const uploadedImage = ref(null);
const uploadedFile = ref(null);
const uploadedFileName = ref("");

let chartInstance = null;

// Computed Properties
const currentNavItem = computed(() => {
  return navStructure.value.find(item => item.id === activeNav.value) || {};
});

const currentPath = computed(() => {
  return currentNavItem.value.path || "";
});

// Helper
const getEndpointLabel = (id) => {
  const map = {
    'web-mvc': 'Java Lib (MVC)',
    'jni': 'Java JNI (Native)',
    'web-flux': 'Java WebFlux',
    'grpc': 'Python gRPC'
  };
  return map[id] || 'Unknown Endpoint';
};

// Switch Navigation
const switchNav = (item) => {
  activeNav.value = item.id;
  response.value = null;

  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  nextTick(() => {
    chartRef.value = null;
  });
};

const openUrl = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

// File Handling
const triggerFileInput = () => fileInput.value?.click();

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) processFile(file);
};

const handleFileDrop = (event) => {
  const file = event.dataTransfer?.files?.[0];
  if (file) processFile(file);
};

const processFile = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) return ElMessage.error("Please upload an image file!");
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

// Top K Controls
const decreaseTopK = () => { if (form.value.topK > 1) form.value.topK--; };
const increaseTopK = () => { if (form.value.topK < 20) form.value.topK++; };

// Send Request
const handleSendRequest = async () => {
  if (!uploadedFile.value) {
    ElMessage.error("Please upload an image first!");
    return;
  }

  const nav = currentNavItem.value;
  if (!nav || !nav.impl) return;

  const data = new FormData();
  data.append("impl", nav.impl);
  data.append("file", uploadedFile.value);
  data.append("topK", form.value.topK);
  data.append("path", nav.path);

  const res = await sendRequest("/v1/run", data);
  if (res) {
    await nextTick();
    renderChart(res);
  }
};

// Chart Rendering
const renderChart = (res) => {
  if (!res?.topK || !chartRef.value) return;

  const data = Object.entries(res.topK).map(([k, v]) => ({ name: k, value: v }));
  data.sort((a, b) => a.value - b.value);

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }

  chartInstance.setOption({
    grid: { top: 20, bottom: 60, left: 160, right: 40 },
    xAxis: { type: "value", axisLabel: { formatter: "{value}" } },
    yAxis: { type: "category", data: data.map((d) => d.name), axisLabel: { fontSize: 12 } },
    series: [
      {
        type: "bar",
        data: data.map((d) => d.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#667eea" },
            { offset: 1, color: "#764ba2" },
          ]),
        },
        label: { show: true, position: "right", formatter: "{c}" },
      },
    ],
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  });
};

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
/* =========================================
   Global & Layout Styles
   ========================================= */
.portal-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #f7f9fc;
  overflow: hidden;
}

/* Header */
.portal-header {
  flex: 0 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.header-content { max-width: 1400px; margin: 0 auto; }
.logo-section { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.logo-icon { font-size: 32px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)); }
.logo-section h1 { font-size: 32px; font-weight: 700; margin: 0; letter-spacing: 0.5px; }
.subtitle { font-size: 14px; opacity: 0.95; margin: 0; font-weight: 400; }

/* Main Area */
.portal-main {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* Sidebar */
.navigation-sidebar {
  flex: 0 0 240px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.nav-list { display: flex; flex-direction: column; gap: 4px; }

.nav-category-header {
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  margin: 16px 0 8px 12px;
  letter-spacing: 0.8px;
}

.nav-item {
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-indent { color: #d1d5db; font-family: monospace; font-size: 16px; }
.nav-icon { font-size: 16px; }

.nav-item:hover { background: #f3f4f6; color: #111827; }
.nav-item.active {
  background: linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%);
  color: #764ba2;
  font-weight: 600;
  border-left: 3px solid #764ba2;
}

/* Overview Panel */
.overview-panel { flex: 1; display: flex; flex-direction: column; }
.overview-card { height: 100%; }
.overview-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 40px;
}
.welcome-header { text-align: center; margin-bottom: 20px; }
.welcome-icon { font-size: 48px; display: block; margin-bottom: 16px; animation: wave 2s infinite; transform-origin: 70% 70%; }
.welcome-header h2 { font-size: 32px; color: #1f2937; margin-bottom: 12px; }
.welcome-header p { color: #6b7280; font-size: 16px; }

@keyframes wave {
  0% { transform: rotate( 0.0deg) }
  10% { transform: rotate(14.0deg) }
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}

.system-status-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; width: 100%; max-width: 1000px; }
.status-item {
  background: #ffffff; padding: 24px 16px; border-radius: 16px; text-align: center; border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); transition: transform 0.2s, box-shadow 0.2s;
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px;
}
.status-item:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.status-label { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.status-value { font-size: 24px; font-weight: 800; color: #334155; line-height: 1.2; }
.status-desc { font-size: 13px; color: #64748b; font-weight: 500; }

.status-value.success { color: #10b981; }
.status-value.warning { color: #f59e0b; }
.status-value.purple { color: #8b5cf6; }
.status-value.food { color: #f97316; }
.status-value.teal { color: #14b8a6; }

@media (max-width: 1000px) {
  .system-status-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Demo & Request Panels (Shared) */
.demo-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.demo-card { height: 100%; display: flex; flex-direction: column; }
.demo-card :deep(.el-card__body) { flex: 1; display: flex; flex-direction: column; padding: 24px; }

/* Agent S Demo */
.agent-demo-wrapper { position: relative; width: 100%; max-width: 1100px; margin: 0 auto; flex: 1; padding-top: 56.25%; border-radius: 8px; overflow: hidden; background: #000; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); }
.agent-demo-frame { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }

/* Request Config Styles */
.request-panel { flex: 0 0 420px; display: flex; flex-direction: column; overflow: hidden; }
.panel-card { height: 100%; display: flex; flex-direction: column; }
.panel-card :deep(.el-card__body) { flex: 1; display: flex; flex-direction: column; overflow: auto; padding: 24px; }
.section-title { font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; }

.config-section { display: flex; flex-direction: column; gap: 20px; }
.config-item { display: flex; flex-direction: column; gap: 8px; }
.config-label { font-size: 14px; font-weight: 600; color: #374151; display: block; }
.path-label {
  background-color: #409eff; color: #ffffff; font-weight: 600; padding: 8px 14px;
  border-radius: 6px; border: 1px solid #409eff; font-family: monospace;
  width: fit-content; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.upload-area-simple { width: 100%; box-sizing: border-box; }
.upload-box {
  width: 100%; padding: 40px 20px; border: 2px dashed #d1d5db; border-radius: 8px; background: #f9fafb;
  transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; box-sizing: border-box;
}
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

.topk-control { display: flex; align-items: center; gap: 12px; }
.topk-control :deep(.el-input-number) { flex: 1; }
.send-button { width: 100%; height: 44px; font-size: 16px; font-weight: 600; margin-top: 8px; }

/* Response Panel */
.response-panel { flex: 1; display: flex; flex-direction: column; gap: 16px; overflow: hidden; }
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

/* =========================================
   OpsPanel & MacEats Styles
   ========================================= */

/* Card Reset */
.opspanel-card :deep(.el-card__body) {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

/* Hero Section */
.opspanel-hero {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
  padding: 40px 40px 20px 40px;
  border-bottom: 1px solid #f1f5f9;
  text-align: left;
}

.hero-badge {
  display: inline-block;
  background: #eff6ff;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 18px;
  color: #475569;
  max-width: 800px;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
}

/* Main Body Layout */
.opspanel-body {
  display: flex;
  flex: 1;
  padding: 40px;
  gap: 60px;
}

/* Feature Section (Left) */
.feature-section { flex: 2; }
.section-header { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 700; margin-bottom: 24px; }
.feature-list { display: flex; flex-direction: column; gap: 24px; }
.feature-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px; border-radius: 12px; transition: background 0.2s ease; }
.feature-item:hover { background: #f8fafc; }

.feature-icon-wrapper {
  flex-shrink: 0; width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
}

/* Icon Colors */
.color-blue { background: #eff6ff; color: #3b82f6; }
.color-purple { background: #f5f3ff; color: #8b5cf6; }
.color-orange { background: #fff7ed; color: #f97316; }
.color-green { background: #f0fdf4; color: #10b981; }
.color-red { background: #fef2f2; color: #ef4444; }

.feature-content { display: flex; flex-direction: column; gap: 4px; }
.feature-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.feature-desc { font-size: 15px; color: #64748b; line-height: 1.5; }

/* CTA Section (Right) */
.demo-cta-section { flex: 1; max-width: 400px; min-width: 320px; }
.cta-box {
  background: #1e293b; color: white; border-radius: 16px; padding: 32px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  position: sticky; top: 20px;
}

.cta-header h3 { font-size: 22px; margin: 0 0 8px 0; color: #ffffff; }
.cta-header p { color: #94a3b8; margin: 0 0 24px 0; font-size: 14px; }

.credential-panel {
  background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.1);
}
.cred-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 14px; }
.cred-row:last-child { margin-bottom: 0; }
.cred-label { color: #cbd5e1; }
.cred-value { font-family: monospace; background: rgba(0, 0, 0, 0.3); padding: 2px 8px; border-radius: 4px; color: #4ade80; font-weight: 600; }

.action-buttons { display: flex; flex-direction: column; gap: 12px; }
.launch-btn { width: 100%; font-weight: 700; height: 48px; font-size: 16px; background: #3b82f6; border: none; }
.launch-btn:hover { background: #2563eb; }
.github-btn { width: 100%; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); height: 48px; font-size: 16px; margin-left: 0 !important; }
.github-btn:hover { background: rgba(255, 255, 255, 0.2); color: white; border-color: white; }

.link-footer { margin-top: 20px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.link-footer a { color: #64748b; font-size: 12px; text-decoration: none; transition: color 0.2s; }
.link-footer a:hover { color: #94a3b8; }

@media (max-width: 1100px) {
  .opspanel-body { flex-direction: column; gap: 40px; }
  .demo-cta-section { max-width: 100%; }
}

/* =========================================
   MacEats Theme Styles
   ========================================= */

/* Warm Food Gradient Text */
.gradient-text-food {
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Orange Badge */
.badge-orange { background: #fff7ed; color: #c2410c; }

/* Food CTA Theme Override */
.cta-food-theme { background: linear-gradient(145deg, #1e1e1e, #2d2a26); border: 1px solid #431407; }
.cta-food-theme .cta-header h3 { color: #fb923c; }

/* Tag Cloud */
.app-preview-text { color: #94a3b8; font-size: 13px; margin-bottom: 20px; }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.tag-cloud span { background: rgba(255, 255, 255, 0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #fdba74; }

/* Food Button Override */
.food-btn { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border: none; }
.food-btn:hover { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }

/* =========================================
   NEW: HSR OpsPanel Styles
   ========================================= */

/* 1. Purple Hero Banner */
.hsr-hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 60px;
  margin: 32px 32px 0 32px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.2);
}

.badge-white-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  backdrop-filter: blur(4px);
}

.white-text { color: #ffffff !important; margin: 0 0 12px 0; font-size: 32px; font-weight: 800; }
.white-text-alpha { color: rgba(255, 255, 255, 0.9) !important; font-size: 16px; max-width: 700px; line-height: 1.6; font-weight: 400; margin: 0; }

/* 2. Feature List Styling */
.hsr-feature-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 24px; border-bottom: 2px solid #f3e8ff; padding-bottom: 12px;
}
.bulb-icon { font-size: 24px; color: #764ba2; }
.hsr-feature-header h3 { margin: 0; font-size: 18px; color: #1f2937; font-weight: 700; }

.bg-purple-light {
  background: #f3e8ff !important;
  color: #764ba2 !important;
}
.icon-purple { font-size: 24px; }
.hsr-item { padding: 16px; border-bottom: 1px solid #f9fafb; }
.hsr-item:last-child { border-bottom: none; }

/* 3. Purple CTA Box Styling */
.cta-hsr-theme {
  background: #ffffff;
  border: 1px solid #e9d5ff;
  padding: 0; /* Remove default padding to handle header separately */
  overflow: hidden;
  box-shadow: 0 10px 20px -5px rgba(118, 75, 162, 0.15);
}

.cta-header-purple {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  padding: 20px 24px;
  display: flex; align-items: center;
}
.cta-header-purple h3 { margin: 0; color: white; font-size: 18px; display: flex; align-items: center; gap: 8px; }

.cta-body-white {
  padding: 24px;
}

.cta-main-text {
  font-size: 15px; color: #374151; font-weight: 600; margin-bottom: 20px;
}

.metrics-preview {
  background: #faf5ff; border-radius: 8px; padding: 12px; margin-bottom: 24px; border: 1px solid #f3e8ff;
}
.metric-label { font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px; }
.metric-val { font-size: 14px; font-weight: 700; color: #4b5563; }


.purple-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  font-weight: 600;
  transition: transform 0.2s;
}
.purple-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

</style>