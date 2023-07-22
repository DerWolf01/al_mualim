import { Gender, Student } from "../../models/students";
import Card from "../Card/card_class";

export default class StudentCard extends Card {
  constructor(student: Student) {
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
