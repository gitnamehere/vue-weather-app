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
        <div class="title">
            <h2>10 Day Forecast</h2>
        </div>
        <div class="daily-weather-list">
            <div v-for="day in 10" class="daily-weather-item">
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
        justify-content: space-evenly;

        margin: 2rem 0;
        border-radius: 16px;
        height: 14em;
        width: 54%;
        padding: 1rem 1rem;

        background-color: #5684;
    }

    .daily-weather h2 {
        margin: 0 0 5px 0;
    }

    .daily-icon {
        margin: 10px 0;
        font-size: 2rem;
    }

    .daily-weather-list {
        display: flex;
        flex-direction: row;
        align-items: center;

        overflow-x: scroll;

        margin: auto;
        height: 100%;
        width: 100%;
    }

    .daily-weather-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 0px 10px;
        padding: 5px 0;
        height: auto;
        width: auto;
        min-width: 80px;

        background-color: #AAA2;
        border-radius: 8px;
    }

    .title {
        display: block;
        width: 97%;
    }

    @media (max-width: 768px) {

        .daily-weather {
            margin: 1rem 0;
            width: 95%;
        }
    }

    text {
        font-size: 16px;
    }
</style>