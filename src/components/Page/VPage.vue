<template>
  <div class="page full relative">
    <div class="header flex-center">
      <header>{{ title }}</header>
    </div>

    <form class="content full relative">
      <div class="options-bar full">
        <div class="page-title">{{ title }}</div>
        <div class="options">
          <TransitionGroup @enter="(o) => {
            options_delay++
            anime({
              targets: o,
              scale: [.1, 1],
              opacity: 1,
              duration: 311,
              easing: 'easeOutBack',
              delay: options_delay,
            });

          }">
            <VPageOption v-for=" o  in  options " :key="o.icon.toString()" :data="o"></VPageOption>
          </TransitionGroup>

        </div>
      </div>

      <div v-show="!is_loading && !is_empty" class="items full relative flex-center">




        <div v-for="key of Object.keys(items)" :key="key" class="main-cards-row full relative ">
          <Transition name="main-cards-headers" @enter="(el) => {
            anime({ targets: el, opacity: [0, 1], duration: 1333, delay: delay * 75 });
            delay += 1
          }
            ">
            <div :key="key" v-show="key != 'none'" class="main-cards-row-header header"><span>{{ key }}</span></div>
          </Transition>
          <VCard v-if="items[key].length < 1" :delay="delay"
            :card="new Card({ title: '', icon: new Icon('warning'), content: 'Keine Daten Vorhanden' })"
            class-names="card-item">

          </VCard>
          <TransitionGroup  name="main-cards" @enter="(el) => {
            anime({ targets: el, translateX: ['125%', '0%'], delay: delay * 55 });
            delay += 1
          }
            ">

            <VCard v-for="( item, i ) in  items[key]  " :key="i" :delay="delay" :card="item" class-names="card-item">

            </VCard>
          </TransitionGroup>
        </div>
      </div>
      <VLoadingAnimation v-if="is_loading"></VLoadingAnimation>
      <div v-if="is_empty" class="empty relative flex-center">
        <span>Keine Daten vorhanden</span>
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
import { Icon } from "../Icons/types";
// title
const title = computed(() => title_ref.value);
const title_ref = ref("");

// options
const options_ref: Ref<PageOption[]> = ref([]);
const options = computed(() => options_ref.value);

// card items
const items_ref: Ref<Items> = ref({});
const items: ComputedRef<Items> = computed(() => items_ref.value);

const is_loading = ref(true);
const is_empty = ref(false)
const delay = ref(0)

onMounted(async () => {
  const router = await PageRouter.init("Courses");
  const page = router.page
  await setValues(page);
  router.addEventListener("afterChange", async (p) => {
    // console.log('items')
    // console.log(await p.getItems())
    await setValues(p);
  });
});

async function setValues(page: Page) {
  setTitle(page.title);
  setOptions(page.getOptions());
  setItems(page.items);

}
const duration = 750;
const options_delay = ref(0)
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

  const easing: EasingOptions = "easeOutBack";
  for (let o of options) {
    anime({ targets: o, scale: 0, duration, delay: i, easing });
    i += 75;
  }

  setTimeout(() => {
    options_delay.value = 0
    options_ref.value = [];
    setTimeout(() => {

      // for (let i = 0; i < options_ref.value.length; i++) {
      //   options_ref.value.splice(i, 1);
      // }

      // for (let i = 0; i < items.length; i++) {
      //   const item = items[i];

      //   options_ref.value[i] = item;
      // }

      options_ref.value = items
      // const options = document.getElementsByClassName("option-item");
      // console.log(options)
      // let i = 0;
      // for (let o of options) {
      //   console.log(o)
      //   anime({
      //     targets: o,
      //     scale: [.1, 1],
      //     opacity: 1,
      //     duration: 951,
      //     easing,
      //     delay: i,
      //   });
      //   i += 105;
      // }
    }, duration);
  }, options.length * 75)
}
function setItems(items_obj: Items) {

  const cards = document.getElementsByClassName("card-item");
  let delay = 0
  for (let c of cards) {
    anime({ targets: c, translateX: "-135%", scale: 0, duration, delay });
    delay += 75
  }

  const keys = Object.keys(items_obj)
  console.log(keys)
  items_ref.value = {}
  for (let key of keys) {
    items_ref.value[key] = []
  }

  let allEmpty = true
  for (let key of keys) {
    const items = items_obj[key]

    if (items.length > 0) {
      is_loading.value = true
      setTimeout(() => {
        is_empty.value = false
      }, 175)
    }
    setTimeout(() => {
      is_loading.value = true
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
        console.log('page items', items)
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          item.classNames = `delay-${delay}`;
          delay += 1;
          if (!items_ref.value[key]) {
            items_ref.value[key] = []
          }
          //@ts-ignore
          items_ref.value[key].push(item);

        }
        is_loading.value = false;
      }, cards.length * 95)
    }, cards.length * 105)
  }
  console.log(items_ref.value)
}
</script>

<style scoped>
.page {
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  height: 13%;
  z-index: 5;
}

.options {
  display: flex;
  gap: 41px;
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

.main-cards-row {
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 41px;
  overflow: visible;
}

.main-cards-row-header {
  height: 15px;
  width: 100%;
  padding-left: 55px;
  font-size: 15px !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: grey;
  background-color: transparent;

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
