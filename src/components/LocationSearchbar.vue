<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import router from '@/router';
import { storeToRefs } from 'pinia';
const weatherStore = useWeatherStore();

const location = ref('');
const locationsSearched = ref(false);
const { locations } = storeToRefs(weatherStore);

let timer: number;

const getLocations = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        weatherStore.getLocations(location.value);
        locationsSearched.value = true;
    }, 1000);
}
const getWeather = () => {
    clearTimeout(timer);
    locationsSearched.value = false;
    weatherStore.setLocation(location.value);
    weatherStore.getWeather();
    router.push('/weather');
};

const getWeatherByCoords = (location: any) => {
    locationsSearched.value = false;
    weatherStore.getWeatherByCoords(location);
    router.push('/weather');
};

</script>

<template>
    <div>
        <div class="searchbar">
            <input v-model="location" placeholder="Enter a city or zip code" @keyup.stop="getLocations" @keyup.enter="getWeather"/>
            <button @click="getWeather">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #282;" size="xl" />
            </button>
        </div>
        <div v-if="locationsSearched" class="location-list-container">
            <div v-for="location in locations"  @click="getWeatherByCoords(location)" class="location-list-item">
                <text>{{ location.name }}, {{ location.admin1 }}</text>
            </div>
        </div>
    </div>
</template>

<style scoped>
    h1 {
    font-weight: 500;
    font-size: 2.6rem;
    text-align: center;
    }

    .searchbar {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3rem;
    width: 100%;
    padding: 10px;

    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 16px;

    font-size: 1.2rem;
    }

    .searchbar input {
    height: 100%;
    width: 89%;

    border: none;

    outline: none;
    font-size: 1.2rem;
    }

    .searchbar button {
    width: auto;
    height: 100%;
    margin: auto;
    margin-right: 0;

    background-color: transparent;
    border: none;
    border-radius: 100px;
    }

    .location-list-container {
    position: absolute;

    margin-top: 1rem;

    border-radius: 8px;
    background-color: white;
    color: #000;
    }

    .location-list-item {
        width: 100%;
        height: 100%;
        padding: 0.5rem 1rem;
        margin-bottom: 2px;
        border-bottom: 1px solid #000;
    }
    
    .location-list-container :last-child {
        border-bottom: none;
    }

    .location-list-item :hover{
        background-color: #ccc;
    }
</style>
