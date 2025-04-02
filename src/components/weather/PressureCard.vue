<script setup lang="ts">
import CardItem from "@/components/CardItem.vue";

interface Props {
  pressure: number;
}

defineProps<Props>();
</script>

<template>
  <CardItem class="pressure-card" header="Pressure (WIP)" :square="true">
    <div class="pressure-card__body">
      <h2 class="pressure-card__indicator">{{ pressure }}hpa</h2>
    </div>
  </CardItem>
</template>

<style lang="scss">
.pressure-card {
  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
}
</style>
