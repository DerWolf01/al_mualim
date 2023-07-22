<template>
  <div
    :class="`fancyripple fancy-ui-el ${className}`"
    @pointerdown="(e) => handleMouseDown(e)"
    @pointerup="() => handleMouseUp()"
  >
    <slot></slot>
    <div class="ripple-container">
      <div :style="{ background: color }" ref="rippleRef" class="ripple"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  color: "rgba(114, 114, 114, 0.317)",
});
const duration = computed(() => props.duration ?? 7333);
const color = computed(() => props.color);

import { computed, ref } from "vue";
//@ts-ignore
import anime from "animejs";
import Props from "./props";
const rippleRef = ref();
const handleMouseDown = (event: MouseEvent) => {
  console.log("mouse down");
  const ripple = rippleRef.value;
  const target = event.currentTarget;
  if (ripple && target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left - ripple!.offsetWidth / 2;
    const y = event.clientY - rect.top - ripple!.offsetHeight / 2;
    rippleIn(ripple, x, y);
  }
};

const handleMouseUp = () => {
  rippleOut();
};
function rippleIn(ripple: Element, x: number, y: number): void {
  anime.set(ripple, { translateX: x, translateY: y });
  anime({
    targets: ripple,
    scale: [0, 11],
    duration: duration.value,
  });
  anime({ targets: rippleRef.value, opacity: 1 });
}

function rippleOut(): void {
  anime({
    targets: rippleRef.value,
    opacity: 0,
    duration: 3350,
    delay: 150,
  });

  anime.set(rippleRef.value, { opacity: 0 });
}
</script>

<style scoped>
.fancyripple {
  position: relative;
  height: 100%;
  width: 100%;

  /* overflow: hidden; */
}

.ripple-container {
  position: absolute;
  overflow: hidden !important;
  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
  border-radius: inherit;
}
.ripple {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: rgba(114, 114, 114, 0.117);
  /* border-radius: 50%; */
  border-radius: 15%;
  opacity: 0;
  transform: scale(0);
}
</style>
