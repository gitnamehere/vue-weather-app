<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import parseWeatherCode from '../utils/weatherCodes';
import Searchbar from '@/components/LocationSearchbar.vue';

const weatherStore = useWeatherStore();

const { weather, geocoding } = storeToRefs(weatherStore);

</script>

<template>
    <Transition>
        <div class="background" ></div>
    </Transition>
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
            <div class="location">
                <h1 v-if="geocoding">{{geocoding.name}}, {{geocoding.admin1}}</h1>
                <h2 v-if="weather">{{geocoding.country}}</h2>
            </div>
            <div v-if="weather" class="current-weather-container">
                <div class="current-conditions-container">
                    <text>insert image here</text>
                    <text class="current-conditions">{{parseWeatherCode(weather.weathercode)}}</text>
                </div>
                <div class="current-temperature-container">
                    <h2 class="current-temperature">{{weather.temperature}}</h2>
                    <text class="current-temperature-unit">°F</text>
                </div>
            </div>
            <text v-if="weather">Windspeed: {{weather.windspeed}}mph @ {{weather.winddirection}}° (compass directions coming soon!)</text>
            <text v-if="weather">
                <text v-if="weather.is_day">It is currently day.</text>
                <text v-else>It is currently night.</text>
            </text>
            <text v-if="weather">Weather Data (debug)</text>
            <div>
                <text> {{ weather }} </text>
            </div>  
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

    @media (max-width: 767px) {
        .top-bar {
            padding: 1rem;
        }

        .top-bar h1 {
        display: none;
        }

        .top-bar-search {
        width: 100%;
        }
    }

    @media (min-width: 768px) {
        .top-bar-search {
        width: 80%;
        }
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

        margin: 1rem auto;
    }

    .current-weather-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10rem;
        width: 70%;
        margin: 1rem auto;
    }

    .current-conditions-img {
        height: 100%;
        width: auto;
        margin-right: 1rem;
    }

    .current-conditions-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;
        padding: 1rem;
        margin-right: 1rem;

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

    background-color: #2885dd;
    animation: fadein 0.5s;
    }
</style>
