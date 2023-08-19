import { InputCardConf } from "../../../components/Cards/input_card/input_card";
import { PageOption } from "../../../components/Page/option/page_option";
import { Page } from "../../../page_router/page";
import { PageRouter } from "../../../page_router/page_router";
import { Items } from "../../../page_router/types";
import { FormPage } from "../../form_page/page";

export class AddPersonPage extends FormPage {
  constructor(items: InputCardConf[]) {
    super("Schüler erstellen", items, [], async () => {});
  }

  static async init(): Promise<AddPersonPage> {
    var items = await this.getItems();

    return new AddPersonPage(items);
  }
  static items: InputCardConf[] = [
    new InputCardConf({
      index: 1,
      max: 320,
      min: 5,
      required: true,
      title: "Email Adresse",
      placeholder: "max@mubarek.de",
      data_describer: "email",
      onError: (e) => {
        console.log(e);
      },
    }),
    new InputCardConf({
      index: 2,
      required: true,
      min: 7,
      max: 25,
      title: "Password",
      placeholder: "Aci biber, 1234567...",
      data_describer: "password",
    }),
  ];
  static options = [
    new PageOption("add", {
      action: () => PageRouter.getInstance?.to("SchülerListe"),
    }),
  ];
  getOptions(): PageOption[] {
    return AddPersonPage.options;
  }
  static getOptions(): PageOption[] {
    return this.options;
  }
  async getItems(): Promise<Items> {
    return this.items;
  }
  static async getItems(): Promise<InputCardConf[]> {
    return this.items;
  }
  async setItems(): Promise<void> {
    this.items = await AddPersonPage.getItems();
    return;
  }
}
