<template>
  <VCard :box-shadow="false" :card="card"></VCard>
</template>
<script setup lang="ts">
import Card from "../../Card/card_class";
import VCard from "../../Card/VCard.vue";
// import FancyRipple from "../../FancyRipple/FancyRipple.vue";
import { NavigationOptionClass } from "./navigation_option";

interface Props {
  option: NavigationOptionClass;
}
const props = defineProps<Props>();

const card = new Card({
  title: props.option.icon,
  icon: false,
  content: props.option.title,
});
</script>

<style scoped>
.option {
  overflow: hidden;
  height: fit-content;
  width: 100%;
}
</style>
