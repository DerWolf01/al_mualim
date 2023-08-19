import anime from "animejs";
import { InputCardConf } from "../Cards/input_card/input_card";
import { AlertController } from "./alert_controller";

export class Alert {
  constructor(card: InputCardConf) {
    this.card = card;
    this.text = this.getTextFromInputErrors();
  }
  card: InputCardConf;
  text: string;

  clear(): void {
    const el = this.getAlertElement();
    const duration = 1755;
    anime({
      targets: el,
      scale: .1,
      opacity: 0,
      easing: "easeOutElastic",
      translateX: [0, "115%"],
      delay: (this.card.index ?? 0) * 105,
      duration
    });
    setTimeout(
      () =>
        AlertController.forceRemove(this.card),
      duration*0.7
    );
  }

  getTextFromInputErrors(): string {
    return this.card.errors.map((e) => e.toString()).join(",");
  }
  getAlertElement(): HTMLElement | undefined {
    return document.querySelector("." + this.getClassName()) as
      | HTMLElement
      | undefined;
  }
  getClassName(card: InputCardConf = this.card): string {
    return `${card.data_describer}-alert`;
  }
}
