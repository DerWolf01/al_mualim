<template>
  <div ref="grid" class="loading-animation full flex-center">
    <div class="loading full relative">
      <div v-for="s in loadingAnimation.getSquareAmount()" :key="s" class="grid-item square"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import { onMounted, ref } from "vue";

const props = withDefaults(defineProps<LoadingAnimationType>(), {
  color: "blue",
  square_per_row: 5,
});

type LoadingAnimationType = { color?: string; square_per_row?: number };
class LoadingAnimation implements LoadingAnimationType {
  constructor(conf: LoadingAnimationType) {
    this.square_per_row = conf.square_per_row ?? 4;
  }
  square_per_row: number = 4;

  getSquareAmount(): number {
    return this.square_per_row * this.square_per_row;
  }
  getWidthOrHeight(): string {
    return `${this.square_per_row * 2.3 + this.square_per_row * 17.3}px`;
  }
  getSquareElements(): HTMLElement[] {
    return Array.from(document.querySelectorAll(".square"));
  }
  animate(): void {
    const elements = this.getSquareElements();
    anime({
      targets: elements,
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 900 },
      ],
      delay: anime.stagger(205, {
        grid: [this.square_per_row, this.square_per_row],
        from: "center",
      }),
      loop: true,
    });
  }
}
const loadingAnimation = new LoadingAnimation({
  color: props.color,
  square_per_row: props.square_per_row,
});

function getWidthOrHeight(): string {
  return loadingAnimation.getWidthOrHeight();
}
const grid = ref()
onMounted(() => {

  loadingAnimation.animate();
  anime({ targets: grid.value, opacity: 1, easing: "easeInSine", duration: 650 })
});
</script>
<style scoped>
.loading {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  width: v-bind(getWidthOrHeight());
  height: v-bind(getWidthOrHeight());

}

.loading-animation {
  height: 75px;
  opacity: 0;
}

.grid-item {
  width: 15px;
  height: 15px;
  pointer-events: none;
  position: relative;
  margin: 1px;
  background-color: v-bind(color);
  font-size: 14px;
}
</style>
