import { Profundity } from "../../../models";

export interface EditProfundityDto {
  id: string;
  newData: {
    profundity0?: number;
    spt?: number;
    hit1?: number;
    profundity1?: number;
    hit2?: number;
    profundity2?: number;
    hit3?: number;
    profundity3?: number;
  };
}
