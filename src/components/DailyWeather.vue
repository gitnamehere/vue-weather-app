<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import parseWeatherCode from '@/utils/weatherCodes';
const weatherStore = useWeatherStore();
const { weather } = storeToRefs(weatherStore);

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<template>
    <div v-if="weather.daily" class="daily-weather__container">
        <div class="daily-weather__title">
            <h2>10 Day Forecast</h2>
        </div>
        <div class="daily-weather__list">
            <div v-for="day in 10" :key=day class="daily-weather__list-item">
                <p class="daily-weather__text">
                    {{ day == 1 ? "Today" : daysOfTheWeek[new Date(weather.daily.time[day-1]).getUTCDay()] }}
                </p>
                <i class="daily-weather__icon wi" :class="parseWeatherCode({ code: weather.daily.weathercode[day-1] }).icon"></i>
                <div>
                    <p class="daily-weather__text">
                        L: {{ `${weather.daily.temperature_2m_min[day-1]}${weather.daily_units.temperature_2m_min}` }}
                    </p>
                    <p class="daily-weather__text">
                        H: {{ `${weather.daily.temperature_2m_max[day-1]}${weather.daily_units.temperature_2m_max}` }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .daily-weather {
        &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

            border-radius: 16px;
            width: 48rem;
            padding: 1rem;

            background-color: #5684;
            
            @media (max-width: 768px) {
                width: 95%;
            }
        }
    

        &__icon {
            margin: 10px 0;
            font-size: 2rem;
        }
    

        &__list {
            display: flex;
            flex-direction: row;
            align-items: center;

            overflow-x: scroll;
            width: 100%;
        }

        &__list-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            margin: 8px;
            padding: 4px 0;
            height: auto;
            min-width: 80px;

            background-color: #AAA2;
            border-radius: 8px;

            &:first-of-type {
                margin-left: 0;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }

        &__title {
            display: block;
            width: 100%;
        }

        &__text {
            font-size: 16px;
        }
    }
</style>