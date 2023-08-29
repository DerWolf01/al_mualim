import { PersonModel } from "./person_model";

export enum Gender {
  MALE,
  FEMALE,
}

export enum Roles {
  STUDENT_ROLE,
  TEACHER_ROLE,
  ADMIN_ROLE,
}



export const PersonJsonObject: Map<string, String | Number> = new Map<
  string,
  any
>([
  ["birthdate", ""],
  ["email", ""],
  ["gender", ""],
  ["jwt", ""],
  ["last_name", ""],
  ["name", ""],
  ["role", 0],
  ["username", ""],
]);
export interface IPerson {
  id: number;
  name: string;
  last_name: string;
  birthdate: string | Date;
  gender: Gender;
  role: Roles | number;
}
export interface PersonRequestInterface {
  id?: number;
  name?: string;
  last_name?: string;
  birthdate?: string;
  gender?: Gender;
  role?: Roles;
}

export interface IPersonWithToken {
  id: number;
  name: string;
  last_name: string;
  birthdate: string;
  gender: Gender;
  role: Roles;
  jwt: string;
}

export type Persons = Map<string, PersonModel>;
