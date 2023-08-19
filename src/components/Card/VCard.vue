<template>
  <div ref="card" class="full card-wrapper">
    <TransitionGroup name="main-cards" @enter="(el) => {
      anime({ targets: el, translateX: ['100%', 0], scale: [0.1, 1] });

    }
      ">
      <FancyRipple v-if="(card instanceof Card)" :className="`item card ${getShadowClass()} ${classNames ?? ''}`">
        <div class="full card-outer">
          <div class="card-inner full">
            <div>
              <span v-if="!card.icon && !card.img">{{ card?.title }}</span>
              <IonIcon v-else-if="card.icon && !card.img" :icon="card.title"></IonIcon>
              <img v-else :src="card.title" alt="" />
            </div>
            <span>{{ card?.content }}</span>
          </div>
        </div>
      </FancyRipple>

      <InputCard v-else :card="card" :classNames="classNames"></InputCard>
      </TransitionGroup>
      <Transition :name="card.title" @enter="(e) => {
        anime({
          targets: e,
          scale: [0, 1],
          opacity: 1,
          easing: 'easeOutElastic',
          translateX: ['115%', 0],
          delay: (alert?.card.index ?? 0) * 105
        })
      }" @before-leave="(e) => {
  anime({
    targets: e,
    scale: [1, 0],
    opacity: 0,
    easing: 'easeOutElastic',
    translateX: [0, '115%'],
    delay: (alert?.card.index ?? 0) * 105
  })
}">

        <VAlert v-if="alert" :alert="alert"></VAlert>
      </Transition>
  </div>
</template>

<script lang="ts" setup>
import { IonIcon } from "@ionic/vue";
import FancyRipple from "../FancyRipple/FancyRipple.vue";
import Card from "./card_class";
import { InputCardConf } from "../Cards/input_card/input_card";
import InputCard from "../Cards/input_card/InputCard.vue";
import anime from "animejs";
import { Alert } from "../Alert/alert";
import { AlertController } from "../Alert/alert_controller";
import { Ref, onMounted, ref } from "vue";
import VAlert from '../Alert/VAlert.vue'
interface Props {
  card: Card | InputCardConf;
  boxShadow?: boolean;
  animate?: boolean;
  classNames?: string;
}
const props = withDefaults(defineProps<Props>(), {
  boxShadow: true,
  animate: false,
});

function getShadowClass(): string {
  return props.boxShadow ?? false ? "card-shadow" : "";
}

const alert: Ref<Alert | undefined> = ref()
onMounted(() => {
  if (props.card instanceof InputCardConf) {
    const card = props.card as InputCardConf
    AlertController.addEventListener(card.data_describer, (a) => {
      const new_alert = a.get(card.data_describer)
      alert.value = new_alert
    })
  }
})

</script>
<style scoped>
.card-wrapper {
  /* display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%; */

  max-width: 81%;
  border-radius: 15px;
  height: fit-content;
  gap: 15px;
  min-height: 15px !important;
  flex-direction: column;
  background: #fff;
  /* padding: 15px; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {

  max-width: 100%;
  border-radius: 15px;
  height: 25px;
  min-height: 15px !important;
  background: #fff;
  padding: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-outer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-inner {
  border-radius: 15px;
  background: #2b272700;

  position: relative;
  display: grid;
  grid-template-columns: 39% 75%;
  grid-template-rows: 100%;
  justify-content: flex-start;
  color: black;
  align-items: center;
}

.card-shadow {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.11);
}
</style>
