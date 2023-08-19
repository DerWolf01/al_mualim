// // export const SERVER = "http://localhost:1337/http://localhost:1335";

// import { User } from "../models/active_user";
// import { AuthRequestModel } from "../models/auth/auth_request_model";
// import { Model } from "../models/model";
// import { PersonModel } from "../models/person_model/person_model";
// import {
//   IPerson,
//   IPersonWithToken,
//   PersonJsonObject,
// } from "../models/person_model/types";
// import { PageRouter } from "../page_router/page_router";
// import { AuthController } from "./auth/auth_controller";
// import { RequestController } from "./request_controller/request_controller";
// import { Methods, SERVER, ServerPaths } from "./types";

// export class DataTransformController {
 

//   static modelToJson(obj: Model) {
//     let res: { [key: string]: string | number } = {};
//     for (let key of Object.keys(obj)) {
//       if (!obj[key]) {
//         continue;
//       }
//       res[key] = obj[key];
//     }
//     return JSON.stringify(res);
//   }
  
//   static async personsFromServer(): Promise<PersonModel[]> {
//     const res = await fetch(`${SERVER}/persons`, {
//       method: "GET",
//     });
//     const json = await res.json();

//     return this.personsFromJson(json);
//   }

//   static personsFromJson(data: String): PersonModel[] {
//     const data_array: IPerson[] = JSON.parse(JSON.stringify(data)) as IPerson[];
//     let res: PersonModel[] = [];
//     for (let i = 0; i < data_array.length; i++) {
//       const student_json = data_array[i];
//       res.push(new PersonModel(student_json));
//     }
//     return res;
//   }

//   static async login(data: {
//     email: string;
//     password: string;
//   }): Promise<PersonModel | void> {
//     const res = await RequestController.post(ServerPaths.LOGIN, data);
//     const json = (await res?.json()) as Object;
//     const responseIsValid = this.responseIsValid(json, PersonJsonObject);
//     if (!responseIsValid) {
//       //@todo add Error notification
//       return;
//     }
//     const person_data = json as IPersonWithToken;
//     AuthController.setToken(person_data.jwt);
//     console.log(User.initUser(json as IPerson));
//     PageRouter.getInstance?.to("SchülerListe");
//   }

//   static responseIsValid(
//     res: { [key: string]: any },
//     compareTo: Map<string, any>
//   ) {
//     let isValid = true;
//     for (var key of Object.keys(res)) {
//       if (typeof res[key] !== typeof compareTo.get(key)) {
//         isValid = false;
//       }
//     }
//     return isValid;
//   }
// }
export class Controller {}
