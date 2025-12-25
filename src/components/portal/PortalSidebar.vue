<template>
  <aside class="navigation-sidebar">
    <nav class="nav-list">
      <template v-for="(item, index) in navStructure" :key="index">
        <div v-if="item.type === 'header'" class="nav-category-header">
          {{ item.label }}
        </div>

        <button
          v-else
          :class="['nav-item', { active: activeNav === item.id }]"
          @click="$emit('select', item.id)"
        >
          <span class="nav-icon" v-if="item.id === 'overview'">🏠</span>
          <span class="nav-indent" v-else>├─</span>
          {{ item.label }}
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
.nav-category-header { font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin: 16px 0 8px 12px; letter-spacing: 0.8px; }
.nav-item {
  width: 100%; padding: 10px 16px; border: none; border-radius: 6px; background: transparent; color: #4b5563;
  font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; text-align: left;
  display: flex; align-items: center; gap: 8px;
}
.nav-indent { color: #d1d5db; font-family: monospace; font-size: 16px; }
.nav-icon { font-size: 16px; }
.nav-item:hover { background: #f3f4f6; color: #111827; }
.nav-item.active { background: linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%); color: #764ba2; font-weight: 600; border-left: 3px solid #764ba2; }
</style>