<template>
  <div @click="inputEvents.onParentClick" :class="`full input-card card ${card.data_describer}-input-card ${classNames ?? ''} ${card.classNames ?? ''
    } `">
    <div class="title full">
      <span> {{ card.title }}</span>
    </div>
    <FancyRipple class-name="input-field full card-shadow">
      <input :id="card.id" ref="input" class="full" type="text" :maxlength="card.max" :minlength="card.min"
        :required="card.required ?? false" />
      <div ref="placeholder" class="placeholder">{{ card.placeholder }}</div>
      <div class="char-amount"><span :class="charAmountClass">{{ charAmount }}</span>/{{ card.max ??
        '&#8734' }}</div>
    </FancyRipple>


  </div>
</template>

<script setup lang="ts">
import { InputCardConf } from "./input_card";
import FancyRipple from "../../FancyRipple/FancyRipple.vue";
import { Ref, computed, onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import anime from "animejs";
import { AlertController } from "../../Alert/alert_controller";

//@ts-ignore
const props = defineProps<{ card: InputCardConf; classNames?: string }>();
const { card } = toRefs(props);


const _charAmount = ref(0);
const _charAmountClass = ref('char-amount-red')

const charAmount = computed(() => _charAmount.value);
const charAmountClass = computed(() => _charAmountClass.value);

class InputEvents {
  constructor(card: InputCardConf, placeholder: HTMLElement) {
    this.card = card
    this.input = card.getInputEl()!;
    this.placeholder = placeholder;

    this.addEventListeners();
  }

  card: InputCardConf;
  input: HTMLInputElement;
  placeholder: HTMLElement;
  value: string = "";
  charAmount: number = 0;
  charCounterClass = ''


  setCharAmountClass(): void {
    if (!card.value.max || this.card.max == undefined) {
      this.charCounterClass = 'char-amount-green'
      return
    }
    // if ((input?.value.length ?? 0) == card.value.max!-1) {
    //   charAmountClass.value = 'char-amount-red'
    // }
    if (this.charAmount <= card.value.max! && this.charAmount >= this.card.min) {

      this.charCounterClass = 'char-amount-green'
      return
    }

    this.charCounterClass = 'char-amount-red'


  }
  addEventListeners() {
    this.input.addEventListener("input", (e) => this.onInput(e));
    this.input.addEventListener("focus", (e) => this.onFocus(e));
    this.input.addEventListener("blur", (e) => this.onBlur(e));
  }
  onParentClick(e: PointerEvent) {
    this.input?.focus();
  }
  onFocus(e: FocusEvent) {
    anime({ targets: this.placeholder, opacity: 0 });
    this.deactivatePlaceholder();
  }
  onBlur(e: FocusEvent) {
    this.activatePlaceholder();
    this.card.inputIsValid()
  }

  activatePlaceholder(): void {
    if (this.value.length > 0) {
      return;
    }
    anime({ targets: this.placeholder, opacity: 1 });
  }
  deactivatePlaceholder(): void {
    anime({ targets: this.placeholder, opacity: 0 });
  }
  onInput(e: any) {
    this.value = this.input?.value ?? '';
    this.charAmount = this.input?.value.length ?? 0
    this.setCharAmountClass()
    _charAmount.value = this.charAmount
    _charAmountClass.value = this.charCounterClass

  }
}


const input = ref();
const placeholder = ref();
let inputEvents: InputEvents
onMounted(() => {
  inputEvents = new InputEvents(card.value, placeholder.value);

});
onBeforeUnmount(() => AlertController.removeAlert(card.value))
</script>

<style scoped>
.input-card {
  display: flex;
  flex-direction: column;
  justify-content: start;

}

.title {
  color: grey;
  font-size: 0.9em;
  padding-bottom: 3px;
}

.input-field {
  position: relative;
  display: grid;
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  padding: 15px;
  max-height: 25px !important;
}

input {
  outline: none;
  border: none;
  border-bottom: 0.1px solid grey;
}

input:focus {
  border: none;
  outline: none;
  border-bottom: 0.1px solid grey;
}

.placeholder {
  align-self: center;
  justify-self: center;
  position: absolute;
  top: 25%;
  left: 15px;
  pointer-events: none;
}

.char-amount {
  align-self: center;
  justify-self: center;
  position: absolute;
  top: -19px;
  right: 25px;
  pointer-events: none;
  font-size: 0.75em;
}



.char-amount-green {
  color: rgba(0, 128, 70, 0.57);
  text-shadow: rgba(0, 128, 70, 0.58) 0 0 5px;
}

.char-amount-red {
  color: red;
  text-shadow: red 0 0 15px;
}
</style>
