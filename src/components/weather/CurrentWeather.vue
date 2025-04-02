<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWeatherStore } from "@/stores/weather";

const weatherStore = useWeatherStore();
const { weather, geocoding, weatherConditions } = storeToRefs(weatherStore);
</script>

<template>
  <div
    v-if="weather?.current"
    class="current-weather"
  >
    <div class="current-weather__location">
      <h1 class="current-weather__location-name">
        {{ geocoding.name }}{{ geocoding.admin1 ? `, ${geocoding.admin1}` : "" }}
      </h1>
      <h2 class="current-weather__location-country">
        {{ geocoding.country }}
      </h2>
    </div>
    <div class="current-weather__weather-container">
      <div class="current-weather__conditions">
        <i
          class="current-weather__conditions-text current-weather__conditions-icon wi"
          :class="weatherConditions?.icon"
        />
        <p class="current-weather__conditions-text">
          {{ weatherConditions?.description }}
        </p>
      </div>
      <div class="current-weather__temperature">
        <h2 class="current-weather__temperature-text">
          {{ weather.current.temperature_2m }}
        </h2>
        <p class="current-weather__temperature-unit">
          {{ weather.daily_units.temperature_2m_min }}
        </p>
      </div>
      <div
        v-if="weather.daily"
        class="current-weather__data"
      >
        <p class="current-weather__data-text">
          H:
          {{ `${weather.daily.temperature_2m_max[0]}${weather.daily_units.temperature_2m_max}` }}
        </p>
        <p class="current-weather__data-text">
          L:
          {{ `${weather.daily.temperature_2m_min[0]}${weather.daily_units.temperature_2m_min}` }}
        </p>
        <p class="current-weather__data-text">
          Feels Like:
          {{ `${weather.current.apparent_temperature}${weather.daily_units.temperature_2m_min}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.current-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80%;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }

  &__location {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 16px;

    text-align: center;

    @media (max-width: 767px) {
      margin-bottom: 0;
    }

    &-name {
      @media (max-width: 767px) {
        font-size: 24px;
      }
    }

    &-country {
      @media (max-width: 767px) {
        font-size: 16px;
      }
    }
  }

  &__weather-container {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      display: grid;
      height: 92px;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__conditions,
  &__temperature,
  &__data {
    display: flex;
  }

  &__conditions,
  &__data {
    box-sizing: content-box;
    padding: 16px 0;

    @media (max-width: 767px) {
      padding: 8px 0;
    }
  }

  &__conditions {
    flex-direction: column;
    align-items: center;

    padding-left: 80px;

    @media (max-width: 767px) {
      flex-direction: row;
      justify-content: center;
      padding-left: unset;
      width: 100%;
    }
  }

  &__conditions-text {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }

  &__conditions-icon {
    font-size: 2rem;

    @media (max-width: 767px) {
      margin-right: 8px;
    }
  }

  &__temperature {
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin: 0 32px;

    @media (min-width: 768px) {
      margin-bottom: 16px;
    }
  }

  &__temperature-text {
    font-size: 4rem;
    font-weight: 500;
    line-height: 4rem;

    @media (min-width: 768px) {
      font-size: 5rem;
    }
  }

  &__temperature-unit {
    margin-top: -1.7rem;
    font-size: 2rem;
    font-weight: 200;
  }

  &__data {
    flex-direction: column;
    justify-content: center;

    height: 60%;

    text-wrap: nowrap;

    @media (max-width: 767px) {
      flex-direction: row;

      width: 95%;
    }
  }

  &__data-text {
    font-weight: 500;

    @media (max-width: 767px) {
      &:not(:last-of-type) {
        margin-right: 1rem;
      }
    }
  }
}
</style>
