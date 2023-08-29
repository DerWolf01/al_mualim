<template>
    <div class="pop-up-wrapper">
        <div ref="pop_up_el" :class="`pop-up flex-center full ${popUp?.className ?? `pop-up-${Date.now()}`}`">
            <VPopUpOption @click="async () => await o?.action()" v-for="o in popUp" :pop-up-option="o"></VPopUpOption>
        </div>

    </div>
</template>


<script setup lang="ts">
import { onMounted, ref, } from 'vue';
import { Icon } from '../Icons/types';
import VPopUpOption from './VPopUpOption.vue';
import { PopUpOption } from './pop_up';
import { PopUp } from './pop_up'

function log(value: any) {
    console.log(value)
}
const props = defineProps<{ popUp?: PopUp | undefined }>()

const pop_up_el = ref()
props.popUp?.addOnActivateListener(async (p) => {
    console.log(pop_up_el.value)

}
)

onMounted(() => {

    // props.popUp?.init(child)
    // props.popUp?.init(slot)
})

</script>

<style>
.pop-up-wrapper {
    position: relative;
    display: flex;
}


.pop-up {
    position: absolute;
    width: 175px;
    height: fit-content;
    background-color: white;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    flex-direction: column;
    top: 5%;
    right: 5%;
    padding-left: 7px;
    padding-right: 7px;
    z-index: 9;
    opacity: 0;
    pointer-events: none;
}
</style>