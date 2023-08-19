import { InterfaceDeclaration, InterfaceType, Type } from "typescript";
import { Gender, IPerson, PersonRequestInterface, Roles } from "./types";

export class PersonModel implements IPerson {
  constructor(data: IPerson) {
    const { id, name, last_name, birthdate, gender, role } = data;

    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.gender = gender;
    this.role = role;
  }
  id: number;
  name: string;
  last_name: string;
  birthdate: string;
  gender: Gender;
  role: Roles;
}

