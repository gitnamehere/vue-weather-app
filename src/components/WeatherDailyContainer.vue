<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import parseWeatherCode from '../utils/weatherCodes';
const weatherStore = useWeatherStore();
const { weather } = storeToRefs(weatherStore);

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<template>
    <div v-if="weather.daily" class="daily-weather">
        <h2>7 Day Forecast (WIP)</h2>
        <div class="daily-weather-list">
            <div v-for="day in 7" class="daily-weather-item">
                <text>{{ day == 1 ? "Today" : daysOfTheWeek[new Date(weather.daily.time[day-1]).getUTCDay()] }}</text>
                <i class="daily-icon wi" :class="parseWeatherCode({ code: weather.daily.weathercode[day-1] }).icon"></i>
                <div>
                    <div>
                        <text> L: {{ weather.daily.temperature_2m_min[day-1] }}</text>
                        <text>{{ weather.daily_units.temperature_2m_min }}</text>
                    </div>
                    <div>
                        <text> H: {{ weather.daily.temperature_2m_max[day-1] }}</text>
                        <text>{{ weather.daily_units.temperature_2m_max }}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .daily-weather {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 10rem;
        width: 80%;
        margin: 2rem;

        background-color: #4444;
        border-radius: 16px;
    }

    .daily-icon {
        font-size: 2rem;
        margin: 10px 0;
    }

    .daily-weather-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        height: 100%;
        width: 100%;
    }

    .daily-weather-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        height: 100%;
    }
    @media (max-width: 768px) {

        .daily-weather {
            margin: 1rem 0;
        }
    }
</style>