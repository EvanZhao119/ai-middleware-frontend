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
          <span>DETAILED RESEARCH MINING HISTORY</span>
          <button class="close-btn" @click="showHistoryView = false">✕ Close</button>
        </div>
        <div class="overlay-scroll-content">
          <div v-if="historyLoading" class="status-center">Accessing Oracle Cloud History...</div>
    
          <table v-else class="history-table">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>MODALITY</th>
                <th>CONTEXT</th>
                <th>METRICS</th>
                <th>SUMMARY</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in historyList" :key="item.ID" @click="loadHistoryDetail(item)" class="table-row-hover">
                <td class="col-title" :title="item.PAPER_TITLE">{{ item.PAPER_TITLE }}</td>
                <td><span class="tag-blue-small">{{ item.SENSOR_MODALITY }}</span></td>
                <td><span class="tag-green-small">{{ item.ENVIRONMENT_CONTEXT || 'N/A' }}</span></td>
                <td class="col-metrics">{{ item.KEY_METRICS }}</td>
                <td class="col-summary">{{ item.EVIDENCE_SUMMARY }}</td>
                <td class="col-date">{{ new Date(item.CREATED_AT).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
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
              <div class="evidence-section">
                <span class="section-label">STUDY OBJECTIVE / TITLE</span>
                <div class="value bold-title">{{ evidence.paper_title }}</div>
              </div>

              <div class="metrics-grid">
                <div class="evidence-section">
                  <span class="section-label">METHODOLOGY / MODALITY</span>
                  <div class="value tag blue-soft">{{ evidence.sensor_modality }}</div>
                </div>
                <div class="evidence-section">
                  <span class="section-label">CONTEXT / SETTING</span>
                  <div class="value tag green-soft">{{ evidence.environment_context || 'Research Simulation' }}</div>
                </div>
              </div>

              <div class="evidence-section">
                <span class="section-label">QUANTIFIED RESULTS & BENCHMARKS</span>
                <div class="value highlight-box-modern">
                  <div class="metric-icon">📊</div>
                  {{ evidence.key_metrics }}
                </div>
              </div>

              <div class="evidence-section">
                <span class="section-label">AI SYNTHESIS SUMMARY</span>
                <div class="value summary-text">
                {{ evidence.evidence_summary }}
                </div>
              </div>

              <div class="evidence-section quote-container">
                <span class="section-label">SOURCE EVIDENCE (Validation Proof)</span>
                <div class="quote-card">
                  <span class="quote-mark">“</span>
                  <p class="quote-text">{{ evidence.source_quote }}</p>
                  <span class="quote-mark end">”</span>
                </div>
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
import { useRequest } from "../../composables/useRequest";

const paperUrl = ref('https://objectstorage.ca-toronto-1.oraclecloud.com/n/yzcfifdyerai/b/siteuploads/o/Papers_A_Review_of_Sensor_Technologies_for_Perception.pdf');
const evidence = ref(null);
const errorMessage = ref("");

const { loading, sendRequest } = useRequest();

// UI Navigation States
const showHistoryView = ref(false);
const historyList = ref([]);
const historyLoading = ref(false);

const analyzeDocument = async () => {
  if (!paperUrl.value) return;
  showHistoryView.value = false;
  evidence.value = null;
  errorMessage.value = "";
  try {
    const queryParams = new URLSearchParams({
      impl: "flux",
      path: "/flux/intelligence/analyze-by-url",
      method: "GET",
      url: paperUrl.value 
    }).toString();

    const data = await sendRequest(`/v1/run?${queryParams}`);

    if (data) {
      evidence.value = {
        paper_title: data.paperTitle,     
        sensor_modality: data.sensorModality,      
        environment_context: data.environmentContext,  
        key_metrics: data.keyMetrics,              
        evidence_summary: data.evidenceSummary,    
        source_quote: data.sourceQuote            
      };
    }
  } catch (err) {
    errorMessage.value = "ERR_FAILED";
  } finally { loading.value = false; }
};

const switchToHistory = async () => {
  showHistoryView.value = true;
  historyLoading.value = true;
  try {
    const data = await sendRequest('/v1/run', {
      impl: 'flux',
      path: '/flux/intelligence/history'
    }, { method: 'get' });
    if (data) historyList.value = data;
  } catch (err) { console.error(err); }
  finally { historyLoading.value = false; }
};

const loadHistoryDetail = (record) => {
  paperUrl.value = record.PAPER_URL;

  evidence.value = {
    paper_title: record.PAPER_TITLE,
    sensor_modality: record.SENSOR_MODALITY,
    environment_context: record.ENVIRONMENT_CONTEXT, 
    key_metrics: record.KEY_METRICS,
    evidence_summary: record.EVIDENCE_SUMMARY,
    source_quote: record.SOURCE_QUOTE
  };
  showHistoryView.value = false;
};
</script>

<style scoped>
/* 原有基础布局逻辑保持不变 */
.research-miner-panel { display: flex; flex-direction: column; gap: 16px; height: 100%; width: 100%; }
.content-layout { display: flex; gap: 16px; flex: 1; min-height: 0; position: relative; padding-bottom: 12px; }
.full-history-overlay { position: absolute; inset: 0; z-index: 20; background: white; border: 1px solid #e2e8f0; border-radius: 12px; display: flex; flex-direction: column; }
.overlay-scroll-content { flex: 1; overflow-y: auto; padding: 24px; background: #f8fafc; }
.close-btn { background: #f1f5f9; border: none; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
.history-row { background: white; padding: 18px; border-radius: 10px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; cursor: pointer; }
.history-row:hover { border-color: #764ba2; transform: translateX(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.row-tag { font-size: 10px; font-weight: 800; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 4px; margin-right: 12px; }
.row-title { font-weight: 600; color: #1e293b; }
.row-metric { font-family: monospace; color: #764ba2; font-weight: 700; margin-right: 20px; }
.row-date { font-size: 12px; color: #94a3b8; }
.card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; flex: 1; overflow: hidden; }
.pdf-wrapper { flex: 1; margin: 12px; background: #f1f5f9; border-radius: 8px; overflow: hidden; min-height: 550px; }
.pdf-frame { width: 100%; height: 100%; border: none; }
.scroll-container { flex: 1; overflow-y: auto; }
.panel-header-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; }
.action-group { display: flex; gap: 12px; }
.url-input { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; }
.btn-primary { background: #764ba2; color: white; border: none; padding: 0 24px; border-radius: 8px; cursor: pointer; font-weight: 700; }
.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; padding: 0 20px; border-radius: 8px; cursor: pointer; }
.card-header { padding: 12px 16px; font-size: 10px; font-weight: 900; color: #94a3b8; border-bottom: 1px solid #f1f5f9; background: #fcfdfe; display: flex; justify-content: space-between; }

/* 重点优化的美化样式区域 */
.evidence-content { padding: 30px; display: flex; flex-direction: column; gap: 32px; }
.section-label { display: block; font-size: 11px; font-weight: 900; color: #94a3b8; margin-bottom: 12px; letter-spacing: 1px; }
.bold-title { font-size: 1.3rem; font-weight: 800; color: #1e293b; line-height: 1.4; }

.metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.tag { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 700; display: inline-block; }
.blue-soft { background: #f0f7ff; color: #0284c7; border: 1px solid #e0f2fe; }
.green-soft { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }

.highlight-box-modern { 
  background: #fdfaff; 
  padding: 20px; 
  border-radius: 12px; 
  color: #764ba2; 
  font-family: 'JetBrains Mono', monospace; 
  font-weight: 800; 
  font-size: 15px;
  border: 1px solid #f3e8ff;
  display: flex;
  align-items: center;
  gap: 12px;
}
.metric-icon { font-size: 20px; opacity: 0.8; }

.quote-card { 
  background: #fffcf0; 
  padding: 24px; 
  border-radius: 16px; 
  border-left: 6px solid #fbbf24; 
  position: relative;
}
.quote-text { 
  color: #92400e; 
  font-size: 15px; 
  line-height: 1.8; 
  font-style: italic; 
  margin: 0;
  font-weight: 500;
}
.quote-mark { 
  font-size: 40px; 
  color: #fbbf24; 
  opacity: 0.3; 
  position: absolute; 
  top: 10px; 
  left: 10px;
  line-height: 1;
}
.quote-mark.end { top: auto; left: auto; bottom: -10px; right: 20px; }

/* AI 总结文本的样式，增加左侧边框增强“引用”感 */
.summary-text {
  color: #334155;
  line-height: 1.6;
  font-size: 14.5px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 5px solid #764ba2; /* 使用主题紫色 */
  font-style: normal;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
}

/* 调整间距，让各 section 呼吸感更强 */
.evidence-section {
  margin-bottom: 24px;
}

/* 表格整体样式 */
.history-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.history-table th { background: #f8fafc; padding: 12px 16px; text-align: left; font-size: 10px; font-weight: 900; color: #64748b; border-bottom: 2px solid #e2e8f0; }
.history-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; vertical-align: middle; }
.table-row-hover:hover { background: #f1f5f9; cursor: pointer; transition: background 0.2s; }

/* 字段特定样式 */
.col-title { font-weight: 700; color: #1e293b; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.col-metrics { font-family: 'JetBrains Mono', monospace; color: #764ba2; font-weight: 800; font-size: 12px; }
.col-summary { color: #475569; font-size: 12px; max-width: 300px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tag-blue-small { background: #eff6ff; color: #2563eb; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 800; }
.tag-green-small { background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 800; }

/* 报错与空状态 */
.error-view { padding: 80px 40px; text-align: center; }
.icon-warn { font-size: 50px; margin-bottom: 16px; }
.text-main { color: #b91c1c; font-weight: 700; font-size: 20px; margin: 0; }
.text-sub { color: #94a3b8; font-size: 13px; margin-top: 8px; }
.empty-view-inline { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 100px 20px; color: #94a3b8; font-size: 14px; }
.pulse-search-small { font-size: 18px; animation: pulse-small 2s infinite; }
@keyframes pulse-small { 0% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } 100% { opacity: 0.3; transform: scale(1); } }
</style>