<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

import Searchbar from '@/components/LocationSearchbar.vue';
import CurrentWeather from '@/components/CurrentWeather.vue'
import DailyWeather from '@/components/DailyWeather.vue';

const weatherStore = useWeatherStore();

const { weather } = storeToRefs(weatherStore);

</script>

<!--TODO: refactor code into seperate components-->

<template>
    <div 
        class="weather" 
        :class="weather?.current_weather.is_day ? 'background day' : 'background night'"
    >
        <div class="weather__top-bar">
            <a href="/">
                <h1>A Vue Weather App</h1>
            </a>
            <div class="weather__search-bar">
                <Searchbar />
            </div>
        </div>

        <div v-if="weather" class="weather__container">
            <CurrentWeather />
            <DailyWeather />
        </div>

        <div v-else class="weather__container">
                <h1>404 Not Found</h1>
                <p>This means you either reloaded the page, the location you searched could not be found, or an error occured.</p>
            </div>
        <footer class="footer">
            <p>This is the weather page. (under development)</p>
            <a href="https://open-meteo.com/" style="color: #f8f8f8;"><u>Weather data by Open-Meteo.com</u></a>
        </footer>
    </div>
</template>

<style scoped lang="scss">
    .weather {
        align-items: center;
        justify-content: center;

        height: 100vh;
        width: auto;

        color: #f8f8f8;
        text-shadow:  0px 2px 8px #0004;

        animation: fadein 0.5s;

        &__top-bar {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

            margin-bottom: 2rem;
            width: 100vw;
            padding: 1rem 10rem;

            background: #0f406e;
            box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.4);

            animation: fadein 0.5s;

            h1 {
                font-weight: 500;
                font-size: 1.5vw;
                color: #f8f8f8;
            }
        }

        &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;

            height: auto;
        }
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
        .weather__top-bar {
            padding: 1rem;
        }

        .weather__top-bar h1 {
        display: none;
        }

        .weather__search-bar {
        width: 100%;
        }

        .weather__current-weather {
            flex-direction: column;
            margin: 2rem;


            height: auto;
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
        .weather__search-bar {
        width: 80%;
        }
    }

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Day: 2885dd */
    /* Night: 111128 */


    .day {
    background-color: #2885dd;
    }

    .night {
    background-color: #111128;
    }

</style>
