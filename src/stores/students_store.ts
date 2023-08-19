import { defineStore } from "pinia";
import { IPerson, PersonModel, Role, Persons } from "../models/person_model/person_model";

export const useStudentsStore = defineStore({
  id: "persons",
  state: () => ({
    persons: [] as PersonModel[],
  }),
  getters: {
    async getStudents(state): Promise<PersonModel[]> {
      state.persons = await PersonModel.studentsFromServer();
      return state.persons;
    },
  },
  actions: {
    addStudent(student: PersonModel) {
      this.persons.push(student);
    },
  },
});
