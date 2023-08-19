<template>
    <FancyRipple
        :class-name="[(alert.card instanceof InputCardConf) ? `${alert.card.data_describer}-alert` : '', 'alert'].join(' ')">
        <div ref="alert">{{ alert.text }}</div>
        <!-- <VIcon> -->
        <div class="full flex-center">
            <IonIcon class="icon" style="color:#f96b05f2" :icon="warning"></IonIcon>
        </div> <!-- </VIcon> -->
    </FancyRipple>
</template>
<script setup lang="ts">
import { warning } from 'ionicons/icons';
import { Alert } from '../Alert/alert'
import { InputCardConf } from '../Cards/input_card/input_card';
import FancyRipple from '../FancyRipple/FancyRipple.vue';

import { IonIcon } from '@ionic/vue';

const props = defineProps<{ alert: Alert }>()

</script>

<style scoped>
.alert {
    position: relative;
    height: fit-content !important;
    overflow: hidden;
    background-color: #f96b0514;
    /* box-shadow: #e29b2851 0 0 13px; */
    width: 100%;
    border-radius: var(--radius);
    display: grid;
    justify-content: flex-start;
    grid-template-columns: 85% 15%;
    align-items: center;
    padding: 7px;
    opacity: 0;
    transform: scale(0);
    padding: 13px;
    /* top: 25%; */

}

.icon {
    filter: drop-shadow(0 0 5px #f96b05f2);
}
</style>