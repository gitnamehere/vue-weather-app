<script setup lang="ts">
import CardItem from "@/components/CardItem.vue";

interface Props {
  aqi: number;
}

defineProps<Props>();
</script>

<template>
  <CardItem
    class="aqi-card"
    header="AQI (WIP)"
    :square="true"
  >
    <div class="aqi-card__body">
      <h2 class="aqi-card__indicator">
        {{ aqi }}
      </h2>
    </div>
  </CardItem>
</template>

<style lang="scss">
.aqi-card {
  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
}
</style>
