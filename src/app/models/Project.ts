// Project.ts
import { UpdateHoleDto } from "../features/hole/dtos";
import { Base } from "./Base";
import { Hole, HoleJson } from "./Hole";
import { User } from "./User"; // Certifique-se de ter a importação correta

export interface ProjectJson {
  id: string;
  projectNumber: string;
  client: string;
  projectAlphanumericNumber: string;
  workDescription: string;
  workSite: string;
  releaseDate: Date;
  initialDate: Date;
  finalDate: Date;
  headerText: string;
  holes: HoleJson[];
}

interface EditProjectDto {
  projectNumber?: string;
  client?: string;
  projectAlphanumericNumber?: string;
  workDescription?: string;
  workSite?: string;
  releaseDate?: Date;
  initialDate?: Date;
  finalDate?: Date;
  headerText?: string;
}

export class Project extends Base {
  private _holes: Hole[] = [];
  private _user: User; // Adicionando a propriedade para o usuário

  constructor(
    _id: string,
    private _projectNumber: string,
    private _client: string,
    private _projectAlphanumericNumber: string,
    private _workDescription: string,
    private _workSite: string,
    private _releaseDate: Date = Project.getCurrentDate(),
    private _initialDate: Date = Project.getCurrentDate(),
    private _finalDate: Date = Project.getCurrentDate(),
    private _headerText: string,
    user: User // Adicionando usuário ao construtor
  ) {
    super(_id);
    this._user = user; // Inicializando o usuário
  }

  private static getCurrentDate(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  getId(): string {
    return this._id;
  }

  public getUserId(): string {
    if (!this._user) {
      throw new Error("User is not defined.");
    }
    return this._user.getId();
  }

  public addHole(hole: Hole): void {
    this._holes.push(hole);
  }

  public removeHole(holeId: string): boolean {
    const index = this._holes.findIndex((hole) => hole.getId() === holeId);
    if (index !== -1) {
      this._holes.splice(index, 1);
      return true;
    }
    return false;
  }

  public listHoles(): Hole[] {
    return this._holes;
  }

  public editHole(holeId: string, data: Partial<UpdateHoleDto>): boolean {
    const hole = this._holes.find((hole) => hole.getId() === holeId);
    if (hole) {
      return hole.editHole(data);
    }
    return false;
  }

  public toJson(): ProjectJson {
    return {
      id: this._id,
      projectNumber: this._projectNumber,
      client: this._client,
      projectAlphanumericNumber: this._projectAlphanumericNumber,
      workDescription: this._workDescription,
      workSite: this._workSite,
      releaseDate: this._releaseDate,
      initialDate: this._initialDate,
      finalDate: this._finalDate,
      headerText: this._headerText,
      holes: this._holes.map((hole) => hole.toJson()),
    };
  }

  public editProject(data: EditProjectDto): boolean {
    if (data.projectNumber) {
      if (data.projectNumber?.length < 0) {
        return false;
      }
      this._projectNumber = data.projectNumber;
    }

    if (data.client) {
      if (data.client?.length < 0) {
        return false;
      }
      this._client = data.client;
    }

    if (data.projectAlphanumericNumber) {
      if (data.projectAlphanumericNumber?.length < 0) {
        return false;
      }
      this._projectAlphanumericNumber = data.projectAlphanumericNumber;
    }

    if (data.workDescription) {
      if (data.workDescription?.length < 0) {
        return false;
      }
      this._workDescription = data.workDescription;
    }

    if (data.workSite) {
      if (data.workSite?.length < 0) {
        return false;
      }
      this._workSite = data.workSite;
    }

    if (data.releaseDate) {
      if (data.releaseDate === null) {
        return false;
      }
      this._releaseDate = data.releaseDate;
    }

    if (data.initialDate) {
      if (data.initialDate === null) {
        return false;
      }
      this._initialDate = data.initialDate;
    }

    if (data.finalDate) {
      if (data.finalDate === null) {
        return false;
      }
      this._finalDate = data.finalDate;
    }

    if (data.headerText) {
      if (data.headerText?.length < 0) {
        return false;
      }
      this._headerText = data.headerText;
    }

    return true;
  }
}
