import { Type } from "typescript";
import { Controller } from "..";
import { Model } from "../../models/model";
import { PersonModel } from "../../models/person_model/person_model";
import { IPerson } from "../../models/person_model/types";
import { PageRouter } from "../../page_router/page_router";
import { AuthController } from "../auth/auth_controller";
import { DataTransformController } from "../data_transformer_controller/data_transformer_controller";
import { SERVER, ServerPaths } from "../types";

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
    let body;

    body = where ? DataTransformController.modelToJson(where) : null;

    const headers = new Headers();
    const token = AuthController.getToken();
    if (!token) {
      PageRouter.getInstance?.to("Login");
      return null;
    }
    headers.append("token", token);

    let res: RES;
    try {
      res = await fetch(`${SERVER}${path}`, {
        body,
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
    obj: new (data: IModel) => ModelType & Function
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

      res.push(new obj(response_data_entry));
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
