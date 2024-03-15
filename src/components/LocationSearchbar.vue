<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const weatherStore = useWeatherStore();

const location = ref('');
const locationsSearched = ref(false);
const { locations } = storeToRefs(weatherStore);

let timer: number;

const router = useRouter();

const getLocations = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        weatherStore.getLocations(location.value);
        locationsSearched.value = true;
    }, 750);
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
    weatherStore.getWeatherFromGeocoding(location);
    router.push({
        name: "weather",
        query: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    });
};
</script>

<template>
    <div>
        <div class="location-searchbar">
            <input
                v-model="location"
                class="location-searchbar__input"
                placeholder="Enter a city or zip code"
                @keyup.stop="getLocations"
                @keyup.enter="getWeather"
            />
            <button class="location-searchbar__button" @click="getWeather">
            <font-awesome-icon 
                :icon="['fas', 'magnifying-glass']" 
                style="color: #282;" 
                size="xl"
            />
            </button>
        </div>
        <div v-if="locationsSearched" class="location-searchbar__list">
            <div 
                v-for="location in locations"  
                :key=location 
                class="location-searchbar__list-item"
                @click="getWeatherByCoords(location)"
            >
                <p>
                    {{ location.name }}, {{ location.admin1 }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .location-searchbar {
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;

        border: 1px solid #ccc;
        border-radius: 16px;
        height: 40px;
        width: 100%;
        padding: 8px;

        background-color: #fff;

        font-size: 1.2rem;

        &__input {
            border: none;
            height: 100%;
            width: 95%;

            outline: none;
            font-size: 1.2rem;
        }

        &__button {
            margin: auto;
            margin-right: 0;
            border: none;
            border-radius: 100px;
            height: 100%;

            background-color: transparent;
        }

        &__list {
            position: absolute;

            margin-top: 1rem;
            border-radius: 8px;

            background-color: white;
            color: #000;
        }

        &__list-item {
            border-bottom: 1px solid #000;
            width: 100%;
            height: 100%;
            padding: 0.5rem 1rem;

            &:last-of-type {
                border-bottom: none;
            }

            &:hover{
                background-color: #ccc;
                cursor: pointer;

                &:first-of-type {
                    border-radius: 8px 8px 0 0;
                }

                &:last-of-type {
                    border-radius: 0 0 8px 8px;
                }
            }
        }
    }
</style>
