import { PersonModel } from "../../models/person_model/person_model";
import { Gender } from "../../models/person_model/types";
import Card, { ICard } from "../Card/card_class";

export default class StudentCard extends Card {
  constructor(
    student: PersonModel,
    action?: ((card: ICard) => Promise<void>) | undefined
  ) {
    super({
      title: "",
      content: `${student.name} ${student.last_name}`,
      img: StudentCard.genderPng[student.gender],
      action: action,
    });
    this.gender = student.gender;
  }
  static genderPng: {
    [key: string]: string;
  } = { male: "src/assets/male.png", female: "src/assets/female.png" };
  gender: Gender;
}
