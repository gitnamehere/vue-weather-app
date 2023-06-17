<script setup lang="ts">
import axios from 'axios'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
    <main>
        <h1>A Vue Weather App</h1>
        <form class="searchbar">
            <input type="text" placeholder="Enter your city" />
            <button type="submit">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #242;" size="xl" />
            </button>
        </form>
  </main>
</template>

<style scoped>
    h1 {
    font-weight: 500;
    font-size: 2.6rem;
    }

    .searchbar {
    margin-top: 2rem;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 100px;
    font-size: 1.2rem;
    padding-left: 5%;
    height: 3rem;
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
    margin-top: 0;
    padding-top: 0%;
    }

</style>