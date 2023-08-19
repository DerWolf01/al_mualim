<template>
  <TheNavigation>
    <IonRouterOutlet></IonRouterOutlet>
  </TheNavigation>
</template>

<script setup lang="ts">
import { IonRouterOutlet } from "@ionic/vue";
import TheNavigation from "./components/navigation/TheNavigation.vue";
import { onMounted } from "vue";
import { AuthController } from "./controller/auth/auth_controller";
onMounted(async () => {
  await AuthController.authenthicate()
})
</script>

<style scoped></style>
