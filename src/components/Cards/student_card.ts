import { PersonModel } from "../../models/person_model/person_model";
import { Gender } from "../../models/person_model/types";
import Card from "../Card/card_class";

export default class StudentCard extends Card {
  constructor(student: PersonModel) {
    super({
      title: StudentCard.genderPng[student.gender],
      content: `${student.name} ${student.last_name}`,
      img: true,
    });
    this.gender = student.gender;
  }
  static genderPng: {
    [key: string]: string;
  } = { male: "src/assets/male.png", female: "src/assets/female.png" };
  gender: Gender;
}
