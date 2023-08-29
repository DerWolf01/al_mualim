import { Page } from "../../page_router/page";
import Card from "../../components/Card/card_class";
import { InputCardConf } from "../../components/Cards/input_card/input_card";
import { PageOption } from "../../components/Page/option/page_option";

import { Items } from "../../page_router/types";
import { IModel, Model } from "../../models/model";
import { NotificationController } from "../../controller/notification/notification_controller";
import { Notification } from "../../controller/notification/notification";

type OnSubmit = (data: any) => Promise<void>;
export class FormPage extends Page {
  constructor(
    title: string,
    items: Items,
    options: PageOption[] = [],
    onSubmit: OnSubmit
  ) {
    super(title, items, options);
    this.onSubmit = onSubmit;
  }
  onSubmit: OnSubmit;

  getFormContainer(): HTMLFormElement | undefined {
    return document.querySelector("form.content") as
      | HTMLFormElement
      | undefined;
  }
  static getFormContainer(): HTMLFormElement | undefined {
    return document.querySelector("form.content") as
      | HTMLFormElement
      | undefined;
  }
  async submitForm(): Promise<void> {
    const form = this.getFormContainer();
    let inputsAreValid = true;
    const data: { [key: string]: any } = {};
    const items: InputCardConf[] = [];
    for (let inputCards of Object.values(this.items)) {
      for (let inputCard of inputCards) {
        items.push(inputCard as InputCardConf);
      }
    }
    console.log(items);
    for (let input of items) {
      if (input instanceof InputCardConf) {
        if (!input.inputIsValid()) {
          inputsAreValid = false;
        }
        data[input.data_describer] = input.getInputValue();
      }
    }
    if (!inputsAreValid) {
      NotificationController.add(
        new Notification("Felder überprüfen", "warning")
      );
      return;
    }
    await this.onSubmit(data);
  }

  checkInput(input: InputCardConf) {
    if (input.required)
      if (input.min) {
        (input.getInputValue()?.length ?? 0) < input.min;
      }
    if (input.max) {
      (input.getInputValue()?.length ?? 0) < input.max;
    }
  }

  getValuesobject(): { [key: string]: any } {
    const inputs: InputCardConf[] = [];
    let res: { [key: string]: any } = {};
    for (let input_lists of Object.values(this.items)) {
      for (let input of input_lists) {
        if (input instanceof Card) {
          continue;
        }
        inputs.push(input);
        const i = input as InputCardConf;
        res[i.data_describer] = i.getInputValue();
      }
    }
    return res;
  }
  getOptions(): PageOption[] {
    return [];
  }
  static getOptions(): PageOption[] {
    return [];
  }

  async getItems(): Promise<Items> {
    return {};
  }
  static async getItems(): Promise<Items> {
    return {};
  }
  async setItems(): Promise<void> {}
}
