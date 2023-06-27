<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import parseWeatherCode from '../utils/weatherCodes';
import Searchbar from '@/components/LocationSearchbar.vue';

const weatherStore = useWeatherStore();

const { weather, geocoding } = storeToRefs(weatherStore);

</script>

<!--TODO: refactor code into seperate components-->

<template>
    <!--Background-->
    <div v-if="weather">
        <div v-if="weather.current_weather.is_day" class="background day"></div>
        <div v-else class="background night"></div>
    </div>

    <div class="container">
        <div class="top-bar">
            <a href="/">
                <h1>A Vue Weather App</h1>
            </a>
            <div class="top-bar-search">
                <Searchbar />
            </div>
        </div>

        <div class="body">
            <div v-if="geocoding" class="location">
                <h1>{{geocoding.name}} {{geocoding.admin1}}</h1>
                <h2>{{geocoding.country}}</h2>
            </div>
            <div v-if="weather" class="current-weather-container">
                <div class="current-conditions-container">
                    <i class="current-conditions wi" :class="parseWeatherCode({ code: weather.current_weather.weathercode, isDay: weather.current_weather.is_day }).icon"></i>
                    <text class="current-conditions">{{ parseWeatherCode({ code: weather.current_weather.weathercode, isDay: weather.current_weather.is_day }).description }}</text>
                </div>
                <div class="current-temperature-container">
                    <h2 class="current-temperature">{{weather.current_weather.temperature}}</h2>
                    <text class="current-temperature-unit">{{weather.daily_units.temperature_2m_min}}</text>
                </div>
                <div v-if="weather.daily" class="weather-data-container">
                    <div>
                        <text class="min-max-temperature">H: {{weather.daily.temperature_2m_max[0]}}</text>
                        <text class="min-max-temperature">{{weather.daily_units.temperature_2m_max}}</text>
                    </div>
                    <div>
                        <text class="min-max-temperature">L: {{weather.daily.temperature_2m_min[0]}}</text>
                        <text class="min-max-temperature">{{weather.daily_units.temperature_2m_min}}</text>
                    </div>
                    <text class="min-max-temperature"><font-awesome-icon :icon="['fas', 'wind']" />: {{weather.current_weather.windspeed}}mph</text>
                </div>
            </div>
            <!--Unfinished stuff-->
            <text v-if="weather">Windspeed: {{weather.current_weather.windspeed}}mph @ {{weather.current_weather.winddirection}}° (compass directions coming soon!)</text>
        </div>
        <footer class="footer">
            <text>This is the weather page. (under development)</text>
            <a href="https://open-meteo.com/" style="color: #f8f8f8;"><u>Weather data by Open-Meteo.com</u></a>
        </footer>
    </div>
</template>

<style scoped>
    .container {
        align-items: center;
        justify-content: center;

        height: 100vh;
        width: auto;

        color: #f8f8f8;
        text-shadow:  0px 2px 8px #0004;
    }

    .top-bar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        width: 100vw;
        padding: 1rem 5rem;
        margin-bottom: 1rem;

        background: #0f406e;
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.4);

        animation: fadein 0.5s;
    }

    .top-bar h1 {
        font-weight: 500;
        font-size: 1.5vw;
        color: #f8f8f8;
    }

    .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        height: auto;
        padding: 0 2%;
    }

    .location {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 1rem 0rem auto;
    }

    .current-weather-container {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 10rem;
        width: 80%;
    }

    .current-conditions-img {
        height: 100%;
        width: auto;
    }

    .current-conditions-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;
        width: 15%;
        padding: 1rem 0;

    }

    .current-conditions {
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 2rem;
    }

    .current-temperature-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        height: 100%;
        width: 15rem;
        margin: 2rem;
    }

    .current-temperature {
        font-size: 5rem;
        font-weight: 500;
        line-height: 5rem;
    }
    .current-temperature-unit {
        margin-top: -1.7rem;
        font-size: 2rem;
        font-weight: 200;
    }

    .weather-data-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 60%;
        width: 15%;
    }

    .min-max-temperature {
        font-weight: 500;
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100vw;
        margin-bottom: 2rem;

        text-align: center;
    }

    @media (max-width: 768px) {
        .top-bar {
            padding: 1rem;
        }

        .top-bar h1 {
        display: none;
        }

        .top-bar-search {
        width: 100%;
        }

        .current-weather-container {
            flex-direction: column;
            margin: 2rem;


            height: auto;
        }

        .current-conditions-container {
            width: 95%;
        }

        .current-temperature-container {
            margin: 0;
        }

        .weather-data-container {
            flex-direction: row;
            margin-top: 1rem;

            width: 95%;
        }
        
        .min-max-temperature:nth-child(even) {
            margin-right: 1rem;
        }
    }

    @media (min-width: 769px) {
        .top-bar-search {
        width: 80%;
        }
    }

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Day: 2885dd */
    /* Night: 111128 */
    .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;

    animation: fadein 0.5s;
    }

    .day {
    background-color: #2885dd;
    }

    .night {
    background-color: #111128;
    }

</style>
