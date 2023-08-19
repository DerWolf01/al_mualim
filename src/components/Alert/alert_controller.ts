import { InputCardConf } from "../Cards/input_card/input_card";
import { Alert } from "./alert";

export class AlertController {
  private constructor() {}

  private static instance?: AlertController;

  alerts: Map<string, Alert> = new Map();
  listeners: Map<string, (alerts: Map<string, Alert>) => void> = new Map();

  static getInstance(): AlertController {
    if (!this.instance) {
      this.instance = new AlertController();
    }
    return this.instance;
  }
  static createAlert(card: InputCardConf) {
    const alert = new Alert(card);
    this.getInstance().alerts.set(card.data_describer, alert);
    this.onChange();
  }
  static removeAlert(card: InputCardConf) {
    this.getInstance().alerts.get(card.data_describer)?.clear();
    // this.getInstance().alerts.delete(card.data_describer);
    this.onChange();
  }

  static forceRemove(card: InputCardConf) {
    this.getInstance().alerts.delete(card.data_describer);
    this.onChange();
  }
  static addEventListener(
    key: string,
    listener: (alerts: Map<string, Alert>) => void
  ) {
    this.getInstance().listeners.set(key, listener);
  }
  static removeEventListener(key: string) {
    this.getInstance().listeners.delete(key);
  }
  static onChange() {
    const instance = this.getInstance();
    for (let listener of instance.listeners.values()) {
      listener(instance.alerts);
    }
  }
}
