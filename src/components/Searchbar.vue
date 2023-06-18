<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
const weatherStore = useWeatherStore();

const location = ref('');

const getWeather = () => {
    weatherStore.setLocation(location.value);
    weatherStore.getWeather();
};

</script>

<template>
    <div class="searchbar">
        <input v-model="location" placeholder="Enter a city or zip code" />
        <button @click="getWeather">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #282;" size="xl" />
        </button>
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
    margin-top: 1rem;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 100px;
    font-size: 1.2rem;
    padding-left: 5%;
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    }

    .searchbar input {
    border-radius: 100px;
    border: none;
    outline: none;
    font-size: 1.2rem;
    height: 100%;
    width: 89%;
    }

    .searchbar button {
    border-radius: 100px;
    background-color: transparent;
    border: none;
    height: 100%;
    width: 10%;
    margin: auto;

    }
</style>