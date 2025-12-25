<template>
  <aside class="navigation-sidebar">
    <nav class="nav-list">
      <template v-for="(item, index) in navStructure" :key="index">
        
        <div v-if="item.type === 'header'" class="nav-category-header">
          {{ item.label }}
        </div>

        <button
          v-else
          :class="[
            'nav-item', 
            { 'active': activeNav === item.id },
            { 'overview-style': item.id === 'overview' }
          ]"
          @click="$emit('select', item.id)"
        >
          <span 
            v-if="item.id !== 'overview' && ['web-mvc', 'jni', 'web-flux', 'grpc'].includes(item.id)" 
            class="nav-indent"
          >
            ├─
          </span>
          
          <span class="nav-label">{{ item.label }}</span>
        </button>

      </template>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  navStructure: { type: Array, required: true },
  activeNav: { type: String, required: true }
});
defineEmits(['select']);
</script>

<style scoped>
.navigation-sidebar {
  flex: 0 0 240px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.nav-list { display: flex; flex-direction: column; gap: 4px; }

/* =========================================
   1. Header 样式 (基准样式)
   ========================================= */
.nav-category-header {
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af; /* 浅灰色 */
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 16px 0 8px 12px; /* 关键定位：左边距 12px */
  line-height: 20px;
  user-select: none;
}

/* =========================================
   2. 普通导航项样式 (Web MVC 等)
   ========================================= */
.nav-item {
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit; /* 防止 button 字体不一致 */
}

/* 普通项悬停和选中效果 */
.nav-item:not(.overview-style):hover { 
  background: #f3f4f6; 
  color: #111827; 
}
.nav-item:not(.overview-style).active {
  background: linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%);
  color: #764ba2;
  font-weight: 600;
  border-left: 3px solid #764ba2;
}

/* =========================================
   3. Overview 特殊样式 (伪装成 Header)
   ========================================= */
.nav-item.overview-style {
  /* --- 字体特征复制 Header --- */
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  line-height: 20px;

  /* --- 布局特征复制 Header --- */
  padding: 0;             /* 移除按钮内边距 */
  margin: 16px 0 8px 12px; /* 与 Header 保持完全一致的外边距 */
  background: transparent !important; /* 强制无背景 */
  border: none;
  height: auto;
  
  /* --- 交互微调 --- */
  cursor: pointer;
}

/* Overview 悬停反馈 (仅文字变色，不加背景) */
.nav-item.overview-style:hover {
  color: #6b7280; /* 稍微变深一点，提示可点击 */
}

/* Overview 选中状态 (文字变品牌色) */
.nav-item.overview-style.active {
  color: #764ba2; 
}

/* 缩进符号样式 */
.nav-indent { color: #d1d5db; font-family: monospace; font-size: 16px; }
.nav-label { flex: 1; }
</style>