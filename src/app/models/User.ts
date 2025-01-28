import { Base } from "./Base";
import { Project, ProjectJson } from "./Project";

export interface UserJson {
  id: string;
  username: string;
  projects: ProjectJson[];
  createdAt: string; // Adicionando o campo `createdAt` no JSON
}

interface EditUserDto {
  name?: string;
}

export class User extends Base {
  private _projects: Project[] = [];
  private _createdAt: Date; // Campo para armazenar a data de criação

  constructor(_id: string, private _username: string, createdAt?: Date) {
    super(_id);
    this._createdAt = createdAt || new Date(); // Define a data de criação (ou usa a atual)
  }

  public toJson(): UserJson {
    return {
      id: this._id,
      username: this._username,
      projects: this._projects.map((project) => project.toJson()),
      createdAt: this._createdAt.toISOString(), // Formata para ISO 8601
    };
  }

  getId(): string {
    return this._id;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  editUser(data: EditUserDto): boolean {
    if (data.name) {
      if (data.name?.length === 0) {
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
