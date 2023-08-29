<template>
  <div :class="`icon full relative ${classNames}`">
    <FancyRipple :duration="19111" className=" flex-center full relative">
      <slot></slot>
    </FancyRipple>
  </div>
</template>

<script setup lang="ts">
import FancyRipple from "../FancyRipple/FancyRipple.vue";


const props = defineProps<{ classNames?: string }>()
</script>
<style scoped>
.icon {
  border-radius: 21px;
  overflow: hidden;
  background-color: white;
}

.icon:hover {
  cursor: pointer;
}
</style>
