<script setup lang="ts">
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
    <div class="container">
        <div class="topBar">
            <h1>A Vue Weather App</h1>
            <div class="searchBarTop">
                <Searchbar />
            </div>
        </div>
        <div class="body">
            <text>This is the weather page. (under development)</text>
            <text v-if="geocoding">Geocoding Data (debug)</text>
            <div>
                <text> {{ geocoding }} </text>
            </div>
            <text v-if="weather">Weather Data (debug)</text>
            <div>
                <text> {{ weather }} </text>
            </div>  
            <footer class="footer">
                <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
            </footer>
        </div>
    </div>
</template>

<style>
    .container {
        left: 0%;
        top: 0%;
        height: auto;
        width: auto;
    }
    .topBar {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        width: 100vw;
        padding: 1rem 5rem;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .searchBarTop {
        display: flex;
        width: 80%;
    }
    
    .body {
        height: auto;
        display: flex;
        margin-top: 10%;
        padding: 0 2%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .footer {
        position: fixed;
        display: flex;
        width: 100vw;
        align-items: center;
        justify-content: center;
        bottom: 0;
        margin-bottom: 2rem;
    }
</style>