import { Roles } from "../../models/person_model/types";

export class RolesController {
  static getRoleByNumber(role: number): Roles {
    let res: Roles;

    if (role == 2) {
      res = Roles.ADMIN_ROLE;
      return res;
    } else if (role == 1) {
      res = Roles.TEACHER_ROLE;
      return res;
    }
    res = Roles.STUDENT_ROLE;
    return res;
  }

  static getRoleName(role: Roles) {
    return Roles[role];
  }
}
