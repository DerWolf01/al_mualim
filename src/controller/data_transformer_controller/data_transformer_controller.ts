import { Controller } from "..";
import { IModelProto, Model } from "../../models/model";
import { ModelTypeInterface } from "../request_controller/request_controller";
type NonMethodKeys<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];
type TypeOf<T> = T extends boolean
  ? "boolean"
  : T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends Model
  ? "model"
  : "object" | (new (...args: any[]) => T);

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
  static jsonToModel<ModelType extends Model, IModel extends {}>(
    obj:Model,
    jsonObject: IModel,
    modelProto: IModelProto
  ): ModelType {
    let final_obj: { [key: string]: any } = jsonObject;
    for (let protoKey of Object.keys(modelProto)) {
      const protoEntry: string | number | Model[] | Model =
        modelProto[protoKey];

      if (protoEntry instanceof Array && this.isModel(protoEntry[0])) {
        var newJsonModelArrayEntry = [];
        for (let jsonObjectModelEntry of final_obj[protoKey]) {
          
          let inst = (protoEntry[0] as Model)["jsonToModel"](
            jsonObjectModelEntry
          );
          
          newJsonModelArrayEntry.push(inst);
        }
        final_obj[protoKey] = newJsonModelArrayEntry;
      }
      if (this.isModel(protoEntry) && !(protoEntry instanceof Array)) {
        final_obj[protoKey] = (protoEntry as Model)["jsonToModel"](
          final_obj[protoKey]
        );
      }
    }
    //@ts-ignore
    return new obj(jsonObject);
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

  static isModel(comparable: any): boolean {
    return comparable.prototype instanceof Model;
  }
  static getFields<T>(fields: {
    [P in NonMethodKeys<T>]: TypeOf<T[P]>;
  }): typeof fields {
    return fields;
  }
}
