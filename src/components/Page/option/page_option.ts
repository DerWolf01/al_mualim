import {
  ElementEventListener,
  ElementEventListenersArray,
} from "../../../types";
import { Icon } from "../../Icons/types";
import { icons } from "../../Icons/types";
import { PopUp } from "../../PopUp/pop_up";

export class PageOption {
  constructor(
    icon: icons,
    conf?: {
      title?: string;
      action?: (e: PointerEvent, pageOption: PageOption) => Promise<void>;
      popUp?: PopUp;
    }
  ) {
    this.icon = new Icon(icon);
    this.title = conf?.title;
    this._action = conf?.action ?? (async (e) => {});
    this.className = icon + Date.now();
    this.popUp = conf?.popUp;
  }

  icon: Icon;
  title?: string;
  className: string;
  pageOptionEl?: HTMLElement | null;
  listeners: ElementEventListenersArray<PageOption> = [];

  _action?: (e: PointerEvent, pageOption: PageOption) => Promise<void>;

  async action(e: PointerEvent) {
    if (this._action != null) {
      await this._action(e, this);
    }
    await this.popUp?.change();
  }
  popUp?: PopUp;
  // getOptionEl(): HTMLElement | null {
  //   return document.querySelector(`.${this.className}`);
  // }

  // callListeners(e: MouseEvent) {
  //   for (let listener of this.listeners) {
  //     listener(this);
  //   }
  // }
  // addEventListener(listener: ElementEventListener<PageOption>) {
  //   this.listeners.push(listener);
  // }
}
