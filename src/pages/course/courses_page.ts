import { PageOption } from "../../components/Page/option/page_option";
import { Controller } from "../../controller";
import { RequestController } from "../../controller/request_controller/request_controller";
import { CourseRequestModel } from "../../models/course/course_request_model";
import { Page } from "../../page_router/page";
import { Items } from "../../page_router/types";


export class CoursesPage extends Page {
  constructor(items: Items, options: PageOption[] = []) {
    super("Kurse", [], CoursesPage.getOptions());
  }

  static async init(): Promise<CoursesPage> {
    return new CoursesPage(await this.getItems());
  }
  static async getItems(): Promise<Items> {
  
        // await RequestController.getByModel(new CourseRequestModel({}))
 
    
    return [];
  }
  static options = [new PageOption("add")];

  static getOptions(): PageOption[] {
    return this.options;
  }
}
