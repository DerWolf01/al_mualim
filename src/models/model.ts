import { DataTransformController } from "../controller/data_transformer_controller/data_transformer_controller";
import { ModelTypeInterface } from "../controller/request_controller/request_controller";

export class Model {
  [key: string]: any;
}

export interface IModel {
  [key: string]: any;
  jsonToModel<ModelType extends Model, IModel extends {}>(
    // obj: ModelTypeInterface<ModelType, IModel>,
    jsonObject: IModel
    // modelProto: IModelProto
  ): Model;
}
export interface IModelProto {
  [key: string]: number | string | Array<Model>;
}
