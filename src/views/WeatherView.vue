<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import { useWeatherStore } from '@/stores/weather';
import { TemperatureUnits } from '@/utils/constants';

import Searchbar from '@/components/LocationSearchbar.vue';
import CurrentWeather from '@/components/weather/CurrentWeather.vue';
import DailyWeather from '@/components/weather/DailyWeather.vue';
import HourlyWeather from '@/components/weather/HourlyWeather.vue';
import WeatherGrid from '@/components/weather/WeatherGrid.vue';

const weatherStore = useWeatherStore();
const { error, temperatureUnit, weather } = storeToRefs(weatherStore);

const route = useRoute();

function getRouteFromParams() {
    // route.params.location has a type of <string | string[]>, so convert the string (most likely not a string array here)
    // into a string so that ts doesn't yell at me
    const location = route.params.location.toString();

    if (!location) return;

    weatherStore.getWeatherByName(location);
}

onMounted(() => {
    window.scrollTo(0, 0); // scroll to top when page is loaded, fixes page loading somewhere in the middle of the page on mobile devices

    getRouteFromParams();
    console.log(window.innerWidth);
})
</script>

<template>
    <div
        class="weather"
        :class="weather?.current?.is_day ? 'weather--day' : 'weather--night'"
    >
        <div
            class="weather__top-bar"
            :class="{ 'weather__top-bar--day': weather?.current?.is_day }"
        >
            <a href="/">
                <h1>A Vue Weather App</h1>
            </a>
            <Searchbar class="weather__search-bar" />
            <button
                class="weather__menu-button"
                @click="weatherStore.toggleTemperatureUnit"
            >
                {{ temperatureUnit === TemperatureUnits.FAHRENHEIT ? 'F' : 'C' }}
            </button>
        </div>
        <div
            v-if="weather?.current"
            class="weather__container"
        >
            <CurrentWeather />
            <HourlyWeather />
            <WeatherGrid />
            <DailyWeather />
        </div>
        <div
            v-else
            class="weather__container"
        >
            <template v-if="error">
                <h1>Cannot fetch weather data</h1>
                <p>
                    The location you searched for doesn't exist, or an error occured
                </p>
            </template>
            <h1 v-else-if="route.params.location">
                Loading...
            </h1>
            <h1 v-else>
                Enter in a location to get weather data
            </h1>
        </div>
        <footer class="weather__footer">
            <p>This is the weather page. (under development)</p>
            <a href="https://open-meteo.com/">
                <u>Weather data by Open-Meteo.com</u>
            </a>
        </footer>
    </div>
</template>

<style scoped lang="scss">
    .weather {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: calc(100vw - (100vw - 100%)); // subtract viewport by scrollbar width
        min-height: 100vh;

        padding: 80px 0 16px;

        color: #f8f8f8;
        text-shadow: 0px 2px 8px #0004;

        animation: fadein 0.5s;
        transition: background-color 0.25s ease;

        @media (min-width: 768px) {
            padding-top: 96px;
        }

        &__search-bar {
            width: 100%;

            @media (min-width: 768px) {
                flex-grow: 1;
                width: unset;
                margin-left: 16px;
            }
        }


        &__top-bar {
            display: flex;
            position: fixed;
            inset: 0;
            flex-direction: row;
            align-items: center;

            margin-bottom: 2rem;
            height: 72px;
            padding: 8px 64px;

            background: linear-gradient(#1d104b, transparent);

            animation: all 0.5s ease;

            &--day {
                background: linear-gradient(#89c6ff, #2885dd, transparent);
            }

            @media (max-width: 767px) {
                padding: 16px;

                h1 {
                    display: none;
                }
            }

            h1 {
                font-weight: 500;
                font-size: 24px;
                color: #f8f8f8;
            }
        }

        &__menu-button {
            margin-left: 16px;

            height: 40px;
            width: 40px;
            border-radius: 16px;
            border: none;
        }

        &__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            width: 100%;

            @media (max-width: 767px) {
                padding: 0 16px;
            }
        }

        &--day {
            background-color: #2885dd;
        }

        &--night {
            background-color: #111128;
        }

        &__footer {
            padding-top: 16px;
            text-align: center;
        }
    }

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
