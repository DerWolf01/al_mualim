import anime from "animejs";
import { ElementEventListener, ElementEventListenersArray } from "../../types";
import { Icon } from "../Icons/types";
import { PopUpController } from "../../controller/pop_up/pop_up_controller";

export class PopUp extends Array<PopUpOption> {
  constructor(popUpOptions: Array<PopUpOption>, title: string) {
    super();
    this.push(...popUpOptions);
    this.title = title;
    this.className = `pop-up-${title}`;
  }

  listeners: ElementEventListenersArray<PopUp> = [];
  className: string;
  active: boolean = false;
  title: string;
  addOnActivateListener(listener: ElementEventListener<PopUp>) {
    this.listeners.push(listener);
  }

  getEl(): HTMLElement | null {
    return document.querySelector("." + this.className);
  }
  async change() {
    // if (!this.active) {
    console.log("active ", this.active);
    await this.activate();
    return;
    // }
    await this.deactivate();
  }

  animeIn(el?: HTMLElement) {
    const elem =
      el ??
      (document.querySelector("." + this.className) as HTMLElement | null);
    if (elem) elem.style.pointerEvents = "all";
    anime({
      targets: elem,
      opacity: [0, 1],
      easing: "easeInSine",

      duration: 331,
    });
    anime({
      targets: elem,
      translateY: [-25, 0],
      translateX: [25, 0],
      height: [0.1, this.length * 55],

      // easing: "easeInSine",
    });
  }
  animeOut(el?: HTMLElement) {
    const elem = el ?? document.querySelector("." + this.className);
    anime({
      targets: elem,
      opacity: 0,
      easing: "easeInSine",
      pointerEvents: "none",
      duration: 331,
    });
  }

  async activate() {
    this.active = true;
    PopUpController.setPopUp(this);
    this.animeIn();
    for (let listener of this.listeners) {
      console.log("listener", listener);
      await listener(this);
    }
  }

  async deactivate() {
    this.active = false;
    this.animeOut();
  }

  // init(targetEl: HTMLElement) {
  //   const rect = targetEl.getBoundingClientRect();
  //   const el = this.getEl();
  //   if (!el) {
  //     return;
  //   }
  //   el!.style.bottom = -rect.bottom + "px";
  //   el!.style.right = -rect.right  + "px";
  // }
}

export class PopUpOption {
  constructor(
    title: string,
    icon: Icon,
    action?: ElementEventListener<PopUpOption>
  ) {
    this.title = title;
    this.icon = icon;
    this._action = action;
  }
  title: string;
  icon: Icon;
  _action?: ElementEventListener<PopUpOption>;
  async action(): Promise<void> {
    if (!this._action) {
      return;
    }
    this._action(this);
  }
}
