import { Profundity } from "../../../models";

export interface CreateLayerDto {
  id?: string;
  projectNumber: number;
  hole: string;
  code: number;
  depth: number;
  type: string;
  description: string;
  hatch: string;
}
