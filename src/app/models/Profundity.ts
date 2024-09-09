import { Base } from "./Base";

export interface ProfundityJson {
  id: string;
  profundity0?: number;
  spt?: number;
  hit1?: number;
  profundity1?: number;
  hit2?: number;
  profundity2?: number;
  hit3?: number;
  profundity3?: number;
}

export interface EditProfundityDto {
  profundity0?: number;
  spt?: number;
  hit1?: number;
  profundity1?: number;
  hit2?: number;
  profundity2?: number;
  hit3?: number;
  profundity3?: number;
}

export class Profundity extends Base {
  constructor(
    _id: string,
    public _profundity0?: number,
    public _spt?: number,
    public _hit1?: number,
    public _profundity1?: number,
    public _hit2?: number,
    public _profundity2?: number,
    public _hit3?: number,
    public _profundity3?: number
  ) {
    super(_id);
  }

  public static fromJson(json: ProfundityJson): Profundity {
    return new Profundity(
      json.id,
      json.profundity0,
      json.spt,
      json.hit1,
      json.profundity1,
      json.hit2,
      json.profundity2,
      json.hit3,
      json.profundity3
    );
  }

  public toJson(): ProfundityJson {
    return {
      id: this._id,
      profundity0: this._profundity0,
      spt: this._spt,
      hit1: this._hit1,
      profundity1: this._profundity1,
      hit2: this._hit2,
      profundity2: this._profundity2,
      hit3: this._hit3,
      profundity3: this._profundity3,
    };
  }

  public editProfundity(data: EditProfundityDto): boolean {
    const {
      profundity0,
      spt,
      hit1,
      profundity1,
      hit2,
      profundity2,
      hit3,
      profundity3,
    } = data;

    if (profundity0 !== undefined) {
      this._profundity0 = profundity0;
    }
    if (spt !== undefined) {
      this._spt = spt;
    }
    if (hit1 !== undefined) {
      this._hit1 = hit1;
    }
    if (profundity1 !== undefined) {
      this._profundity1 = profundity1;
    }
    if (hit2 !== undefined) {
      this._hit2 = hit2;
    }
    if (profundity2 !== undefined) {
      this._profundity2 = profundity2;
    }
    if (hit3 !== undefined) {
      this._hit3 = hit3;
    }
    if (profundity3 !== undefined) {
      this._profundity3 = profundity3;
    }

    return true;
  }

  public getId(): string {
    return this._id;
  }
}
