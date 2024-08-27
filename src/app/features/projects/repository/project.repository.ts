import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Project } from "../../../models";
import { ProjectEntity } from "../../../shared/entities";
import { CreateProjectDto, UpdateProjectDto } from "../dtos";

export class ProjectRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfProjectExistsById(id: string): Promise<Project | null> {
    const projectExists = await this._manager.findOneBy(ProjectEntity, {
      id,
    });

    if (!projectExists) return null;

    return this.entityToModel(projectExists);
  }

  async create(project: CreateProjectDto): Promise<Project> {
    const createProject = this._manager.create(ProjectEntity, { ...project });

    const createdProject = await this._manager.save(createProject);

    return this.entityToModel(createdProject);
  }

  async listProjects(): Promise<Project[]> {
    const listProjects = await this._manager.find(ProjectEntity);

    return listProjects.map((project) => this.entityToModel(project));
  }

  async editProject(data: UpdateProjectDto): Promise<void> {
    const {
      id,
      projectNumber,
      client,
      projectAlphanumericNumber,
      workDescription,
      workSite,
      releaseDate,
      initialDate,
      finalDate,
      headerText,
    } = data;

    await this._manager.update(
      ProjectEntity,
      { id: id },
      {
        projectNumber,
        client,
        projectAlphanumericNumber,
        workDescription,
        workSite,
        releaseDate,
        initialDate,
        finalDate,
        headerText,
      }
    );
  }

  async deleteProject(id: string): Promise<void> {
    const project = await this._manager.delete(ProjectEntity, { id: id });

    if (!project) return undefined;
  }

  private entityToModel(dataDB: ProjectEntity): Project {
    return new Project(
      dataDB.id,
      dataDB.projectNumber,
      dataDB.client,
      dataDB.projectAlphanumericNumber,
      dataDB.workDescription,
      dataDB.workSite,
      dataDB.releaseDate,
      dataDB.initialDate,
      dataDB.finalDate,
      dataDB.headerText
    );
  }
}
