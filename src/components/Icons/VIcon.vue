<template>
  <div class="icon full relative">
    <FancyRipple :duration="19111" className=" flex-center full relative">
      <slot></slot>
    </FancyRipple>
  </div>
</template>

<script setup lang="ts">
import FancyRipple from "../FancyRipple/FancyRipple.vue";
</script>
<style scoped>
.icon {
  border-radius: 21px;
  overflow: hidden;
}
.icon:hover {
  cursor: pointer;
}
</style>
