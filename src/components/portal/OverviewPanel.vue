<template>
  <div class="overview-content">
    <section class="hero-section">
      <div class="hero-card white-theme">
        <div class="hero-text full-width">
          <div class="badge-row">
            <div class="logo-badge purple-accent">
              <el-icon><Cpu /></el-icon> AI ENGINEERING LAB
            </div>
          </div>
          <h1 class="hero-title dark-text">Building Real, Deployable AI Systems</h1>
          
          <div class="desc-list">
            <div class="desc-row">
              <el-icon class="desc-icon purple-icon"><Aim /></el-icon>
              <p class="hero-desc dark-text">
                Shannon Hub is a hands-on AI Engineering Lab focused on building real, deployable AI systems — from infrastructure to user-facing products.
              </p>
            </div>
            <div class="desc-row">
              <el-icon class="desc-icon purple-icon"><Lightning /></el-icon>
              <p class="hero-desc dark-text">
                We help teams turn AI ideas into production-ready platforms, not just demos.
              </p>
            </div>
            <div class="desc-row">
              <el-icon class="desc-icon purple-icon"><Medal /></el-icon>
              <p class="hero-desc dark-text">
                Trusted by 10+ companies across engineering, operations, and product teams.
              </p>
            </div>
          </div>
        </div>
        
        <div class="hero-decoration purple-faint">
          <el-icon><DataLine /></el-icon>
        </div>
      </div>
    </section>

    <section class="section-container">
      <div class="section-header">
        <div class="header-line"></div>
        <h2>What We Build</h2>
      </div>
      <div class="grid-2x2">
        <el-card shadow="hover" class="feature-card">
          <div class="card-icon blue-bg"><el-icon><Connection /></el-icon></div>
          <h3>AI Infrastructure & Platforms</h3>
          <p>Production-ready AI backends designed for enterprise systems, ensuring stability and scalability.</p>
        </el-card>

        <el-card shadow="hover" class="feature-card">
          <div class="card-icon purple-bg"><el-icon><Operation /></el-icon></div>
          <h3>AI-Driven Operations Systems</h3>
          <p>AI-powered tools and middleware that automate complex workflows and operational decisions.</p>
        </el-card>

        <el-card shadow="hover" class="feature-card">
          <div class="card-icon orange-bg"><el-icon><Box /></el-icon></div>
          <h3>Productize & Localize Solutions</h3>
          <p>Turning raw AI capabilities into tangible products tailored for small teams and specific markets.</p>
        </el-card>

        <el-card shadow="hover" class="feature-card">
          <div class="card-icon teal-bg"><el-icon><PieChart /></el-icon></div>
          <h3>Data Intelligence & Dashboards</h3>
          <p>Unified analytics interfaces that visualize complex data streams and turn data into action.</p>
        </el-card>
      </div>
    </section>

    <section class="section-container">
      <div class="section-header">
        <div class="header-line"></div>
        <h2>How We Build</h2>
      </div>
      <div class="grid-1x3">
        <div class="process-card">
          <div class="process-icon-wrapper"><el-icon><OfficeBuilding /></el-icon></div>
          <h4>Production-Grade Architecture</h4>
          <p>System-level AI design focused on robustness, not just prototyping.</p>
        </div>

        <div class="process-card">
          <div class="process-icon-wrapper"><el-icon><Coffee /></el-icon></div>
          <h4>Java-Based AI Platforms</h4>
          <p>Reactive, high-performance, and scalable backend systems.</p>
        </div>

        <div class="process-card">
          <div class="process-icon-wrapper"><el-icon><Switch /></el-icon></div>
          <h4>Enterprise Integration</h4>
          <p>Seamless integration of LLMs, microservices, and complex data pipelines.</p>
        </div>
      </div>
    </section>

    <section class="section-container">
      <div class="section-header">
        <div class="header-line"></div>
        <h2>Who We Work With & Impact</h2>
      </div>
      
      <div class="grid-1x3">
        <div class="process-card impact-card-theme">
          <div class="impact-header-row">
            <el-icon class="impact-icon-sm color-purple"><TrendCharts /></el-icon>
            <h4>Startups</h4>
          </div>
          <p>Supported 10 teams and industries.</p>
        </div>

        <div class="process-card impact-card-theme">
          <div class="impact-header-row">
            <el-icon class="impact-icon-sm color-blue"><Shop /></el-icon>
            <h4>Small & Medium-Sized Businesses</h4>
          </div>
          <p>Reduced manual workload through AI automation.</p>
        </div>

        <div class="process-card impact-card-theme">
          <div class="impact-header-row">
            <el-icon class="impact-icon-sm color-teal"><Tools /></el-icon>
            <h4>Engineering Teams</h4>
          </div>
          <p>Scalable, maintainable AI systems.</p>
        </div>
      </div>
    </section>

    <div class="bottom-spacer"></div>
  </div>
</template>

<script setup>
import { 
  Cpu, DataLine, 
  Connection, Operation, Box, PieChart,
  OfficeBuilding, Coffee, Switch,
  TrendCharts, Shop, Tools,
  Aim, Lightning, Medal 
} from "@element-plus/icons-vue";
</script>

<style scoped>
/* Main Layout */
.overview-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding-bottom: 160px;
  box-sizing: border-box;
}

.bottom-spacer { width: 100%; height: 160px; flex-shrink: 0; }

/* =========================================
   1. Hero Section (White Theme)
   ========================================= */
.hero-section { width: 100%; }

.hero-card.white-theme {
  background: white; /* Changed from Gradient to White */
  border: 1px solid #e5e7eb; /* Subtle border */
  border-radius: 16px;
  padding: 56px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); /* Softer shadow */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.hero-text.full-width {
  position: relative;
  z-index: 2;
  flex: 1;
  width: 100%; 
  max-width: 100%;
  padding-right: 40px;
}

.badge-row { margin-bottom: 24px; }

/* Updated Badge Style for White Background */
.logo-badge.purple-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f3e8ff; /* Light purple bg */
  color: #764ba2;      /* Purple text */
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  border: 1px solid rgba(118, 75, 162, 0.1);
}

.hero-title.dark-text {
  font-size: 42px;
  font-weight: 800;
  color: #111827; /* Dark text */
  margin: 0 0 32px 0;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

/* Description List Styles */
.desc-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 95%;
}

.desc-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.desc-icon.purple-icon {
  font-size: 20px;
  color: #764ba2; /* Changed from Gold to Purple to match brand */
  margin-top: 4px;
  flex-shrink: 0;
}

.hero-desc.dark-text {
  font-size: 18px;
  line-height: 1.6;
  color: #4b5563; /* Greyish dark text */
  margin: 0;
}

/* Decorative Icon - Faint Purple */
.hero-decoration.purple-faint {
  position: absolute;
  right: -50px;
  bottom: -80px;
  opacity: 0.05; /* Very subtle */
  transform: rotate(-15deg);
  pointer-events: none;
}
.hero-decoration.purple-faint .el-icon { 
  font-size: 400px; 
  color: #764ba2; 
}

/* =========================================
   Common Section Styles (Unchanged)
   ========================================= */
.section-container { display: flex; flex-direction: column; gap: 32px; }
.section-header { display: flex; align-items: center; gap: 16px; }
.header-line { width: 4px; height: 28px; background: #764ba2; border-radius: 2px; }
.section-header h2 { font-size: 24px; font-weight: 700; color: #1f2937; margin: 0; }

/* Grid 2x2 */
.grid-2x2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.feature-card { border: 1px solid #e5e7eb; border-radius: 16px; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); height: 100%; }
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); border-color: #d1d5db; }
.feature-card :deep(.el-card__body) { padding: 40px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
.card-icon { width: 64px; height: 64px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.blue-bg { background: #eff6ff; color: #3b82f6; }
.purple-bg { background: #f3e8ff; color: #8b5cf6; }
.orange-bg { background: #fff7ed; color: #f97316; }
.teal-bg { background: #f0fdfa; color: #14b8a6; }
.feature-card h3 { font-size: 20px; font-weight: 700; color: #111827; margin: 0; }
.feature-card p { font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0; }

/* Grid 1x3 */
.grid-1x3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.process-card { background: white; padding: 40px; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: flex-start; }
.process-card:hover { border-color: #764ba2; box-shadow: 0 8px 16px rgba(118, 75, 162, 0.12); }
.process-icon-wrapper { font-size: 28px; color: #764ba2; background: #f3e8ff; width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.process-card h4 { font-size: 18px; font-weight: 700; color: #374151; margin: 0 0 10px 0; }
.process-card p { font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0; }

/* Impact Styles */
.impact-card-theme { background: #f9fafb; border-color: #f3f4f6; }
.impact-card-theme:hover { background: white; border-color: #764ba2; }
.impact-header-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.impact-icon-sm { font-size: 22px; }
.color-purple { color: #8b5cf6; }
.color-blue { color: #3b82f6; }
.color-teal { color: #14b8a6; }

@media (max-width: 1200px) { .hero-text.full-width { max-width: 100%; } }
@media (max-width: 1000px) { .grid-2x2, .grid-1x3 { grid-template-columns: 1fr; } }
</style>