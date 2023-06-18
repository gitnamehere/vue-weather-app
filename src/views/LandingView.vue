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
        <h1>A Vue Weather App</h1>
        <div class="searchBar">
            <Searchbar />
        </div>
        <div class="weatherApiLink">
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
    </div>
</template>

<style scoped>
    .container {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

    h1 {
    font-weight: 500;
    font-size: 2.6rem;
    text-align: center;
    margin-top: -5rem;
    }

    .weatherApiLink {
    font-size: 0.8rem;
    text-align: center;
    margin-top: 1rem;
    }

    .searchBar {
    margin-top: 1rem;
    width: 70%;
    }

</style>