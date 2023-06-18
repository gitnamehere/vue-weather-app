<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const API_URL = "https://api.open-meteo.com/v1/";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/";

const location = ref("");
const longitude = ref();
const latitude = ref();
const temperature_unit = ref("fahrenheit");
const weather = ref(); // This will be a JSON object based on the API's current_weather response, or error

const getWeather = async () => {
    axios
        .get(`${GEOCODING_API_URL}search?name=${location.value}&count=1&language=en&format=json`)
        .then((res) => {
            console.log(res);
            longitude.value = res.data.results[0].longitude;
            latitude.value = res.data.results[0].latitude;
            getWeatherData();
        })
        .catch((err) => {
            console.log(err);
            weather.value = "Error: Location not found."
        });

    const getWeatherData = () => {
        axios
            .get(`${API_URL}forecast?latitude=${latitude.value}&longitude=${longitude.value}&current_weather=true&temperature_unit=${temperature_unit.value}`)
            .then((res) => {
                console.log(res);
                weather.value = res.data.current_weather
            })
            .catch((err) => {
                console.log(err);
                weather.value = "Error: Weather Data Error."
            });
    };
}

</script>

<template>
    <main>
        <h1>A Vue Weather App</h1>
        <div class="searchbar">
            <input v-model="location" placeholder="Enter a city or zip code" />
            <button @click="getWeather">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #242;" size="xl" />
            </button>
        </div>
        <text> {{ weather }} </text>
  </main>
</template>

<style scoped>
    h1 {
    font-weight: 500;
    font-size: 2.6rem;
    text-align: center;
    }

    .searchbar {
    margin-top: 2rem;
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
    margin-top: -5px;
    padding-top: 0%;
    }

</style>