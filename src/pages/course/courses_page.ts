import { PageOption } from "../../components/Page/option/page_option";
import { Controller } from "../../controller";
import { Notification } from "../../controller/notification/notification";
import { NotificationController } from "../../controller/notification/notification_controller";
import { RequestController } from "../../controller/request_controller/request_controller";
import { CourseModel } from "../../models/course/course_model";
import { CourseRequestModel } from "../../models/course/course_request_model";
import { Page } from "../../page_router/page";
import { PageRouter } from "../../page_router/page_router";
import { Items } from "../../page_router/types";

export class CoursesPage extends Page {
  constructor(items: Items, options: PageOption[] = []) {
    super("Kurse", items, [
      new PageOption("add", {
        action: async () => {
          // NotificationController.add(new Notification("message", "warning",3333));
          
          PageRouter.getInstance?.to("AddCoursePage");
        },
      }),
    ]);
  }
  async init(): Promise<CoursesPage> {
    const items = await this.getItems();

    return new CoursesPage(items);
  }
  async getItems(): Promise<Items> {
    const cards = {
      none: (await CourseModel.requestFromServer()).map((m) =>
        m.generateCard()
      ),
    };
    return cards;
  }
  static async init(): Promise<CoursesPage> {
    const items = await this.getItems();

    return new CoursesPage(items);
  }
  static async getItems(): Promise<Items> {
    const cards = {
      none: (await CourseModel.requestFromServer()).map((m) =>
        m.generateCard()
      ),
    };

    return cards;
  }

  async setItems(): Promise<void> {
    this.items = await this.getItems();
  }
  static options = [new PageOption("add")];

  getOptions(): PageOption[] {
    return this.options;
  }
  static getOptions(): PageOption[] {
    return this.options;
  }
}
