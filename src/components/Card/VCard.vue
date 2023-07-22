<template>
  <FancyRipple :className="`item card ${getShadowClass()}`">
    <div>
      <span v-if="!card.icon && !card.img">{{ card?.title }}</span>
      <IonIcon v-else-if="card.icon && !card.img" :icon="card.title"></IonIcon>
      <img v-else :src="card.title" alt="" />
    </div>
    <span>{{ card?.content }}</span>
  </FancyRipple>
</template>

<script lang="ts" setup>
import { IonIcon } from "@ionic/vue";
import FancyRipple from "../FancyRipple/FancyRipple.vue";
import Card from "./card_class";

interface Props {
  card: Card;
  boxShadow?: boolean;
}
const props = withDefaults(defineProps<Props>(), { boxShadow: true });

function getShadowClass(): string {
  return props.boxShadow ?? false ? "card-shadow" : "";
}
</script>
<style scoped>
.card {
  max-width: 81%;
  border-radius: 15px;
  max-height: 35px;
  min-height: 15px !important;
  background: #fff;
  padding: 15px;
  position: relative;
  display: grid;
  grid-template-columns: 39% 75%;
  grid-template-rows: 100%;
  justify-content: flex-start;
  align-items: center;
}

.card-shadow {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.11);
}
</style>
