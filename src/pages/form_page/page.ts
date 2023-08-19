import { Page } from "../../page_router/page";
import Card from "../../components/Card/card_class";
import { InputCardConf } from "../../components/Cards/input_card/input_card";
import { PageOption } from "../../components/Page/option/page_option";

import { Items } from "../../page_router/types";

type OnSubmit = (data: any) => Promise<void>;
export abstract class FormPage extends Page {
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
  async submitForm(): Promise<void> {
    const form = this.getFormContainer();
    let inputsAreValid = true;
    const data: { [key: string]: any } = {};
    for (let input of this.items) {
      if (input instanceof InputCardConf) {
        if (!input.inputIsValid()) {
          inputsAreValid = false;
        }
        data[input.data_describer] = input.getInputValue();
      }
    }
    if (!inputsAreValid) {
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
  getOptions(): PageOption[] {
    return [];
  }
  static getOptions(): PageOption[] {
    return [];
  }

  async getItems(): Promise<Items> {
    return [];
  }
  static async getItems(): Promise<Items> {
    return [];
  }
  async setItems(): Promise<void> {}
}
