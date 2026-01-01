<template>
  <section class="demo-panel">
    <el-card shadow="hover" class="demo-card opspanel-card">
      
      <div class="hsr-hero-banner">
        <div class="hero-badge badge-white-outline">
          <el-icon><DataAnalysis /></el-icon> PEOPLE ANALYTICS
        </div>
        <h1 class="hero-title white-text">
          HR Workforce Intelligence & AI Forecast
        </h1>
        <p class="hero-subtitle white-text-alpha">
          Advanced human capital management platform utilizing AI to predict attrition, analyze pay equity, and monitor workforce health in real-time.
        </p>
      </div>

      <div class="opspanel-body">
        <div class="feature-section">
          <div class="hsr-feature-header">
             <el-icon class="bulb-icon"><Opportunity /></el-icon> 
             <h3>Intelligence Capabilities</h3>
          </div>
          
          <div class="feature-list hsr-list">
            <div class="feature-item hsr-item">
              <div class="feature-icon-wrapper bg-purple-light">
                <el-icon class="icon-purple"><User /></el-icon>
              </div>
              <div class="feature-content">
                <div class="feature-title">Executive Workforce Overview</div>
                <div class="feature-desc">Real-time tracking of headcount trends, gender distribution, and monthly attrition dynamics.</div>
              </div>
            </div>

            <div class="feature-item hsr-item">
              <div class="feature-icon-wrapper bg-purple-light">
                <el-icon class="icon-purple"><Cpu /></el-icon>
              </div>
              <div class="feature-content">
                <div class="feature-title">AI Attrition Risk Forecast</div>
                <div class="feature-desc">Utilizing Random Forest and Logistic Regression models to predict individual employee stability and future turnover risk.</div>
              </div>
            </div>

            <div class="feature-item hsr-item">
              <div class="feature-icon-wrapper bg-purple-light">
                <el-icon class="icon-purple"><Money /></el-icon>
              </div>
              <div class="feature-content">
                <div class="feature-title">Pay Equity & Compensation Analysis</div>
                <div class="feature-desc">Scatter analysis of Tenure vs. Salary to identify pay gaps and ensure organizational fairness.</div>
              </div>
            </div>

            <div class="feature-item hsr-item">
              <div class="feature-icon-wrapper bg-purple-light">
                <el-icon class="icon-purple"><Check /></el-icon>
              </div>
              <div class="feature-content">
                <div class="feature-title">Data Ops & Quality Monitor</div>
                <div class="feature-desc">Automated monitoring of ETL job execution, data freshness, and outlier detection for HR systems.</div>
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
              <div class="cta-sub-section">
                <p class="cta-main-text">Workforce AI & Strategy</p>
                <div class="metrics-preview">
                    <span class="metric-label">Key Modules:</span>
                    <div class="metric-val">Attrition AI | Pay Equity | HRBP View</div>
                </div>
                <el-button 
                  type="primary" 
                  size="large" 
                  class="launch-btn purple-btn" 
                  @click="openUrl('https://evanzhao119.grafana.net/public-dashboards/759dc5b61c8544a38d7f45b9e6becfb5')"
                >
                  Workforce Intelligence
                  <el-icon class="el-icon--right"><TrendCharts /></el-icon>
                </el-button>
              </div>

              <el-divider />

              <div class="cta-sub-section">
                <p class="cta-main-text">Systems & Data Reliability</p>
                <div class="metrics-preview">
                    <span class="metric-label">Health Metrics:</span>
                    <div class="metric-val">ETL Success Rate | Data Freshness</div>
                </div>
                <el-button 
                  type="default" 
                  size="large" 
                  class="launch-btn outline-purple-btn" 
                  @click="openUrl('https://evanzhao119.grafana.net/public-dashboards/6bea9631ca634ae9a7e996c80190dac0')"
                >
                  Ops & Data Quality
                  <el-icon class="el-icon--right"><Monitor /></el-icon>
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
  User, Cpu, Money, Check, Opportunity, DataAnalysis, TrendCharts, Monitor 
} from "@element-plus/icons-vue";

const openUrl = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
/* 保持原有核心布局样式不变 */
.demo-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.demo-card { height: 100%; display: flex; flex-direction: column; border: none;}
.demo-card :deep(.el-card__body) { padding: 0; display: flex; flex-direction: column; height: 100%; overflow-y: auto; }
.opspanel-body { display: flex; flex: 1; padding: 40px; gap: 60px; }
.feature-section { flex: 2; }

/* Banner 样式 */
.hsr-hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 60px;
  margin: 32px 32px 0 32px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.2);
}

.badge-white-outline {
  display: inline-flex;
  align-items: center; gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 12px; font-weight: 700; padding: 4px 12px;
  border-radius: 20px; margin-bottom: 16px; backdrop-filter: blur(4px);
}

.white-text { color: #ffffff !important; margin: 0 0 12px 0; font-size: 32px; font-weight: 800; }
.white-text-alpha { color: rgba(255, 255, 255, 0.9) !important; font-size: 16px; max-width: 700px; line-height: 1.6; }

/* 列表项 */
.hsr-feature-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; border-bottom: 2px solid #f3e8ff; padding-bottom: 12px; }
.bulb-icon { font-size: 24px; color: #764ba2; }
.hsr-feature-header h3 { margin: 0; font-size: 18px; color: #1f2937; font-weight: 700; }
.feature-list { display: flex; flex-direction: column; gap: 24px; }
.feature-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px; border-radius: 12px; transition: background 0.2s ease; }
.feature-item:hover { background: #f8fafc; }
.feature-icon-wrapper { flex-shrink: 0; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.bg-purple-light { background: #f3e8ff !important; color: #764ba2 !important; }
.icon-purple { font-size: 24px; }
.feature-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.feature-desc { font-size: 15px; color: #64748b; line-height: 1.5; }

/* CTA 区域 */
.demo-cta-section { flex: 1; max-width: 400px; min-width: 320px; }
.cta-box { 
  border-radius: 16px; position: sticky; top: 20px; 
  background: #ffffff; border: 1px solid #e9d5ff;
  overflow: hidden; box-shadow: 0 10px 20px -5px rgba(118, 75, 162, 0.15);
}
.cta-header-purple { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); padding: 20px 24px; }
.cta-header-purple h3 { margin: 0; color: white; font-size: 18px; }
.cta-body-white { padding: 24px; }
.cta-sub-section { margin-bottom: 12px; }
.cta-main-text { font-size: 15px; color: #374151; font-weight: 700; margin-bottom: 12px; }
.metrics-preview { background: #faf5ff; border-radius: 8px; padding: 12px; margin-bottom: 16px; border: 1px solid #f3e8ff; }
.metric-label { font-size: 11px; color: #6b7280; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.metric-val { font-size: 12px; font-weight: 700; color: #764ba2; }

/* 按钮样式 */
.launch-btn { width: 100%; font-weight: 700; height: 44px; font-size: 14px; transition: all 0.2s; }
.purple-btn { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border: none; color: white; }
.purple-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3); }

.outline-purple-btn { border: 2px solid #7c3aed; color: #7c3aed; background: transparent; }
.outline-purple-btn:hover { background: #f5f3ff; color: #6d28d9; border-color: #6d28d9; }

@media (max-width: 1100px) {
  .opspanel-body { flex-direction: column; gap: 40px; }
  .demo-cta-section { max-width: 100%; }
}
</style>