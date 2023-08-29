import Card from "../../components/Card/card_class";
import { InputCardConf } from "../../components/Cards/input_card/input_card";
import { Icon } from "../../components/Icons/types";
import { PageOption } from "../../components/Page/option/page_option";
import { NavigationController } from "../../controller/navigation/navigation_controller";
import { CourseModel } from "../../models/course/course_model";
import { PageRouter } from "../../page_router/page_router";
import { SubPage } from "../../page_router/sub_page";
import { Items } from "../../page_router/types";
import { FormPage } from "../form_page/page";

export class AddCoursePage extends FormPage implements SubPage {
  constructor(items: Items = AddCoursePage.items, options: PageOption[] = []) {
    super("Kurs hinzufügen", items, options, async (s) => {
      console.log(s);
    });
    NavigationController.backIcon();
  }

  options: PageOption[] = [];
  static course = new CourseModel({ id: 0, name: "" });
  static items: Items = {
    none: [
      new InputCardConf({
        required: true,
        min: 5,
        index: 1,
        title: "Kursname",
        data_describer: "name",
        placeholder: "Suffe, Quran kurs, Fiqh...",
      }),
      new Card({
        title: "Lehrer",
        content: "Tippen um auszuwählen",
        icon: new Icon("person"),
        action: async () => {
          await PageRouter.getInstance?.addPersonPage(this.course);
        },
      }),
      new Card({
        title: "Schüler",
        content: "Tippen um auszuwählen",
        icon: new Icon("school"),
        action: async () => {
          await PageRouter.getInstance?.addPersonPage(this.course);
        },
      }),
    ],
  };
}
