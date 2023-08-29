<template>
  <div ref="card_ref" class="full card-wrapper">
    <TransitionGroup name="main-cards" @enter="(el) => {
      anime({ targets: el, translateX: ['100%', 0], scale: [0.1, 1] });

    }

      ">
      <FancyRipple @click="async () => {
        console.log(card.action)
        if (card.action) {

          await card.action(card as InputCardConf & Card)
        }

      }" v-if="(card instanceof Card && !(card instanceof InputCardConf))"
        :className="`item card ${getShadowClass()} ${classNames ?? ''}`">
        <div style="transform: scale(1),translate(0,0);" class="full card-outer">
          <div class="card-inner full">
            <div class="card-title">
              <span>{{ card?.title }}</span>
              <IonIcon v-if="card.icon && !card.img" :icon="card.icon.toString()"></IonIcon>
              <img class="img" v-else-if="card.img && !card.icon" :src="card.img" alt="" />
            </div>
            <span>{{ card?.content }}</span>
          </div>
        </div>
      </FancyRipple>

      <InputCard v-if="(card instanceof InputCardConf)" :card="card" :classNames="classNames"></InputCard>
    </TransitionGroup>
    <Transition :name="card.title" @enter="(e) => {
      anime({
        targets: e,
        scale: 1,
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
import Card, { ICard } from "./card_class";
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
  delay?: number
}
const props = withDefaults(defineProps<Props>(), {
  boxShadow: true,
  animate: false,
  delay: 0
});

function getShadowClass(): string {
  return props.boxShadow ?? false ? "card-shadow" : "";
}

const alert: Ref<Alert | undefined> = ref()
const card_ref = ref()
onMounted(() => {

  // anime({ targets: card_ref.value, translateX: ['100%', 0], scale: 1, delay: props.delay * 75 });

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

.card-title {
  display: flex;
  justify-content: flex-start;
  gap: 7px;
}

.img {
  width: 35px;
  height: 35px;
  scale: 0.999;
}
</style>
