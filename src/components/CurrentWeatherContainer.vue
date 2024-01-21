<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();
const { weather } = storeToRefs(weatherStore);
const { weatherConditions } = storeToRefs(weatherStore);

</script>

<template>
    <div class="current-weather">
        <div class="current-weather__conditions">
            <i class="current-weather__conditions-text current-weather__conditions-icon wi" :class="weatherConditions.icon"></i>
            <p class="current-weather__conditions-text">{{ weatherConditions.description }}</p>
        </div>
        <div class="current-weather__temperature">
            <h2 class="current-weather__temperature-text">{{weather.current_weather.temperature}}</h2>
            <p class="current-weather__temperature-unit">{{weather.daily_units.temperature_2m_min}}</p>
        </div>
        <div v-if="weather.daily" class="current-weather__data">
            <div>
                <p class="current-weather__data-text">H: {{ `${weather.daily.temperature_2m_max[0]}${weather.daily_units.temperature_2m_max}` }}</p>
            </div>
            <div>
                <p class="current-weather__data-text">L: {{ `${weather.daily.temperature_2m_min[0]}${weather.daily_units.temperature_2m_min}` }}</p>
            </div>
            <p class="current-weather__data-text"><font-awesome-icon :icon="['fas', 'wind']" />: {{weather.current_weather.windspeed}}mph {{weather.current_weather.winddirection}}°</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .current-weather {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 10rem;
        width: 80%;

        @media (max-width: 768px) {
            flex-direction: column;
            margin: 2rem;

            height: auto;
        }

        &__conditions {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            height: 100%;
            width: 15%;
            padding: 1rem 0;

            @media (max-width: 768px) {
                width: 95%;
            }
        }

        &__conditions-text {
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 2rem;
        }

        &__conditions-icon {
            font-size: 2rem;

            @media (max-width: 768px) {
                margin-bottom: 1rem;
                font-size: 3rem;
            }
        }

        &__temperature {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            height: 100%;
            width: 15rem;
            margin: 2rem;

            @media (max-width: 768px) {
                margin: 0;
            }
        }

        &__temperature-text {
            font-size: 5rem;
            font-weight: 500;
            line-height: 5rem;
        }

        &__temperature-unit {
            margin-top: -1.7rem;
            font-size: 2rem;
            font-weight: 200;
        }

        &__data {
            display: flex;
            flex-direction: column;
            justify-content: center;

            height: 60%;
            width: 15%;

            @media (max-width: 768px) {
                flex-direction: row;
                margin-top: 1rem;

                width: 95%;
            }
        }

        &__data-text {
            font-weight: 500;

            @media (max-width: 768px) {
                    margin-right: 1rem;
            }
        }
    }
</style>