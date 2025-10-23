<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import SideMenuModal from "@/components/modal/SideMenuModal.vue";
import CurrentWeather from "@/components/weather/CurrentWeather.vue";
import DailyWeather from "@/components/weather/DailyWeather.vue";
import HourlyWeather from "@/components/weather/HourlyWeather.vue";
import WeatherGrid from "@/components/weather/WeatherGrid.vue";
import WeatherNavbar from "@/components/WeatherNavbar.vue";
import { useWeatherStore } from "@/stores/weather";

const weatherStore = useWeatherStore();
const { error, isDay, weather } = storeToRefs(weatherStore);

const route = useRoute();

const menuOpen = ref(false);

function getRouteFromParams() {
  // route.params.location has a type of <string | string[]>, so convert the string (most likely not a string array here)
  // into a string so that ts doesn't yell at me
  const location = route.params.location.toString();

  if (!location || route.query?.searched) return;

  weatherStore.getWeatherByName(location);
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

onMounted(() => {
  window.scrollTo(0, 0); // scroll to top when page is loaded, fixes page loading somewhere in the middle of the page on mobile devices
  getRouteFromParams();
});

watch(isDay, () => {
  document.body.style.backgroundColor = isDay.value ? "#2885dd" : "#111128";
});
</script>

<template>
  <div class="weather" :class="isDay ? 'weather--day' : 'weather--night'">
    <WeatherNavbar :menu-open="menuOpen" @menu-button="toggleMenu" />
    <div v-if="weather?.current" class="weather__container">
      <CurrentWeather />
      <HourlyWeather />
      <WeatherGrid />
      <DailyWeather />
    </div>
    <div v-else class="weather__container">
      <template v-if="error">
        <h1>Cannot fetch weather data</h1>
        <p>The location you searched for doesn't exist, or an error occured</p>
      </template>
      <h1 v-else-if="route.params.location">Loading...</h1>
      <h1 v-else>Enter in a location to get weather data</h1>
    </div>
    <SideMenuModal v-if="menuOpen" menu-style="glass" @close="toggleMenu" />
    <footer class="weather__footer">
      <p>Under development</p>
      <a href="https://open-meteo.com/">
        <u>Weather data by Open-Meteo.com</u>
      </a>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.weather {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: calc(100vw - (100vw - 100%)); // subtract viewport by scrollbar width
  min-height: 100vh;

  padding: 80px 0 16px;

  color: #f8f8f8;
  text-shadow: 0px 2px 8px #0004;

  animation: fadein 0.5s;
  transition: background-color 0.25s ease;

  @media (min-width: 768px) {
    padding-top: 96px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;

    @media (max-width: 767px) {
      padding: 0 16px;
    }
  }

  &--day {
    background-color: #2885dd;
  }

  &--night {
    background-color: #111128;
  }

  &__footer {
    padding-top: 16px;
    text-align: center;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
