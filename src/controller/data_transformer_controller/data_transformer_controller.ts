import { Controller } from "..";
import { Model } from "../../models/model";

export class DataTransformController extends Controller {
  static modelToJson(obj: Model) {
    let res: { [key: string]: string | number } = {};
    for (let key of Object.keys(obj)) {
      if (!obj[key]) {
        continue;
      }
      res[key] = obj[key];
    }
    return JSON.stringify(res);
  }
  static responseIsValid(
    res: { [key: string]: any },
    compareTo: Map<string, any>
  ) {
    let isValid = true;
    for (var key of Object.keys(res)) {
      if (typeof res[key] !== typeof compareTo.get(key)) {
        isValid = false;
      }
    }
    return isValid;
  }
}
