<template>
  <div class="research-miner-panel">
    <div class="panel-header-card">
      <div class="header-info">
        <h3>AI Knowledge Lab: Autonomous Research Miner</h3>
        <p class="desc">Synthesize key evidence, technical metrics, and structured insights from research literature.</p>
      </div>
      <div class="action-group">
        <input 
          v-model="paperUrl" 
          placeholder="Enter PDF URL..." 
          class="url-input"
          @keyup.enter="analyzeDocument"
        />
        <button @click="analyzeDocument" :disabled="loading" class="btn-primary">
          <span v-if="loading">⏳ Processing...</span>
          <span v-else>🔍 Analyze Document</span>
        </button>
        <button @click="switchToHistory" class="btn-secondary">📜 History</button>
      </div>
    </div>

    <div class="content-layout">
      
      <div v-if="showHistoryView" class="full-history-overlay">
        <div class="card-header">
          <span>MINING HISTORY</span>
          <button class="close-btn" @click="showHistoryView = false">✕ Close</button>
        </div>
        <div class="overlay-scroll-content">
          <div v-if="historyLoading" class="status-center">Fetching historical assets...</div>
          <div v-else-if="historyList.length === 0" class="status-center">No records found in database.</div>
          <div v-else class="history-list-grid">
            <div v-for="item in historyList" :key="item.id" class="history-row" @click="loadHistoryDetail(item)">
              <div class="row-main">
                <span class="row-tag">{{ item.sensor_modality || 'General' }}</span>
                <span class="row-title">{{ item.paper_title }}</span>
              </div>
              <div class="row-meta">
                <span class="row-metric">{{ item.key_metrics }}</span>
                <span class="row-date">{{ new Date(item.created_at).toLocaleDateString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template v-else>
        <div class="source-container card">
          <div class="card-header">SOURCE DOCUMENT PREVIEW</div>
          <div class="pdf-wrapper">
            <iframe v-if="paperUrl" :key="paperUrl" :src="paperUrl" class="pdf-frame"></iframe>
            <div v-else class="empty-placeholder">No document URL provided</div>
          </div>
        </div>

        <div class="evidence-container card">
          <div class="card-header">STRUCTURED RESEARCH SYNTHESIS</div>
          <div class="scroll-container">
            <div v-if="evidence" class="evidence-content">
              <div class="evidence-item">
                <span class="label">STUDY OBJECTIVE / TITLE</span>
                <div class="value bold-title">{{ evidence.paper_title }}</div>
              </div>
              <div class="metrics-row">
                <div class="evidence-item flex-1">
                  <span class="label">METHODOLOGY</span>
                  <div class="value tag blue">{{ evidence.sensor_modality }}</div>
                </div>
                <div class="evidence-item flex-1">
                  <span class="label">CONTEXT</span>
                  <div class="value tag green">{{ evidence.environment_context }}</div>
                </div>
              </div>
              <div class="evidence-item">
                <span class="label">QUANTIFIED RESULTS</span>
                <div class="value highlight-box">{{ evidence.key_metrics }}</div>
              </div>
              <div class="evidence-item quote-box">
                <span class="label">SOURCE QUOTE (Validation)</span>
                <div class="quote-text">"{{ evidence.source_quote }}"</div>
              </div>
            </div>

            <div v-else-if="errorMessage" class="error-view">
              <div class="icon-warn">⚠️</div>
              <p class="text-main">Temporarily unable to parse this document.</p>
              <p class="text-sub">Upstream service limit or invalid format.</p>
            </div>

            <div v-else class="empty-view-inline">
              <span class="pulse-search-small">🔍</span>
              <span>Ready to synthesize evidence. Enter a PDF link above.</span>
            </div>
            
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const paperUrl = ref('https://arxiv.org/pdf/2301.12123.pdf');
const loading = ref(false);
const evidence = ref(null);
const errorMessage = ref("");

// UI Navigation States
const showHistoryView = ref(false);
const historyList = ref([]);
const historyLoading = ref(false);

const analyzeDocument = async () => {
  if (!paperUrl.value) return;
  showHistoryView.value = false;
  loading.value = true;
  evidence.value = null;
  errorMessage.value = "";
  try {
    const res = await axios.get(`http://localhost:8081/flux/intelligence/analyze-by-url?url=${paperUrl.value}`);
    evidence.value = res.data;
  } catch (err) {
    errorMessage.value = "ERR_FAILED";
  } finally { loading.value = false; }
};

const switchToHistory = async () => {
  showHistoryView.value = true;
  historyLoading.value = true;
  try {
    const res = await axios.get('http://localhost:8081/flux/intelligence/history');
    historyList.value = res.data;
  } catch (err) { console.error(err); }
  finally { historyLoading.value = false; }
};

const loadHistoryDetail = (record) => {
  evidence.value = record;
  showHistoryView.value = false; // Switch back to dual-pane for detailed view
};
</script>

<style scoped>
/* Main Layout Containers */
.research-miner-panel { display: flex; flex-direction: column; gap: 16px; height: 100%; width: 100%; }
.content-layout { 
  display: flex; gap: 16px; flex: 1; min-height: 0; position: relative; 
  padding-bottom: 12px;
}

/* Full Overlay for History [Fix: Covers entire red-box area] */
.full-history-overlay { 
  position: absolute; inset: 0; z-index: 20; background: white; 
  border: 1px solid #e2e8f0; border-radius: 12px; display: flex; flex-direction: column; 
}
.overlay-scroll-content { flex: 1; overflow-y: auto; padding: 24px; background: #f8fafc; }
.close-btn { background: #f1f5f9; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }

/* History List Rows */
.history-row { 
  background: white; padding: 18px; border-radius: 10px; border: 1px solid #e2e8f0; 
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; cursor: pointer;
}
.history-row:hover { border-color: #764ba2; transform: translateX(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.row-tag { font-size: 10px; font-weight: 800; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 4px; margin-right: 12px; }
.row-title { font-weight: 600; color: #1e293b; }
.row-metric { font-family: monospace; color: #764ba2; font-weight: 700; margin-right: 20px; }
.row-date { font-size: 12px; color: #94a3b8; }

/* Dual-Pane View Styles [Fix: Full-height PDF] */
.card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; flex: 1; overflow: hidden; }
.pdf-wrapper { flex: 1; margin: 12px; background: #f1f5f9; border-radius: 8px; overflow: hidden; min-height: 550px; }
.pdf-frame { width: 100%; height: 100%; border: none; }
.scroll-container { flex: 1; overflow-y: auto; }

/* Admin Error Message Styling */
.error-view { padding: 80px 40px; text-align: center; }
.icon-warn { font-size: 50px; margin-bottom: 16px; }
.text-main { color: #b91c1c; font-weight: 700; font-size: 20px; margin: 0; }
.text-sub { color: #94a3b8; font-size: 13px; margin-top: 8px; }

/* Shared Assets */
.panel-header-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; }
.action-group { display: flex; gap: 12px; }
.url-input { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; }
.btn-primary { background: #764ba2; color: white; border: none; padding: 0 24px; border-radius: 8px; cursor: pointer; font-weight: 700; }
.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; padding: 0 20px; border-radius: 8px; cursor: pointer; }
.card-header { padding: 12px 16px; font-size: 10px; font-weight: 900; color: #94a3b8; border-bottom: 1px solid #f1f5f9; background: #fcfdfe; display: flex; justify-content: space-between; }
.tag { padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }
.tag.blue { background: #eff6ff; color: #2563eb; }
.tag.green { background: #f0fdf4; color: #16a34a; }
.highlight-box { background: #f5f3ff; padding: 12px; border-radius: 6px; color: #764ba2; font-family: monospace; font-weight: 700; }
.quote-box { background: #fffbeb; padding: 16px; border-radius: 8px; border-left: 5px solid #f59e0b; margin-top: 10px; }

/* Inline Empty State Styling */
.empty-view-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 20px; /* Reduced vertical padding */
  color: #94a3b8;
  font-size: 14px;
}

.pulse-search-small {
  font-size: 18px;
  animation: pulse-small 2s infinite;
}

@keyframes pulse-small {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(1); }
}
</style>

