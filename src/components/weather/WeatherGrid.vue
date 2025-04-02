<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWeatherStore } from "@/stores/weather";

import GridContainer from "@/components/grid/GridContainer.vue";
import HumidityCard from "@/components/weather/HumidityCard.vue";
import PressureCard from "@/components/weather/PressureCard.vue";
import WindCard from "@/components/weather/WindCard.vue";
import AQICard from "@/components/weather/AQICard.vue";
import CardItem from "@/components/CardItem.vue";

const weatherStore = useWeatherStore();

const { weather } = storeToRefs(weatherStore);
</script>

<template>
  <GridContainer class="weather-grid">
    <WindCard
      :direction="weather.current.wind_direction_10m"
      :speed="weather.current.wind_speed_10m"
      :unit="weather.current_units.wind_speed_10m"
    />
    <PressureCard :pressure="weather.current.surface_pressure" />
    <HumidityCard :humidity="weather.current.relative_humidity_2m" />
    <AQICard :aqi="weather.aqi" />
    <CardItem class="weather-grid__placeholder-item" header="" />
  </GridContainer>
</template>

<style lang="scss">
.weather-grid {
  margin-bottom: 16px;
  width: 960px;

  &__placeholder-item {
    display: none !important;

    @media (min-width: 576px) {
      display: unset !important;
      grid-column: 2 / span 2;
    }

    @media (min-width: 1024px) {
      display: none !important;
    }
  }
}
</style>
