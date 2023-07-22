<template>
  <div class="page full relative">
    <div class="header flex-center">
      <header>{{ pageTitle }}</header>
    </div>

    <div class="content full relative">
      <div class="options-bar full">
        <div class="page-title">Title</div>
        <div class="options">
          <VIcon class="option"> <IonIcon :icon="add"> </IonIcon></VIcon>

          <VIcon class="option"><IonIcon :icon="search"> </IonIcon></VIcon>
        </div>
      </div>
      <div class="items full relative flex-center">
        <VCard v-for="(item, i) in items" :key="i" :card="item"></VCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { add, search } from "ionicons/icons";
import FancyRipple from "../FancyRipple/FancyRipple.vue";
import VIcon from "@components/Icons/VIcon.vue";
import PageRouter from "./page_router";
import { computed } from "vue";
import VCard from "../Card/VCard.vue";

const pageTitle = computed(() => PageRouter.getPageTitle());
const items = computed(() => PageRouter.getItems());
</script>

<style scoped>
.page {
  display: block;
  width: 100%;
  height: 100%;
}

.header {
  height: 35%;
  color: #262424;
  background-color: rgb(255, 255, 255);
  font-size: 1.5em;
}

.content {
  position: relative;
  height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.options-bar {
  display: flex;
  justify-content: space-between;
  height: 15%;
}
.options {
  display: flex;
  gap: 15px;
  padding: 13px 19px;
}
.option {
  width: 35px;
  height: 35px;
  box-shadow: var(--shadow);
}
.page-title {
  padding: 13px 19px;
}

.items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 19px;
}

</style>
