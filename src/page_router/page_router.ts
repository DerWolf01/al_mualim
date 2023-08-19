import { Page } from "./page";
import { PageOption } from "../components/Page/option/page_option";
import { StudentPage } from "../pages/students/students_list/students_list";
import { AddPersonPage } from "../pages/persons/add_person/add_person";
import { LoginPage } from "../pages/auth/login";
import { Items } from "./types";
import { Controller } from "../controller";
import { AuthController } from "../controller/auth/auth_controller";
import { CoursesPage } from "../pages/course/courses_page";

export type routes = "SchülerListe" | "AddPersonPage" | "Login" | "Courses";

export class PageRouter {
  private constructor(page: Page) {
    this.page = page;
  }

  private static instance?: PageRouter;
  static async init(initRoute: routes): Promise<PageRouter> {
    if (!this.instance) {
      const page = await this.getPageByName(initRoute);
      this.instance = new PageRouter(page);
    }
    return this.instance;
  }
  page: Page;
  items: Items = [];
  beforeNavigationCallbacks: PageRouterEventCallback[] = [];
  afterNavigationCallbacks: PageRouterEventCallback[] = [];
  addEventListener(type: PageRouterEvents, callback: PageRouterEventCallback) {
    switch (type) {
      case "beforeChange":
        this.beforeNavigationCallbacks.push(callback);
        break;
      case "afterChange":
        this.afterNavigationCallbacks.push(callback);
        break;
    }
  }
  getPageTitle() {
    return this.page.title;
  }

  getOptions(): PageOption[] {
    return this.page.getOptions();
  }
  async getItems(): Promise<Items> {
    const items = await this.page.getItems();

    return items;
  }
  async setItems(): Promise<void> {
    this.items = await this.page.getItems();
  }

  async authenticate(): Promise<void> {
    const token = AuthController.getToken();
    if (!token ? false : token!.length > 0) {
      await AuthController.authenthicate();
      return;
    }
    await this.to("Login");
  }

  static get getInstance(): PageRouter | undefined {
    return PageRouter.instance;
  }
  async to(page_name: routes): Promise<Items> {
    this.runBeforeCallbacks();
    this.page = await PageRouter.getPageByName(page_name);

    await this.setItems();

    await this.runAfterCallbacks();
    return this.items;
  }

  static async getPageByName(name?: routes): Promise<Page> {
    if (!localStorage.getItem("token")) {
      return await LoginPage.init();
    }
    switch (name) {
      case "SchülerListe":
        return await StudentPage.init();
      case "AddPersonPage":
        return await AddPersonPage.init();
      case "Login":
        return await LoginPage.init();
      case "Courses":
        await CoursesPage.init();
    }
    return await CoursesPage.init();
  }
  async runBeforeCallbacks(): Promise<void> {
    for (var c of this.beforeNavigationCallbacks) {
      await c(this.page);
    }
  }
  async runAfterCallbacks(): Promise<void> {
    for (var c of this.afterNavigationCallbacks) {
      await c(this.page);
    }
    return;
  }
}

type PageRouterEvents = "beforeChange" | "afterChange";
type PageRouterEventCallback = (page: Page) => Promise<void>;
// export default class PageRouter {
//   private constructor() {}

//   private static instance = new PageRouter();

//   static getInstance() {
//     if (!this.instance) {
//       this.instance = new PageRouter();
//     }
//     return this.instance;
//   }

//   static pages: Pages = new Pages();
//   static active: string = "Schülerliste";

//   static to(page: string): void {
//     PageRouter.active = page;
//     PageRouter.pages.get(page)?.init()
//   }

//   public static getPageTitle(): string {
//     return this.pages.get(this.active)?.title ?? "page";
//   }
//   public static getItems(): Array<Card> {
//     return this.pages.get(this.active)?.items ?? [];
//   }

//   static addPage(page: Page): void {
//     this.pages.set(page.title, page);
//   }
// }
