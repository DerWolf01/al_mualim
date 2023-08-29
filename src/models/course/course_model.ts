import Card from "../../components/Card/card_class";
import { DataTransformController } from "../../controller/data_transformer_controller/data_transformer_controller";
import {
  CourseRequestController,
  ModelTypeInterface,
  RequestController,
} from "../../controller/request_controller/request_controller";
import { ModelAnnotation } from "../../decorators/model/model_decorator";
import { PageRouter } from "../../page_router/page_router";
import { CourseDetailsPage } from "../../pages/course/course_details_page";
import { IModelProto, Model } from "../model";
import { PersonModel } from "../person_model/person_model";

export class CourseModel extends Model implements ICourseModel {
  constructor(data: ICourseModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.teachers = data.teachers;
    this.students = data.students;
  }
  id: number;
  name: string;
  teachers?: PersonModel[];
  students?: PersonModel[];
  static jsonToModel(jsonObject: ICourseModel): CourseModel {
    const obj: ModelTypeInterface<CourseModel, ICourseModel> = CourseModel;

    return DataTransformController.jsonToModel<CourseModel, ICourseModel>(
      obj,
      jsonObject,
      ICourseModelProto
    );
  }
  static async requestFromServer(partial = true): Promise<CourseModel[]> {
    if (partial) {
      return await CourseRequestController.requestCourses(partial);
    }
    return await RequestController.getByModel<CourseModel, ICourseModel>(
      CourseModel,
      ICourseModelProto
    );
  }
  generateCard(): CourseCard {
    return new CourseCard(this);
  }
}
export interface ICourseModel {
  id: number;
  name: string;
  teachers?: PersonModel[];
  students?: PersonModel[];
}

export const ICourseModelProto: IModelProto = {
  id: 0,
  name: "",
  teachers: [PersonModel],
  students: [PersonModel],
};

export class CourseCard extends Card {
  constructor(course: CourseModel) {
    const { name } = course;
    super({
      title: name,
      action: async (card) => {
        PageRouter.getInstance?.to(await CourseDetailsPage.init(course));
      },
    });
  }
}
