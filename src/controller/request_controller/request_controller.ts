import { Type } from "typescript";
import { Controller } from "..";
import { IModel, IModelProto, Model } from "../../models/model";
import {
  IPersonProto,
  PersonModel,
} from "../../models/person_model/person_model";
import { IPerson } from "../../models/person_model/types";
import { PageRouter } from "../../page_router/page_router";
import { AuthController } from "../auth/auth_controller";
import { DataTransformController } from "../data_transformer_controller/data_transformer_controller";
import { CourseServerPaths, SERVER, ServerPaths } from "../types";
import { CourseModel, ICourseModel } from "../../models/course/course_model";
export interface ModelTypeInterface<ModelType, IModel> {
  [key: string]: any;
  new (data: IModel): ModelType;
}
type RES = Response | null;
export class RequestController extends Controller {
  static evenListener: Array<(res: RES) => Promise<boolean>> = [
    this.checkAuthListener,
  ];

  static async checkAuthListener(res: RES): Promise<boolean> {
    if (res?.status == 405) {
      AuthController.deleteToken();
      PageRouter.getInstance?.to("Login");
      return false;
    }
    return true;
  }
  static async post(path: string, data?: Model): Promise<RES> {
    let body;
    body = data ? DataTransformController.modelToJson(data) : null;

    const headers = new Headers();

    if (path != ServerPaths.AUTHENTICATE && path != ServerPaths.LOGIN) {
      const token = AuthController.getToken();
      if (!token) {
        PageRouter.getInstance?.to("Login");
        return null;
      }
      headers.append("token", token);
    }
    let res: RES;
    console.log(body)
    try {
      res = await fetch(`${SERVER}${path}`, {
        body,
        method: "POST",
        headers,
      });
    } catch (e) {
      res = null;
      console.log(e);
    }
    for (let listener of this.evenListener) {
      if (!(await listener(res))) {
        return null;
      }
    }
    return res;
  }

  static async get(path: string, where?: Model): Promise<RES> {
    let where_params = where ? `/${Object.values(where).join("/")}` : "";

    const headers = new Headers();
    const token = AuthController.getToken();
    if (!token) {
      PageRouter.getInstance?.to("Login");
      return null;
    }
    headers.append("token", token);

    let res: RES;
    try {
      res = await fetch(`${SERVER}${path}${where_params}`, {
        method: "GET",
        headers,
      });
    } catch (e) {
      res = null;
      console.log(e);
    }
    for (let listener of this.evenListener) {
      if (!(await listener(res))) {
        return null;
      }
    }
    return res;
  }

  /**
   *
   * @function getByModel
   * @type ModelType extends Model
   * @type IModel extends object
   * @returns Instance of ModelType
   */
  static async getByModel<ModelType extends Model, IModel extends {}>(
    obj: ModelTypeInterface<ModelType, IModel>,
    objProto: IModelProto
  ): Promise<ModelType[]> {
    const modelName = obj.name;

    const res: ModelType[] = [];
    const path = this.getRequestRouteName(modelName);
    const where = DataTransformController.modelToJson(obj);
    console.log(`Route Path ${SERVER}${path}`);
    let response_data;
    try {
      response_data = await (await RequestController.get(path))?.json();
    } catch (e) {
      console.error(e);
      return [];
    }
    if (!response_data) {
      return [];
    }
    for (let response_data_entry_key of Object.keys(response_data)) {
      const response_data_entry = response_data[response_data_entry_key];

      res.push(
        DataTransformController.jsonToModel<ModelType, IModel>(
          obj,
          response_data_entry,
          objProto
        )
      );
      // let valid = true
      // for(let data_entry_key in Object.keys(response_data_entry)){
      //   if(data_entry_key == )
      // }
    }
    return res;
  }
  static async personsFromServer(): Promise<PersonModel[]> {
    const res = await this.get(ServerPaths.PERSONS);
    const json = await res?.json();

    return this.personsFromJson(json);
  }

  static personsFromJson(data: String): PersonModel[] {
    const data_array: IPerson[] = JSON.parse(JSON.stringify(data)) as IPerson[];
    let res: PersonModel[] = [];
    for (let i = 0; i < data_array.length; i++) {
      const student_json = data_array[i];
      res.push(new PersonModel(student_json));
    }
    return res;
  }
  static getRequestRouteName(obj: any, seperator = "Model"): string {
    const name =
      typeof obj == "string" ? obj : (obj.constructor.name as string);
    return `/${name.split(seperator)[0].toLowerCase()}`;
  }
}

export class CourseRequestController extends RequestController {
  static async addPersonToCourse(
    courseId: number,
    personId: number
  ): Promise<RES> {
    const res = await this.post(CourseServerPaths.ADD_PERSON_TO_COURSE, {
      personId: personId,
      courseId: courseId,
    });
   
    return res;
  }

  static async requestCourses(partial = true): Promise<CourseModel[]> {
    const res = await this.get(
      partial
        ? CourseServerPaths.GET_COURSES_PARTIAL
        : CourseServerPaths.GET_COURSES
    );

    let res_json;

    try {
      res_json = await res?.json();
    } catch (e) {
      console.log(e);
      return [];
    }
    return Object.values(res_json).map(
      (e:any) => new CourseModel(e)
    ) as CourseModel[];
  }
  static async requestStudents(courseId: number): Promise<PersonModel[]> {
    const res = await this.get(CourseServerPaths.GET_STUDENTS, {
      id: courseId,
    });
    let res_json: any;
    try {
      res_json = await res?.json();
      console.log(res, "response");
    } catch (e) {
      console.error(e);
      return [];
    }
    console.log(res_json);
    const students: PersonModel[] = Object.values(res_json ?? {}).map(
      (obj: any) => {
        return DataTransformController.jsonToModel<PersonModel, IPerson>(
          PersonModel,
          obj,
          IPersonProto
        );
      }
    );
    console.log("students: ", students);
    return students;
  }

  static async requestTeachers(courseId: number): Promise<PersonModel[]> {
    const res = await this.get(CourseServerPaths.GET_TEACHERS, {
      id: courseId,
    });

    let res_json: any;
    try {
      res_json = await res?.json();
      console.log(res);
    } catch (e) {
      console.error(e);
      return [];
    }
    console.log(res_json);
    const teachers: PersonModel[] = Object.values(res_json ?? {}).map(
      (obj: any) => {
        return DataTransformController.jsonToModel<PersonModel, IPerson>(
          PersonModel,
          obj,
          IPersonProto
        );
      }
    );
    console.log("teachers: ", teachers);
    return teachers;
  }
}
