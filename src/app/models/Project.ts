import { Base } from "./Base";

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
    private _headerText: string
  ) {
    super(_id);
  }

  private static getCurrentDate(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
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
    };
  }

  editProject(data: EditProjectDto): boolean {
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
