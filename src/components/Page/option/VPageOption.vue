<template>
<div> <VIcon :class-names="`option option-item ${data.className}`" @click="async (e) => await data.action(e)">
    <IonIcon :icon="data.icon.toString()"> </IonIcon>

  </VIcon>
  <VPopUp :pop-up="data.popUp"> </VPopUp></div> 
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import VPopUp from '../../PopUp/VPopUp.vue'

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
  overflow: visible;
}
</style>
