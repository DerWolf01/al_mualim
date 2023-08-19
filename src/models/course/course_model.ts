import { ModelAnnotation } from "../../decorators/model/model_decorator";
import { Model } from "../model";
import { PersonModel } from "../person_model/person_model";
import { ICourseRequestModel } from "./course_request_model";

export class CourseModel extends Model implements ICourseModel {
  constructor(data: ICourseModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.teachers = data.teachers;
    this.participants = data.participants;
  }
  id: number;
  name: string;
  teachers: PersonModel[];
  participants: PersonModel[];
}
export interface ICourseModel {

  id: number;
  name: string;
  teachers: PersonModel[];
  participants: PersonModel[];
}
