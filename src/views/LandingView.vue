<script setup lang="ts">
import Searchbar from '@/components/LocationSearchbar.vue';
</script>

<template>
    <div class="landing">
        <h1 class="landing__title">
            A Vue Weather App
        </h1>
        <Searchbar class="landing__search-bar" />
        <div class="landing__api-link">
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .landing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        margin: auto;
        width: 100vw;
        height: 100vh;

        &__title {
            margin-top: -5rem;

            font-weight: 500;
            font-size: 2.6rem;
            text-align: center;
        }

        &__api-link {
            margin-top: 1rem;
            font-size: 0.8rem;
            text-align: center;
        }

        &__search-bar {
            margin-top: 1rem;
            width: 50%;

            @media (max-width: 767px) {
                width: 95%
            }
        }
    }
</style>
