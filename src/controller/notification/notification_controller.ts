import anime from "animejs";
import { Controller } from "..";
import { Icon } from "../../components/Icons/types";
import { Notification, NotificationType } from "./notification";
import { sparklesOutline } from "ionicons/icons";

export class NotificationController extends Controller {
  constructor() {
    super();
  }
  static count = 0;
  static activeNotifications: Map<number, NotificationWithEl> = new Map<
    number,
    NotificationWithEl
  >();
  static add(n: Notification) {
    this.moveDownRecent();

    const el = n.createElement(n, this.count);
    el.addEventListener("click", () => {
      this.remove(nWithEl);
    });
    document.body.appendChild(el);

    const nWithEl = new NotificationWithEl(el, this.count, n);
    this.activeNotifications.set(this.count, nWithEl);
    this.count++;
    this._animate_enter(nWithEl);

    this.remove(nWithEl);
  }
  static _animate_enter(n: NotificationWithEl) {
    const { el } = n;
    anime({
      targets: el,
      translateX: ["125%", 0],

      delay: this.getActiveNotificationsLength() * 100,
    });
  }

  static remove(n: NotificationWithEl) {
    // this.activeNotifications.delete(n.index);
    console.log(this.activeNotifications);
    this._animate_leave(n);
  }
  static _animate_leave(n: NotificationWithEl) {
    const { el } = n;
    setTimeout(() => {
      anime({
        targets: el,
        translateX: 301,
        duration: 2235,
        //   easing:'eaaseInElastic',

        //   delay: this.getActiveNotificationsLength() * 100,
        begin: () => {
          this.count--;
          this.activeNotifications.delete(n.index);
        },
        complete: () => {
          try {
            document.body.removeChild(el);
          } catch (e) {
            console.log(e);
          }
        },
      });

      //   this.remove(n);
    }, n.duration + 100);
  }

  static moveDownRecent(): void {
    const active = Array.from(
      document.querySelectorAll(".notification")
    ).reverse();
    let i = 0;
    for (let el of Array.from(active)) {
      anime({ targets: el, translateY: i * 85, duration: 1101 });
      console.log(i * 115);
      i++;
    }
  }
  static getTranslateY() {
    return this.getActiveNotificationsLength() * 75;
  }
  static getActiveNotificationsLength(): number {
    const l = Array.from(this.activeNotifications.values()).length;

    return l;
  }
}

class NotificationWithEl extends Notification {
  constructor(el: HTMLElement, index: number, n: Notification) {
    super(n.message, n.type, n.duration);
    this.el = el;
    this.index = index;
  }

  el: HTMLElement;
  index: number;
}
