import { AuthController } from "../../controller/auth/auth_controller";
import { Model } from "../model";

export class AuthRequestModel extends Model {
  constructor(token: string | null = AuthController.getToken()) {
    super();
    this.token = token;
  }
  token: string | null;
}
