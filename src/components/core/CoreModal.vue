<script setup lang="ts">
import { useCoreStore } from "@/stores/core";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const store = useCoreStore();
const { modalActive } = storeToRefs(store);

watch(modalActive, () => {
  modalActive.value
    ? (document.body.style.overflow = "hidden")
    : document.body.style.removeProperty("overflow");
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-show="modalActive" class="core-modal">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.core-modal {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  z-index: 10;

  @media (min-width: 576px) {
    backdrop-filter: blur(4px);
  }

  @media (min-width: 1024px) {
    backdrop-filter: blur(2px);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
