import { Icon } from "../../components/Icons/types";

export class Notification {
  constructor(message: string, type: NotificationType, duration?: number) {
    this.message = message;
    this.type = type;
    this.duration = duration ?? 2355;
  }
  message: string;
  type: NotificationType;
  duration = 5355;

   _generateElIcon(n: Notification): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(
      ...["not-icon-wrapper", `not-icon-${n.type}-wrapper`]
    );
    const svg = document.createElement("ion-icon");
    const icons: { [key: string]: Icon } = {
      warning: new Icon("warning"),
      success: new Icon("checkmark"),
      error: new Icon("warning"),
      plain: new Icon("information"),
    };
    svg.classList.add(...["not-icon", `not-icon-${n.type}`]);
    svg.icon = icons[n.type].toString();
    wrapper.appendChild(svg);
    return wrapper;
  }
   _generateMessage(n: Notification): HTMLSpanElement {
    const span = document.createElement("span");
    span.innerHTML = n.message;
    return span;
  }
   createElement(n: Notification, index: number) {
    const div = document.createElement("div");
    div.classList.add("notification");
    div.classList.add(`notification-${index}`);
    div.appendChild(this._generateElIcon(n));
    div.appendChild(this._generateMessage(n));
    return div;
  }
}

export type NotificationType = "success" | "warning" | "error" | "plain";
