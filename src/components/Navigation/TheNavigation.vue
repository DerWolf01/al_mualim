<template>
  <nav class="nav">
    <div ref="app" class="app full absolute">
      <slot></slot>
    </div>
    <div class="nav-content absolute full">
      <NavIcon @click="handleNavToggleClick()" class="toggle flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="35" fill="none" viewBox="0 0 50 35">
          <rect width="29" height="3" x="10" y="9" fill="#948E8E" rx="1.5" />
          <rect width="29" height="3" x="10" y="9" fill="#948E8E" rx="1.5" />
          <rect width="22" height="3" x="10" y="25" fill="#948E8E" rx="1.5" />
          <rect width="22" height="3" x="10" y="25" fill="#948E8E" rx="1.5" />
          <rect width="33" height="3" x="10" y="17" fill="#948E8E" rx="1.5" />
          <rect width="33" height="3" x="10" y="17" fill="#948E8E" rx="1.5" />
        </svg>
      </NavIcon>
    </div>
    <div class="nav-options full relative">
      <NavigationOption :option="new NavigationOptionClass('title', 'content')"></NavigationOption>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import anime from "animejs";
import NavIcon from '../Icons/VIcon.vue'
const app = ref() as Ref<HTMLDivElement>;
const isNavigation = ref(false);
import NavigationOption from "../Navigation/NavigationOption/NavigationOption.vue";
import { NavigationOptionClass } from "../Navigation/NavigationOption/navigation_option";
function handleNavToggleClick() {
  if (!isNavigation.value) {
    openNav();
    return;
  }
  closeNav();
}
function openNav() {
  anime({
    targets: app.value,
    translateX: "50%",
    scale: 0.9,
    duration: 550,
    easing: "easeOutBack",
  });
  app.value.classList.add("nav-open-app");
  isNavigation.value = true;
}
function closeNav() {
  anime({
    targets: app.value,
    translateX: 0,
    scale: 1,
  });
  app.value.classList.remove("nav-open-app");
  isNavigation.value = false;
}
</script>

<style>
.nav {
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  overflow: hidden;
}

.nav-content {
  top: 0;
}

.nav-options {
  position: relative;
  width: 55%;
  top: 11%;
  /* background: black; */
  display: flex;
  justify-content: space-around;
}

.toggle {
  position: fixed;
  width: 55px;
  height: 55px;
  z-index: 3;
  top: 15px;
  left: 15px;
  box-shadow: var(--shadow);
  border-radius: var(--radius);
}

.app {
  z-index: 2;
  display: inline-block;
  transition: box-shadow 0.35s ease-in-out, border-radius 0.35s ease-in-out;
  background: white;
}

.nav-open-app {
  border-radius: 19px;
  box-shadow: var(--shadow);
  overflow: hidden;
}
</style>
