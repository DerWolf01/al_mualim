import { Page } from "./page";
import { PageOption } from "../components/Page/option/page_option";
import { StudentPage } from "../pages/students/students_list/students_list";
import {
  AddPersonPage,
  CreatePersonPage,
} from "../pages/persons/add_person/add_person";
import { LoginPage } from "../pages/auth/login";
import {
  Items,
  PageRouterEventCallback,
  PageRouterEvents,
  routes,
} from "./types";
import { Controller } from "../controller";
import { AuthController } from "../controller/auth/auth_controller";
import { CoursesPage } from "../pages/course/courses_page";
import { User } from "../models/active_user";
import { SubPage } from "./sub_page";
import { NavigationController } from "../controller/navigation/navigation_controller";
import { AddCoursePage } from "../pages/course/add_course_page";
import { Roles } from "../models/person_model/types";
import { CourseModel } from "../models/course/course_model";

export class PageRouter {
  private constructor(page: Page) {
    this.page = page;
    this.history.push(page);
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
  items: Items = {};
  beforeNavigationCallbacks: PageRouterEventCallback[] = [];
  afterNavigationCallbacks: PageRouterEventCallback[] = [];
  history: PageRouterHistory = new PageRouterHistory();
  routing = false;
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
    await this.page.setItems();
    this.items = this.page.items;
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

  // routing functions
  async to(page_name: routes | Page, anonym: boolean = false): Promise<Items> {
    this.routing = true;
    if (!anonym) {
      this.history.register(page_name);
    }
    if (page_name instanceof SubPage) {
      NavigationController.backIcon();
    } else {
      NavigationController.stairsIcon();
    }
    await this.runBeforeCallbacks();
    if (page_name instanceof Page) {
      this.page = page_name;
    } else {
      this.page = await PageRouter.getPageByName(page_name);
    }
    await this.setItems();

    await this.runAfterCallbacks();
    this.routing = false;
    // this.history.normalize();

    return this.items;
  }

  async backward() {
    await this.history.backward();
  }
  async forward() {
    await this.history.forward();
  }
  static async getPageByName(name?: routes): Promise<Page> {
    if (!User.getAuthStatus()) {
      return await LoginPage.init();
    }
    switch (name) {
      // case "SchülerListe":
      //   return await StudentPage.init();
      // case "AddPersonPage":
      //   return await AddPersonPage.init();
      case "Login":
        return await LoginPage.init();
      case "Courses":
        return await CoursesPage.init();
      case "AddCoursePage":
        return new AddCoursePage();
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
  async addPersonPage(addTo: CourseModel) {
    await this.to(await AddPersonPage.init(addTo));
  }
  async createPersonPage(role?: Roles.STUDENT_ROLE | Roles.TEACHER_ROLE) {
    await this.to(await CreatePersonPage.init(role));
  }
}

export class PageRouterHistory extends Array<routes | Page> {
  constructor() {
    super();
  }

  activeIndex: number = 0;
  async register(page: routes | Page): Promise<void> {
    // this.normalize();

    this.push(await this.getPage(page));
    this.activeIndex++;
  }
  normalize() {
    this.activeIndex = this.getLength();
  }
  async backward(anonym = true) {
    console.log(this.activeIndex);
    if (this.activeIndex == 0) {
      return;
    }
    // while (PageRouter.getInstance?.routing) {
    //   console.log("routing");
    //   continue;
    // }
    this.activeIndex--;
    console.log(this[this.activeIndex]);
    await PageRouter.getInstance?.to(this[this.activeIndex], anonym);
  }
  async forward(anonym = true) {
    console.log(this.getLength() - 1 == this.activeIndex);
    if (this.getLength() - 1 == this.activeIndex) {
      return;
    }

    this.activeIndex++;
    await PageRouter.getInstance?.to(this[this.activeIndex], anonym);
  }

  async getPage(page: routes | Page): Promise<Page> {
    if (page instanceof Page) {
      return page;
    }
    return await PageRouter.getPageByName(page);
  }
  getLastPage() {
    return this[this.getLength() - 1];
  }
  getLength() {
    return this.length;
  }
}
