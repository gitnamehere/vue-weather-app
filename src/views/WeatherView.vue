<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import Searchbar from '@/components/Searchbar.vue';

const weatherStore = useWeatherStore();

const { weather, geocoding } = storeToRefs(weatherStore);

weatherStore.$subscribe(() => {
    geocoding.value = weatherStore.geocoding;
    weather.value = weatherStore.weather;
});

</script>

<template>
    <Transition>
        <div class="background" ></div>
    </Transition>
    <div class="container">
        <div class="topBar">
            <a href="/" style="color: #1c1c1c;">
                <h1>A Vue Weather App</h1>
            </a>
            <div class="searchBarTop">
                <Searchbar />
            </div>
        </div>
        <div class="body">
            <div class="location">
                <h1 v-if="geocoding">{{geocoding.name}}, {{geocoding.admin1}}</h1>
                <h2 v-if="weather">{{geocoding.country}}</h2>
            </div>
            <text v-if="weather">Temperature: {{weather.temperature}}°F</text>
            <text v-if="weather">Windspeed: {{weather.windspeed}}mph @ {{weather.winddirection}}° (compass directions coming soon!)</text>
            <text v-if="weather">Conditions: {{weather.weathercode}} (This is a WMO weather interpretation code, check what it means in open-meteo's api docs. English interpretation coming soon)</text>
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
        color: #f8f8f8;
        left: 0%;
        top: 0%;
        height: 100vh;
        width: auto;
        align-items: center;
        justify-content: center;
    }
    .topBar {
        animation: fadein 0.5s;
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.4);
        background: #0f406e;
        display: flex;
        width: 100vw;
        padding: 1rem 5rem;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 1rem;
    }

    @media (max-width: 767px) {

        .topBar {
            padding: 1rem;
        }
        .topBar h1 {
        display: none;
        font-weight: 500;
        font-size: 1.5vw;
        color: #f8f8f8;
        }

        .searchBarTop {
        display: flex;
        width: 100%;
        }
    }

    @media (min-width: 768px) {
        .topBar h1 {
        font-weight: 500;
        font-size: 1.5vw;
        color: #f8f8f8;
        }

        .searchBarTop {
        display: flex;
        width: 80%;
        }
    }

    .body {
        height: auto;
        display: flex;
        padding: 0 2%;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }

    .location {
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .footer {
        position: fixed;
        display: flex;
        flex-direction: column;
        left: 0;
        width: 100vw;
        align-items: center;
        justify-content: center;
        bottom: 0;
        margin-bottom: 2rem;
        text-align: center;
    }

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    .background {
    position: absolute;
    background-color: #2885dd;
    animation: fadein 0.5s;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
    }
</style>