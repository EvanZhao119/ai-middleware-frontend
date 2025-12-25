<template>
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
</template>

<style scoped>
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
</style>