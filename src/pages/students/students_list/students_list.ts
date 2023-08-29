import StudentCard from "../../../components/Cards/student_card";
import { PageOption } from "../../../components/Page/option/page_option";
import { Controller } from "../../../controller";
import { RequestController } from "../../../controller/request_controller/request_controller";
import { Page } from "../../../page_router/page";
import { PageRouter } from "../../../page_router/page_router";
import IPage from "../../../page_router/types";

export class StudentPage extends Page implements IPage {
  constructor(items: Items) {
    super("Schülerliste", items);
  }

  static async init(): Promise<StudentPage> {
    var items = await this.getItems();

    return new StudentPage(items);
  }

  static options = [
    new PageOption("add", {
      action: async (a) => {
       PageRouter.getInstance?.to("AddPersonPage");
      },
    }),
    new PageOption("search"),
  ];
  getOptions(): PageOption[] {
    return StudentPage.options;
  }
  static getOptions(): PageOption[] {
    return this.options;
  }
  async getItems(): Promise<StudentCard[]> {
    const persons = await RequestController.personsFromServer();
    const items: StudentCard[] = [];
    for (const p of persons) {
      const card = new StudentCard(p);
      items.push(card);
    }
    return items;
  }
  static async getItems(): Promise<StudentCard[]> {
    const persons = await RequestController.personsFromServer();
    const items: StudentCard[] = [];
    for (const p of persons) {
      const card = new StudentCard(p);
      items.push(card);
    }
    return items;
  }
  async setItems(): Promise<void> {
    this.items = await StudentPage.getItems();
    return;
  }
}
