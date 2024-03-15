<script setup lang="ts">
defineProps<{
    header: string
    fullWidth?: boolean
}>();
</script>

<template>
    <div class="card" :class="{ 'card--full-width': fullWidth }">
        <div class="card__title">
            <h3>{{ header }}</h3>
        </div>
        <slot />
    </div>
</template>

<style scoped lang="scss">
    .card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        border-radius: 16px;
        min-width: 192px;
        min-height: 192px;
        padding: 1rem;

        background-color: #4464;

        &__title {
            display: block;
            width: 100%;
        }

        &--full-width {
            width: 100%;
                    
            @media (min-width: 768px) {
                width: 40rem;
            }

            @media (min-width: 1024px) {
                width: auto;
            }
        }
    }
</style>