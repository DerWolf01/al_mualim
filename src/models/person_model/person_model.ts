import { InterfaceDeclaration, InterfaceType, Type } from "typescript";
import { Gender, IPerson, PersonRequestInterface, Roles } from "./types";
import { IModelProto, Model } from "../model";
import { ModelTypeInterface } from "../../controller/request_controller/request_controller";
import { DataTransformController } from "../../controller/data_transformer_controller/data_transformer_controller";
import { RolesController } from "../../controller/roles/roles_controller";

export class PersonModel extends Model implements IPerson {
  constructor(data: IPerson) {
    super();
    const { id, name, last_name, birthdate, gender, role } = data;
    console.log("person role " + role);
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.gender = gender;
    const final_role = RolesController.getRoleName(role);
    console.log(final_role);
    this.role = role;
  }
  id: number;
  name: string;
  last_name: string;
  birthdate: Date | string;
  gender: Gender;
  role: Roles;
  static jsonToModel(jsonObject: IPerson): PersonModel {
    const obj: ModelTypeInterface<PersonModel, IPerson> = PersonModel;

    return DataTransformController.jsonToModel<PersonModel, IPerson>(
      obj,
      jsonObject,
      IPersonProto
    );
  }
}
//@ts-ignore
export const IPersonProto: IModelProto & IPerson = {
  birthdate: new Date(),
  gender: Gender.FEMALE,
  id: 0,
  last_name: "",
  name: "",
  role: Roles.TEACHER_ROLE | Roles.STUDENT_ROLE | Roles.ADMIN_ROLE,
};
