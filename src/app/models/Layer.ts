import { Base } from "./Base";
import { Profundity, ProfundityJson } from "./Profundity";

export interface LayerJson {
  id: string;
  projectNumber: number;
  hole: string;
  code: number;
  depth: number;
  type: string;
  description: string;
  hatch: string;
}

interface EditLayerDto {
  projectNumber?: number;
  hole?: string;
  code?: number;
  depth?: number;
  type?: string;
  description?: string;
  hatch?: string;
}

export class Layer extends Base {
  constructor(
    _id: string,
    private _projectNumber: number,
    private _hole: string,
    private _code: number,
    private _depth: number,
    private _type: string,
    private _description: string,
    private _hatch: string
  ) {
    super(_id);
  }

  public static fromJson(json: LayerJson): Layer {
    return new Layer(
      json.id,
      json.projectNumber,
      json.hole,
      json.code,
      json.depth,
      json.type,
      json.description,
      json.hatch
    );
  }

  public toJson(): LayerJson {
    return {
      id: this._id,
      projectNumber: this._projectNumber,
      hole: this._hole,
      code: this._code,
      depth: this._depth,
      type: this._type,
      description: this._description,
      hatch: this._hatch,
    };
  }

  public editLayer(data: EditLayerDto): boolean {
    const { projectNumber, hole, code, depth, type, description, hatch } = data;

    if (projectNumber !== undefined) {
      this._projectNumber = projectNumber;
    }
    if (hole !== undefined) {
      this._hole = hole;
    }
    if (code !== undefined) {
      this._code = code;
    }

    if (depth !== undefined) {
      this._depth = depth;
    }

    if (type !== undefined) {
      this._type = type;
    }
    if (description !== undefined) {
      this._description = description;
    }
    if (hatch !== undefined) {
      this._hatch = hatch;
    }

    return true;
  }

  public getId(): string {
    return this._id;
  }
}
