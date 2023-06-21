<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import router from '@/router';
const weatherStore = useWeatherStore();

const location = ref('');

const getWeather = () => {
    weatherStore.setLocation(location.value);
    weatherStore.getWeather();
    router.push('/weather');
};

</script>

<template>
    <div class="searchbar">
        <input v-model="location" placeholder="Enter a city or zip code" @keyup.enter="getWeather"/>
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
</style>
