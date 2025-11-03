// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ExperimentPortal from "../views/ExperimentPortal.vue";

const routes = [
  { path: "/", redirect: "/portal" },
  { path: "/portal", component: ExperimentPortal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
