<template>
  <div class="portal-page">
    <PortalHeader />

    <main class="portal-main">
      <PortalSidebar 
        :nav-structure="navStructure"
        :active-nav="activeNav"
        @select="handleSelect"
      />

      <OverviewPanel v-if="activeNav === 'overview'" />
      <OpsPanel v-else-if="activeNav === 'opspanel'" />
      <MacEatsPanel v-else-if="activeNav === 'maceats'" />
      <AgentSDemo v-else-if="activeNav === 'agent-s'" />
      <HSRGrafanaPanel v-else-if="activeNav === 'hsr-grafana'" />
      
      <InferencePanel 
        v-else 
        :active-nav="activeNav"
        :current-nav-item="currentNavItem"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 引入拆分后的组件
import PortalHeader from "../components/portal/PortalHeader.vue";
import PortalSidebar from "../components/portal/PortalSidebar.vue";
import OverviewPanel from "../components/portal/OverviewPanel.vue";
import OpsPanel from "../components/portal/OpsPanel.vue";
import MacEatsPanel from "../components/portal/MacEatsPanel.vue";
import AgentSDemo from "../components/portal/AgentSDemo.vue";
import HSRGrafanaPanel from "../components/portal/HSRGrafanaPanel.vue";
import InferencePanel from "../components/portal/InferencePanel.vue";

const activeNav = ref("overview");

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
  { type: "header", label: "Data Analysis" },
  { type: "item", id: "hsr-grafana", label: "HSR OpsPanel: Real-time Intelligence", impl: null }
]);

const currentNavItem = computed(() => {
  return navStructure.value.find(item => item.id === activeNav.value) || {};
});

const handleSelect = (id) => {
  activeNav.value = id;
};
</script>

<style scoped>
/* 根容器布局 */
.portal-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #f7f9fc;
  overflow: hidden;
}

/* 主体区域布局：左侧Sidebar + 右侧内容 */
.portal-main {
  flex: 1;
  display: flex;
  gap: 16px; /* Sidebar 和 内容 之间的间距 */
  padding: 16px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}
</style>