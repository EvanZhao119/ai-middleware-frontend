<template>
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

<script setup>
import { KnifeFork, MagicStick, DataLine, Position } from "@element-plus/icons-vue";

const MACEATS_URL = "https://macstuforum.top/maceats/";

const openUrl = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
/* Inherit common styles from OpsPanel logic by duplication for isolation */
.demo-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.demo-card { height: 100%; display: flex; flex-direction: column; }
.demo-card :deep(.el-card__body) { padding: 0; display: flex; flex-direction: column; height: 100%; overflow-y: auto; }

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
.hero-subtitle {
  font-size: 18px;
  color: #475569;
  max-width: 800px;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
}
.opspanel-body { display: flex; flex: 1; padding: 40px; gap: 60px; }
.feature-section { flex: 2; }
.section-header { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 700; margin-bottom: 24px; }
.feature-list { display: flex; flex-direction: column; gap: 24px; }
.feature-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px; border-radius: 12px; transition: background 0.2s ease; }
.feature-item:hover { background: #f8fafc; }
.feature-icon-wrapper { flex-shrink: 0; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.color-purple { background: #f5f3ff; color: #8b5cf6; }
.color-orange { background: #fff7ed; color: #f97316; }
.color-red { background: #fef2f2; color: #ef4444; }
.feature-content { display: flex; flex-direction: column; gap: 4px; }
.feature-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.feature-desc { font-size: 15px; color: #64748b; line-height: 1.5; }
.demo-cta-section { flex: 1; max-width: 400px; min-width: 320px; }
.cta-box { background: #1e293b; color: white; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); position: sticky; top: 20px; }
.cta-header h3 { font-size: 22px; margin: 0 0 8px 0; color: #ffffff; }
.action-buttons { display: flex; flex-direction: column; gap: 12px; }
.launch-btn { width: 100%; font-weight: 700; height: 48px; font-size: 16px; background: #3b82f6; border: none; }
.link-footer { margin-top: 20px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.link-footer a { color: #64748b; font-size: 12px; text-decoration: none; transition: color 0.2s; }
.link-footer a:hover { color: #94a3b8; }

/* MacEats Specific */
.gradient-text-food {
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.badge-orange { background: #fff7ed; color: #c2410c; }
.cta-food-theme { background: linear-gradient(145deg, #1e1e1e, #2d2a26); border: 1px solid #431407; }
.cta-food-theme .cta-header h3 { color: #fb923c; }
.app-preview-text { color: #94a3b8; font-size: 13px; margin-bottom: 20px; }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.tag-cloud span { background: rgba(255, 255, 255, 0.1); padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #fdba74; }
.food-btn { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border: none; }
.food-btn:hover { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }

@media (max-width: 1100px) {
  .opspanel-body { flex-direction: column; gap: 40px; }
  .demo-cta-section { max-width: 100%; }
}
</style>