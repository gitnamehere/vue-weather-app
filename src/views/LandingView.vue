<script setup lang="ts">
import Searchbar from '@/components/LocationSearchbar.vue';
</script>

<template>
    <div class="container">
        <h1>A Vue Weather App</h1>
        <Searchbar class="searchBar"/>
        <div class="weatherApiLink">
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
    </div>
</template>

<style scoped>
    .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    margin: auto;
    width: 100vw;
    height: 100vh;
    }

    h1 {
    margin-top: -5rem;

    font-weight: 500;
    font-size: 2.6rem;
    text-align: center;
    }

    .weatherApiLink {
    margin-top: 1rem;
    font-size: 0.8rem;
    text-align: center;
    }

    .searchBar {
    margin-top: 1rem;
    width: 50%;
    }
</style>
