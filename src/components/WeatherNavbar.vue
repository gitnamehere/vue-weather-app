<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useWeatherStore } from '@/stores/weather';
import { TemperatureUnits } from '@/utils/constants';
import Searchbar from '@/components/LocationSearchbar.vue';

const weatherStore = useWeatherStore();
const { temperatureUnit, weather } = storeToRefs(weatherStore);
</script>

<template>
    <div
        class="navbar"
        :class="{ 'navbar--day': weather?.current?.is_day }"
    >
        <div
            class="navbar__content"
        >
            <a href="/vue-weather-app">
                <h1 class="navbar__content-title">A Vue Weather App</h1>
            </a>
            <Searchbar class="navbar__search-bar" />
            <button
                class="navbar__menu-button"
                @click="weatherStore.toggleTemperatureUnit"
            >
                {{ temperatureUnit === TemperatureUnits.FAHRENHEIT ? 'F' : 'C' }}
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.navbar {
    display: flex;
    position: fixed;
    inset: 0;
    flex-direction: row;

    margin-bottom: 2rem;
    height: 72px;
    padding: 8px 16px;

    background: linear-gradient(#1d104b, transparent);

    animation: all 0.5s ease;

    &--day {
        background: linear-gradient(#89c6ff, #2885dd, transparent);
    }

    &__content {
        display: flex;
        align-items: center;

        animation: all 0.5s ease;

        width: 960px;
        margin: auto;

        @media (max-width: 767px) {
            width: 100%;

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

    &__search-bar {
        width: 100%;

        @media (min-width: 768px) {
            flex-grow: 1;
            width: unset;
            margin-left: 16px;
        }
    }

    &__menu-button {
        margin-left: 16px;

        height: 40px;
        width: 40px;
        border-radius: 16px;
        border: none;
    }
}
</style>