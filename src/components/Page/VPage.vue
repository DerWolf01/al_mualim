<template>
  <div class="page full relative">
    <div class="header flex-center">
      <header>{{ title }}</header>
    </div>

    <form class="content full relative">
      <div class="options-bar full">
        <div class="page-title">{{ title }}</div>
        <div class="options">
          <VPageOption class="option-item" v-for="o in options" :key="o.icon" :data="o"></VPageOption>
        </div>
      </div>
      <div class="items full relative flex-center">
        <TransitionGroup name="main-cards" @enter="(el) => {
          anime({ targets: el, translateX: ['100%', 0], scale: [0.1, 1], delay: delay * 75 });
          delay += 1
        }
          ">
          <VCard v-for="(item, i) in items || []" :key="i" :card="(item as (Card | InputCardConf))"
            class-names="card-item">
          </VCard>
        </TransitionGroup>
      </div>
      <VLoadingAnimation v-if="is_loading"></VLoadingAnimation>
      <div v-if="items.length < 1 && !is_loading" class="empty relative flex-center">
        <span>Nothing here</span>
        <img src="../../assets/empty.svg" alt="" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PageRouter } from "../../page_router/page_router";
import { Page } from "../../page_router/page";
import VPageOption from "../Page/option/VPageOption.vue";
//@ts-ignore
import VIcon from "../icons/VIcon.vue";
import { ComputedRef, Ref, computed, onMounted, ref } from "vue";
import VCard from "../Card/VCard.vue";

import anime, { EasingOptions } from "animejs";
import { PageOption } from "../Page/option/page_option";
import { InputCardConf } from "../Cards/input_card/input_card";
import Card from "../Card/card_class";
import VLoadingAnimation from "../LoadingAnimation/VLoadingAnimation.vue";
import { Items } from "../../page_router/types";
// title
const title = computed(() => title_ref.value);
const title_ref = ref("");

// options
const options_ref: Ref<PageOption[]> = ref([]);
const options = computed(() => options_ref.value);

// card items
const items_ref: Ref<Array<Card | InputCardConf>> = ref([]);
const items: ComputedRef<Items> = computed(() => items_ref.value);

const is_loading = ref(true);

const delay = ref(0)

onMounted(async () => {
  const router = await PageRouter.init("Courses");

  setValues(router.page);
  router.addEventListener("afterChange", async (p) => {
    await setValues(p);
  });
});

async function setValues(page: Page) {
  setTitle(page.title);
  setOptions(page.getOptions());
  setItems(await page.getItems());
}
const duration = 1250;

function setTitle(title: string) {
  const duration = 350;
  const easing = "easeInOutCirc";
  const header = document.querySelector(".header");
  const page_title = document.querySelector(".page-title");

  anime({ targets: [header, page_title], opacity: 0, duration, easing });
  setTimeout(() => {
    title_ref.value = title;
    anime({ targets: [header, page_title], opacity: 1, easing });
  }, duration);
}
function setOptions(items: PageOption[]) {
  const options = Array.from(
    document.getElementsByClassName("option-item")
  ).reverse();

  let i = 0;
  const duration = 350;
  const easing: EasingOptions = "easeOutBack";
  for (let o of options) {
    anime({ targets: o, scale: 0, duration, delay: i, easing });
    i += 75;
  }
  setTimeout(() => {
    // for (let i = 0; i < options_ref.value.length; i++) {
    //   options_ref.value.splice(i, 1);
    // }
    options_ref.value = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      options_ref.value[i] = item;
    }
    const options = document.getElementsByClassName("option-item");

    let i = 0;
    for (let o of options) {
      anime({
        targets: o,
        scale: 1,
        opacity: 1,
        duration,
        easing,
        delay: i,
      });
      i += 105;
    }
  }, duration);
}
function setItems(items: Items) {
  const cards = document.getElementsByClassName("card-item");
  let delay = 0
  for (let c of cards) {
    anime({ targets: c, translateX: "-135%", scale: 0, duration, delay });
    delay += 75
  }

  if (cards.length < 1 && !is_loading.value) {
    const empty = document.querySelector(".empty");
    if (empty) {
      anime({ targets: empty, opacity: 0, easing: 'easeOutSine' })
    };
  } else if (cards.length < 1 && is_loading.value) {
    const loadingEl = document.querySelector(".loading-animation");
    anime({ targets: loadingEl, opacity: 0, easing: 'easeOutSine' });
  }

  setTimeout(() => {

    // for (let i = 0; i < items_ref.value.length; i++) {
    //   items_ref.value.splice(i, 1);
    // }
    items_ref.value = []; is_loading.value = true;
    let delay = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.classNames = `delay-${delay}`;
      //@ts-ignore
      items_ref.value.push(item);
      delay += 35;
    }
    is_loading.value = false;
  }, duration);
}
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

.page-title {
  padding: 13px 19px;
}

.items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* display: grid;
  grid-template-columns: repeat(auto,45px); */
  width: 100%;
  gap: 45px;
  -moz-transition: height 1s ease-in-out, left 1.5s ease-in-out;
  -webkit-transition: height 1s ease-in-out, left 1.5s ease-in-out;
  -moz-transition: height 1s ease-in-out, left 1.5s ease-in-out;
  -o-transition: height 1s ease-in-out, left 1.5s ease-in-out;
  transition: height 1s ease-in-out, left 1.5s ease-in-out;
}

.empty {
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  color: grey;
  flex-direction: column;
}

.empty img {
  width: 100%;
  height: 35%;
  object-fit: contain;
}
</style>
