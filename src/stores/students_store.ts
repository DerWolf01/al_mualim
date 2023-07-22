import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { IStudent, Student, Students } from "../models/students";

export const useStudentsStore = defineStore({
  id: "students",
  state: () => ({
    students: useStorage<Map<string, IStudent>>("students", new Map()),
  }),
  getters: {
    getStudents(state): Student[] {
      const res: Student[] = [];
      const students = state.students as Students;
      for (let s in students) {
        const student = students.get(s);
        if (!student) {
          continue;
        }
        res.push(new Student(student));
      }
      return res;
    },
  },
  actions: {
    addStudent(student: IStudent | Student) {
      this.students.set(Date.now().toString(), student);
    },
  },
});
