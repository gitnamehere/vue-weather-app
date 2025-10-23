<script setup lang="ts">
defineProps<{
  isOn: boolean;
  leftText?: string;
  rightText?: string;
}>();

const emit = defineEmits(["toggle"]);
</script>

<template>
  <button class="toggle" @click="emit('toggle')">
    <div class="toggle__switch" :class="{ 'toggle__switch--active': isOn }" />
    <div class="toggle__body">
      <div class="toggle__left" :class="{ 'toggle__left--active': !isOn }">
        {{ leftText }}
      </div>
      <div class="toggle__right" :class="{ 'toggle__right--active': isOn }">
        {{ rightText }}
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.toggle {
  display: flex;
  position: relative;
  height: 24px;
  padding: 4px;
  border: 1px solid white;
  border-radius: 128px;
  background-color: transparent;
  box-sizing: content-box;
  cursor: pointer;

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__switch {
    position: absolute;
    left: 4px;
    width: calc(50% - 4px);
    height: 24px;
    background-color: white;
    border-radius: 16px;
    transition: left 0.25s ease;

    &--active {
      left: calc(50%);
    }
  }

  &__left,
  &__right {
    min-width: 32px;
    padding: 0 8px;
    text-align: center;
    line-height: 24px;
    z-index: 2;
    color: white;

    transition: color 0.25s ease;
  }

  &__left--active,
  &__right--active {
    color: #338;
  }
}
</style>
