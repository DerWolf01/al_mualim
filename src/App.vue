<template>
  <TheNavigation>
    <IonRouterOutlet></IonRouterOutlet>
  </TheNavigation>
</template>

<script setup lang="ts">
import { IonRouterOutlet } from "@ionic/vue";
//@ts-ignore
import TheNavigation from "./components/navigation/TheNavigation.vue";
import { onMounted } from "vue";
import { AuthController } from "./controller/auth/auth_controller";
import { NotificationController } from './controller/notification/notification_controller'
import { Notification } from './controller/notification/notification'
onMounted(async () => {
  // await AuthController.authenthicate()
})
</script>

<style scoped></style>
