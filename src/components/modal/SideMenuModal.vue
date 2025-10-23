<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCoreStore } from "@/stores/core";
import { useWeatherStore } from "@/stores/weather";
import { onMounted, ref, watch } from "vue";
import CoreModal from "@/components/core/CoreModal.vue";
import TextToggleSwitch from "@/components/core/TextToggleSwitch.vue";
import { TemperatureUnits, WindSpeedUnits } from "@/utils/constants";

const { openModal, closeModal } = useCoreStore();
const weatherStore = useWeatherStore();

const { temperatureUnit, windSpeedUnit } = storeToRefs(weatherStore);

interface Props {
  menuStyle?: "default" | "glass";
}

defineProps<Props>();

const isOpen = ref(false);

const emit = defineEmits(["close"]);
const windSpeedModel = ref<WindSpeedUnits>(windSpeedUnit.value);

function close() {
  isOpen.value = false;
  closeModal();
  setTimeout(() => {
    emit("close");
  }, 350);
}

watch(windSpeedModel, () => weatherStore.setWindSpeedUnit(windSpeedModel.value));

onMounted(() => {
  isOpen.value = true;
  openModal();
});
</script>

<template>
  <CoreModal>
    <Transition>
      <div
        v-if="isOpen"
        class="side-menu-modal"
        :class="{ 'side-menu-modal--glass': menuStyle === 'glass' }"
      >
        <div class="side-menu-modal__head">
          <span class="side-menu-modal__title">Settings</span>
          <button class="side-menu-modal__close-button" @click="close">
            <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
          </button>
        </div>
        <div class="side-menu-modal__body">
          <div class="side-menu-modal__list-item">
            <label>Temperature Unit</label>
            <TextToggleSwitch
              :is-on="temperatureUnit === TemperatureUnits.FAHRENHEIT"
              left-text="°C"
              right-text="°F"
              @toggle="weatherStore.toggleTemperatureUnit"
            />
          </div>
          <div class="side-menu-modal__list-item">
            <label>Wind Speed Unit</label>
            <select v-model="windSpeedModel">
              <option>kmh</option>
              <option>ms</option>
              <option>mph</option>
              <option>kn</option>
            </select>
          </div>
        </div>
      </div>
    </Transition>
  </CoreModal>
</template>

<style scoped lang="scss">
.side-menu-modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  padding: 16px;

  background-color: #3382;

  z-index: 100;
  user-select: none;

  @media (min-width: 576px) {
    width: 384px;
  }

  &--glass {
    background-color: none;
    backdrop-filter: blur(4px);
    border: 1px solid #3382;
  }

  &__head {
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 16px;
    border-radius: 16px;
  }

  &__title {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 40px;
    margin-right: 16px;
    border-radius: 16px;
    padding: 0 16px;
    background-color: #3387;

    line-height: 32px;
    font-weight: 500;
    font-size: 24px;
    color: #f8f8f8;
  }

  &__close-button {
    margin: auto;
    margin-right: 0;

    height: 40px;
    width: 40px;
    border: none;
    border-radius: 16px;

    color: #fff;
    background-color: #3387;

    aspect-ratio: 1;

    transition: 0.25s ease;

    &:hover {
      background-color: #fff;
      color: #1d104b;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 16px;

    border-radius: 16px;
    background-color: #3387;
  }

  &__list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 8px 0;
  }
}

.v-enter-active,
.v-leave-active {
  transition: right 0.35s ease;
}

.v-enter-from,
.v-leave-to {
  right: -100vw;

  @media (min-width: 576px) {
    right: -384px;
  }
}
</style>
