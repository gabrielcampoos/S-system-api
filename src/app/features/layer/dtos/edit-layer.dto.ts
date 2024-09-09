import { Profundity } from "../../../models";

export interface EditLayerDto {
  id: string;
  newData: {
    projectNumber?: number;
    hole?: string;
    code?: number;
    depth?: number;
    type?: string;
    description?: string;
    hatch?: string;
  };
}
