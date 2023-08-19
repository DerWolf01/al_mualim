import Card from "../components/Card/card_class";
import { InputCardConf } from "../components/Cards/input_card/input_card";
import { PageOption } from "../components/Page/option/page_option";
import { Controller } from "../controller";
import IPage, { Items } from "./types";


export abstract class Page implements IPage {
  constructor(
    title: string,
    items: Items,
    options: PageOption[] = [],
    
  ) {
    this.title = title;
    this.items = items;
    this.options = options;

  }
  options: PageOption[];
  items: Items;
  title: string;
  static init() {}

  getFormContainer(): HTMLFormElement | undefined {
    return document.querySelector("form.content") as
      | HTMLFormElement
      | undefined;
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
