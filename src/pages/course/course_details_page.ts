import StudentCard from "../../components/Cards/student_card";
import { PageOption } from "../../components/Page/option/page_option";
import { Notification } from "../../controller/notification/notification";
import { NotificationController } from "../../controller/notification/notification_controller";
import { CourseRequestController } from "../../controller/request_controller/request_controller";
import { CourseModel } from "../../models/course/course_model";
import { PersonModel } from "../../models/person_model/person_model";
import { PageRouter } from "../../page_router/page_router";
import { SubPage } from "../../page_router/sub_page";
import { Items } from "../../page_router/types";

//@ts-ignore
export class CourseDetailsPage extends SubPage {
  constructor(
    course: CourseModel,
    students: PersonModel[],
    teachers: PersonModel[]
  ) {
    const { name } = course;
    super(
      name,
      {
        Lehrer: teachers.map((p) => new StudentCard(p)),
        Schüler: students.map((p) => new StudentCard(p)),
      },
      [
        new PageOption("add", {
          action: async (_, p) => {
            await PageRouter.getInstance?.addPersonPage(course);
          },
        }),
      ]
    );
  }
  async init(course: CourseModel): Promise<CourseDetailsPage> {
    return new CourseDetailsPage(
      course,
      await this.getStudents(course.id),
      await this.getTeachers(course.id)
    );
  }

  static async init(course: CourseModel): Promise<CourseDetailsPage> {
    return new CourseDetailsPage(
      course,
      await this.getStudents(course.id),
      await this.getTeachers(course.id)
    );
  }

  static async getStudents(courseId: number) {
    return await CourseRequestController.requestStudents(courseId);
  }
  static async getTeachers(courseId: number) {
    return await CourseRequestController.requestTeachers(courseId);
  }
  async getStudents(courseId: number) {
    return await CourseRequestController.requestStudents(courseId);
  }
  async getTeachers(courseId: number) {
    return await CourseRequestController.requestTeachers(courseId);
  }
  async getItems(): Promise<Items> {
    return this.items;
  }

  static async getItems(): Promise<Items> {
    return {};
  }
  static options = [new PageOption("add")];
  async setItems(): Promise<void> {
    this.items = await this.getItems();
  }
  static getOptions(): PageOption[] {
    return this.options;
  }
  getOptions(): PageOption[] {
    return this.options;
  }
}
