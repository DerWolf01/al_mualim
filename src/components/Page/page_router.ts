import Card from "../Card/card_class";
import Page from "./page";
import StudentCard from "../Cards/student_card";
import { useStudentsStore } from "../../stores/students_store";
import { Student, Students } from "../../models/students";

class StudentPage extends Page {
  constructor() {
    super("Schülerliste", StudentPage.getStudents());
  }

  static getStudents() {
    const store = useStudentsStore();
    return store.getStudents().map((s: Student) => new StudentCard(s));
  }
}
class Pages extends Map<string, Page> {
  constructor() {
    super();
    const studentPage = new StudentPage();
    this.set(studentPage.title, studentPage);
  }
}

export default class PageRouter {
  private constructor() {}

  private static instance = new PageRouter();

  static getInstance() {
    if (!this.instance) {
      this.instance = new PageRouter();
    }
    return this.instance;
  }

  static pages: Pages = new Pages();
  static active: string = "Schülerliste";
  static addPage(page: Page): void {
    this.pages.set(page.title, page);
  }
  to(page: string): void {}

  public static getPageTitle(): string {
    return this.pages.get(this.active)?.title ?? "page";
  }
  public static getItems(): Array<Card> {
    return this.pages.get(this.active)?.items ?? [];
  }
}
