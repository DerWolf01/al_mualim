export type Gender = "male" | "female";
export interface IStudent {
  name: string;
  last_name: string;
  birth_date: string;
  gender: Gender;
}

export class Student implements IStudent {
  constructor(data: IStudent) {
    const { name, last_name, birth_date, gender } = data;
    this.name = name;
    this.last_name = last_name;
    this.birth_date = birth_date;
    this.gender = gender;
  }
  name: string;
  last_name: string;
  birth_date: string;
  gender: Gender;



}

export type Students = Map<string, IStudent>;
