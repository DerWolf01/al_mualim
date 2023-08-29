import { InputCardConf } from "../../components/Cards/input_card/input_card";
import { PageOption } from "../../components/Page/option/page_option";
import { Controller } from "../../controller";
import { AuthController } from "../../controller/auth/auth_controller";
import { Page } from "../../page_router/page";
import { Items } from "../../page_router/types";
import { FormPage } from "../form_page/page";

export class LoginPage extends FormPage {
  constructor(items: Items = {}) {
    super("Login", items, [], async (data) => {
      await AuthController.login(data);
    });
  }

  static async init(): Promise<LoginPage> {
    var items = {
      none: [
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
      ],
    };
    return new LoginPage(items);
  }
  async getItems(): Promise<Items> {
    return this.items;
  }

  getOptions(): PageOption[] {
    return [
      new PageOption("logInOutline", {
        action: (e: PointerEvent) => {
          Object.values(this.items).forEach((item) => {
            // if (item instanceof InputCardConf) {
            //   console.log(item.getInputValue(), item.data_describer);
            // }
          });
          this.submitForm();
        },
      }),
    ];
  }

  options: PageOption[] = [];
  async setItems(): Promise<void> {
    this.items = await this.getItems();
  }
}
