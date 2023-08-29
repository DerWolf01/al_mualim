import { Model } from "../model";
import { PersonModel } from "../person_model/person_model";

export class CourseRequestModel extends Model {
  constructor(data: ICourseRequestModel) {
    super();
    const { id, name, students, teachers } = data;
    this.id = id;
    this.name = name;
    this.students = students;
    this.teachers = teachers;
  }
  id?: number;
  name?: string;
  teachers?: PersonModel[];
  students?: PersonModel[];
}
export interface ICourseRequestModel {
  id?: number;
  name?: string;
  teachers?: PersonModel[];
  students?: PersonModel[];
}
