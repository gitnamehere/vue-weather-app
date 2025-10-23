<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useWeatherStore } from "@/stores/weather";
import Searchbar from "@/components/LocationSearchbar.vue";

const weatherStore = useWeatherStore();
const { weather } = storeToRefs(weatherStore);

defineProps<{
  menuOpen: boolean;
}>();

defineEmits(["menuButton"]);
</script>

<template>
  <div class="navbar" :class="{ 'navbar--day': weather?.current?.is_day }">
    <div class="navbar__content">
      <a href="/">
        <h1 class="navbar__content-title">A Vue Weather App</h1>
      </a>
      <Searchbar class="navbar__search-bar" list-offset="16px" />
      <button
        class="navbar__menu-button"
        :class="{
          'navbar__menu-button--day': weather?.current?.is_day,
          'navbar__menu-button--active': menuOpen
        }"
        @click="$emit('menuButton')"
      >
        <font-awesome-icon :icon="['fas', 'gear']" size="xl" />
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
    border: 1px solid #ccc;

    color: #fff;
    background-color: #3382;

    aspect-ratio: 1;

    transition: 0.25s ease;

    &:hover:not(&--active) {
      background-color: #fff;
      color: #1d104b;
    }

    &--active {
      background-color: #fff;
      color: #1d104b;

      &:hover {
        color: #2885dd;
      }
    }
  }
}
</style>
