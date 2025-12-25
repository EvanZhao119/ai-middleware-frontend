<template>
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

<script setup>
import { 
  UserFilled, Menu, Timer, Monitor, Cpu, Position 
} from "@element-plus/icons-vue";

const OPSPANEL_DEMO_URL = "https://macstuforum.top/opspanel";
const OPSPANEL_GITHUB_URL = "https://github.com/EvanZhao119/OpsPanel";

const openUrl = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
/* Common Panel Styles */
.demo-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.demo-card { height: 100%; display: flex; flex-direction: column; }
.demo-card :deep(.el-card__body) { padding: 0; display: flex; flex-direction: column; height: 100%; overflow-y: auto; }

/* OpsPanel Specific */
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
.opspanel-body { display: flex; flex: 1; padding: 40px; gap: 60px; }
.feature-section { flex: 2; }
.section-header { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 700; margin-bottom: 24px; }
.feature-list { display: flex; flex-direction: column; gap: 24px; }
.feature-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px; border-radius: 12px; transition: background 0.2s ease; }
.feature-item:hover { background: #f8fafc; }
.feature-icon-wrapper { flex-shrink: 0; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.color-blue { background: #eff6ff; color: #3b82f6; }
.color-purple { background: #f5f3ff; color: #8b5cf6; }
.color-orange { background: #fff7ed; color: #f97316; }
.color-green { background: #f0fdf4; color: #10b981; }
.color-red { background: #fef2f2; color: #ef4444; }
.feature-content { display: flex; flex-direction: column; gap: 4px; }
.feature-title { font-size: 18px; font-weight: 700; color: #1e293b; }
.feature-desc { font-size: 15px; color: #64748b; line-height: 1.5; }

/* CTA */
.demo-cta-section { flex: 1; max-width: 400px; min-width: 320px; }
.cta-box { background: #1e293b; color: white; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); position: sticky; top: 20px; }
.cta-header h3 { font-size: 22px; margin: 0 0 8px 0; color: #ffffff; }
.cta-header p { color: #94a3b8; margin: 0 0 24px 0; font-size: 14px; }
.credential-panel { background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.1); }
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
</style>