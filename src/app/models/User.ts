import { Base } from "./Base";
import { Project, ProjectJson } from "./Project";

export interface UserJson {
  id: string;
  username: string;
  projects: ProjectJson[];
}

interface EditUserDto {
  name?: string;
}

export class User extends Base {
  private _projects: Project[] = [];

  constructor(_id: string, private _username: string) {
    super(_id);
  }

  public toJson(): UserJson {
    return {
      id: this._id,
      username: this._username,
      projects: this._projects.map((project) => project.toJson()),
    };
  }

  getId(): string {
    return this._id;
  }

  editUser(data: EditUserDto): boolean {
    if (data.name) {
      if (data.name?.length > 0) {
        return false;
      }

      this._username = data.name;
    }

    return true;
  }

  addProject(project: Project): void {
    this._projects.push(project);
  }

  removeProject(projectId: string): boolean {
    const index = this._projects.findIndex(
      (project) => project.getId() === projectId
    );
    if (index !== -1) {
      this._projects.splice(index, 1);
      return true;
    }
    return false;
  }

  getProjects(): Project[] {
    return this._projects;
  }
}
