<template>
    <FancyRipple class-name="pop-up-option full flex-center">
        <span>{{ popUpOption?.title }}</span>
        <!-- <VIcon > -->
        <IonIcon class="icon" :icon="popUpOption?.icon.toString()"></IonIcon>
        <!-- </VIcon> -->
    </FancyRipple>
</template>


<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import VIcon from '../Icons/VIcon.vue';
import { PopUp, PopUpOption } from './pop_up'
import FancyRipple from '../FancyRipple/FancyRipple.vue';
const props = defineProps<{ popUpOption?: PopUpOption | undefined }>()

</script>

<style>
.pop-up-option {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: var(--radius);
    padding: 7px;
    color: black;
    font-weight: 100;
    display: flex;
    justify-content: space-evenly;

}

.icon {
    width: 35px;
}
</style>