import { Model } from "../../models/model";
import "reflect-metadata";
export function ModelAnnotation() {
  return (target: typeof Model) => {
    return target
  };
}
