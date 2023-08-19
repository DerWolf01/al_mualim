<template>
  <VIcon class="option" @click="data.action">
    <IonIcon :icon="data.icon"> </IonIcon
  ></VIcon>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
//@ts-ignore
import VIcon from "../../Icons/VIcon.vue";
import { PageOption } from "./page_option";
//@ts-ignore
const props = defineProps<{ data: PageOption }>();
</script>
<style scoped>
.option {
  box-shadow: var(--shadow);
  width: 35px;
  height: 35px;
}
</style>
