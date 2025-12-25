<template>
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

<script setup>
import { 
  Van, TrendCharts, Odometer, Opportunity, DataAnalysis, Link, Cpu 
} from "@element-plus/icons-vue";

const openUrl = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
/* Inherited Layout */
.demo-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.demo-card { height: 100%; display: flex; flex-direction: column; }
.demo-card :deep(.el-card__body) { padding: 0; display: flex; flex-direction: column; height: 100%; overflow-y: auto; }
.opspanel-body { display: flex; flex: 1; padding: 40px; gap: 60px; }
.feature-section { flex: 2; }
.feature-list { display: flex; flex-direction: column; gap: 24px; }
.feature-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px; border-radius: 12px; transition: background 0.2s ease; }
.feature-item:hover { background: #f8fafc; }
.feature-icon-wrapper { flex-shrink: 0; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.feature-content { display: flex; flex-direction: column; gap: 4px; }
.feature-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.feature-desc { font-size: 15px; color: #64748b; line-height: 1.5; }
.demo-cta-section { flex: 1; max-width: 400px; min-width: 320px; }
.cta-box { border-radius: 16px; position: sticky; top: 20px; }
.action-buttons { display: flex; flex-direction: column; gap: 12px; }
.launch-btn { width: 100%; font-weight: 700; height: 48px; font-size: 16px; border: none; }

@media (max-width: 1100px) {
  .opspanel-body { flex-direction: column; gap: 40px; }
  .demo-cta-section { max-width: 100%; }
}

/* HSR Specific */
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

.hsr-feature-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; border-bottom: 2px solid #f3e8ff; padding-bottom: 12px; }
.bulb-icon { font-size: 24px; color: #764ba2; }
.hsr-feature-header h3 { margin: 0; font-size: 18px; color: #1f2937; font-weight: 700; }

.bg-purple-light { background: #f3e8ff !important; color: #764ba2 !important; }
.icon-purple { font-size: 24px; }
.hsr-item { padding: 16px; border-bottom: 1px solid #f9fafb; }
.hsr-item:last-child { border-bottom: none; }

.cta-hsr-theme {
  background: #ffffff;
  border: 1px solid #e9d5ff;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 10px 20px -5px rgba(118, 75, 162, 0.15);
}
.cta-header-purple {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  padding: 20px 24px;
  display: flex; align-items: center;
}
.cta-header-purple h3 { margin: 0; color: white; font-size: 18px; display: flex; align-items: center; gap: 8px; }

.cta-body-white { padding: 24px; }
.cta-main-text { font-size: 15px; color: #374151; font-weight: 600; margin-bottom: 20px; }

.metrics-preview { background: #faf5ff; border-radius: 8px; padding: 12px; margin-bottom: 24px; border: 1px solid #f3e8ff; }
.metric-label { font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px; }
.metric-val { 
  font-size: 13px; 
  font-weight: 700; 
  color: #764ba2; 
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px dashed #d8b4fe; 
  display: inline-block;
}

.purple-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  transition: transform 0.2s;
}
.purple-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}
</style>