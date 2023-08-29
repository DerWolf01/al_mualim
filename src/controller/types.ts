export const SERVER = "http://localhost:1337/http://localhost:1335";

export enum ServerPaths {
  PERSONS = "/person",
  ADD_PERSON = "/person/add",
  LOGIN = "/auth/signIn",
  AUTHENTICATE = "/auth/authenthicate",
}

export enum CourseServerPaths {
  GET_COURSES_PARTIAL = "/course/partial",
  GET_COURSES = "/course",
  ADD_PERSON_TO_COURSE = "/course/add/person",
  GET_STUDENTS = "/course/students",
  GET_TEACHERS = "/course/teachers",
}
export enum Methods {
  GET = "GET",
  POST = "POST",
}
