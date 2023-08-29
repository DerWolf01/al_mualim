import { User } from "../../models/active_user";
import { AuthRequestModel } from "../../models/auth/auth_request_model";
import { PersonModel } from "../../models/person_model/person_model";
import {
  IPerson,
  IPersonWithToken,
  PersonJsonObject,
} from "../../models/person_model/types";
import { PageRouter } from "../../page_router/page_router";
import { DataTransformController } from "../data_transformer_controller/data_transformer_controller";
import { RequestController } from "../request_controller/request_controller";
import { SERVER, ServerPaths } from "../types";

export class AuthController {
  static getToken(): string | null {
    return localStorage.getItem("token");
  }
  static setToken(token: string) {
    localStorage.setItem("token", token);
  }
  static deleteToken() {
    localStorage.removeItem("token");
  }

  static async authenthicate(): Promise<User | void> {
    const res = await RequestController.get(ServerPaths.AUTHENTICATE);
    const res_json = await res?.json();

    return User.getUser();
  }
  static async login(data: {
    email: string;
    password: string;
  }): Promise<User | void> {
    const res = await RequestController.post(ServerPaths.LOGIN, data);
    if (!res) {
      return;
    }
    const json = (await res?.json()) as Object;
    // const responseIsValid = DataTransformController.responseIsValid(
    //   json,
    //   PersonJsonObject
    // );
    // if (!responseIsValid) {
    //   //@todo add Error notification
    //   return;
    // }
    const person_data = json as IPersonWithToken;
   
    AuthController.setToken(person_data.jwt);
  
    const user = User.initUser(json as IPerson);
    PageRouter.getInstance?.to("SchülerListe");
    return user;
  }
}
