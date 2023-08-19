import { Model } from "../model";
import { PersonModel } from "../person_model/person_model";

export class CourseRequestModel extends Model {
  constructor(data: ICourseRequestModel) {
    super();
    const { id, name, participants, teachers } = data;
    this.id = id;
    this.name = name;
    this.participants = participants;
    this.teachers = teachers;
  }
  id?: number;
  name?: string;
  teachers?: PersonModel[];
  participants?: PersonModel[];
}
export interface ICourseRequestModel {
  id?: number;
  name?: string;
  teachers?: PersonModel[];
  participants?: PersonModel[];
}
