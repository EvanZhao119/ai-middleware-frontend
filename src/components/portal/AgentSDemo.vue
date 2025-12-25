<template>
  <section class="demo-panel">
    <el-card shadow="hover" class="demo-card">
      <h3 class="section-title">🎬 Agent S Demo</h3>
      <div class="agent-demo-wrapper">
        <iframe
          class="agent-demo-frame"
          src="https://www.youtube.com/embed/Dc9ltHlA06M"
          title="Agent S Demo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.demo-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.demo-card { height: 100%; display: flex; flex-direction: column; }
.demo-card :deep(.el-card__body) { flex: 1; display: flex; flex-direction: column; padding: 24px; }
.section-title { font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; }
.agent-demo-wrapper { position: relative; width: 100%; max-width: 1100px; margin: 0 auto; flex: 1; padding-top: 56.25%; border-radius: 8px; overflow: hidden; background: #000; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); }
.agent-demo-frame { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
</style>