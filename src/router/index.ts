import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import WeatherView from "@/views/WeatherView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingView
    },
    {
      path: "/weather/:location?",
      name: "weather",
      component: WeatherView
    }
  ]
});

export default router;
