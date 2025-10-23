<script setup lang="ts">
import CardItem from "@/components/core/CardItem.vue";

interface Props {
  direction: number;
  speed: number;
  unit: string;
}

defineProps<Props>();
</script>

<template>
  <CardItem class="wind-card" header="Wind (WIP)" :square="true">
    <div class="wind-card__body">
      <h2 class="wind-card__indicator">
        <!-- for some reason openmeteo uses "mp/h" -->
        {{ speed }} {{ unit === "mp/h" ? "mph" : unit }} {{ direction }}°
      </h2>
    </div>
  </CardItem>
</template>

<style lang="scss">
.wind-card {
  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
}
</style>
