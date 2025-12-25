<template>
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

<style scoped>
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
</style>