import { Profundity } from "../../../models";

export interface UpdateLayerDto {
  id: string;
  projectNumber: number;
  hole: string;
  code: number;
  depth: number;
  type: string;
  description: string;
  hatch: string;
}
