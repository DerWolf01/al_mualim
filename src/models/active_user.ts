import { PageRouter } from "../page_router/page_router";
import { PersonModel } from "./person_model/person_model";
import { IPerson } from "./person_model/types";

export class User extends PersonModel {
  private constructor(data: IPerson, isAuthenticated: boolean = false) {
    super(data);
    this.isAuthenticated = isAuthenticated;
  }

  private isAuthenticated = false;
  private static instance?: User;

  static initUser(data: IPerson): User {
    this.instance = new User(data);
    return this.instance;
  }

  public static async getUser() {
    if (!this.instance) {
      PageRouter.getInstance?.authenticate();
    }
    return this.instance;
  }

  public static async getAuthStatus() {
    return (await this.getUser())?.isAuthenticated;
  }
}
