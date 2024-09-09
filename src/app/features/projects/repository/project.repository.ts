import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Hole, Project, User } from "../../../models";
import {
  HoleEntity,
  ProjectEntity,
  UserEntity,
} from "../../../shared/entities";
import { UpdateHoleDto } from "../../hole/dtos";
import { CreateProjectDto, UpdateProjectDto } from "../dtos";

export class ProjectRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfProjectExistsById(id: string): Promise<Project | null> {
    const projectExists = await this._manager.findOne(ProjectEntity, {
      where: { id },
      relations: ["user"],
    });

    if (!projectExists) return null;

    const user = new User(projectExists.user.id, projectExists.user.username);
    return new Project(
      projectExists.id,
      projectExists.projectNumber,
      projectExists.client,
      projectExists.projectAlphanumericNumber,
      projectExists.workDescription,
      projectExists.workSite,
      projectExists.releaseDate,
      projectExists.initialDate,
      projectExists.finalDate,
      projectExists.headerText,
      user
    );
  }

  async createProject(
    userId: string,
    projectData: CreateProjectDto
  ): Promise<Project> {
    const user = await this._manager.findOne(UserEntity, {
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const project = this._manager.create(ProjectEntity, {
      ...projectData,
      user,
    });
    const createdProject = await this._manager.save(project);
    return this.entityToModel(createdProject);
  }

  async listProjects(userId: string): Promise<Project[]> {
    if (!userId) {
      throw new Error("User ID is missing.");
    }

    const listProjects = await this._manager.find(ProjectEntity, {
      where: { user: { id: userId } },
      relations: ["user", "holes"],
    });

    return listProjects.map((project) => this.entityToModel(project));
  }

  async editProjectAndHoles(
    userId: string,
    data: UpdateProjectDto
  ): Promise<Project | null> {
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

    const existingProject = await this._manager.findOne(ProjectEntity, {
      where: { id },
      relations: ["holes", "user"],
    });

    if (!existingProject) {
      throw new Error(`Project with ID ${id} not found`);
    }

    if (existingProject.user.id !== userId) {
      throw new Error(
        `User with ID ${userId} is not authorized to edit this project`
      );
    }

    await this._manager.update(ProjectEntity, id, {
      projectNumber,
      client,
      projectAlphanumericNumber,
      workDescription,
      workSite,
      releaseDate,
      initialDate,
      finalDate,
      headerText,
    });

    const updatedProject = await this._manager.findOne(ProjectEntity, {
      where: { id },
      relations: ["holes", "user"],
    });

    return updatedProject ? this.entityToModel(updatedProject) : null;
  }

  async deleteProject(id: string): Promise<void> {
    const existingProject = await this._manager.findOne(ProjectEntity, {
      where: { id },
      relations: ["holes"],
    });
    if (!existingProject) {
      throw new Error(`Project with ID ${id} not found`);
    }

    if (existingProject.holes.length > 0) {
      await this._manager.delete(
        HoleEntity,
        existingProject.holes.map((hole) => hole.id)
      );
    }

    await this._manager.delete(ProjectEntity, id);
  }

  async deleteHoles(holeIds: string[]): Promise<void> {
    await this._manager.delete(HoleEntity, holeIds);
  }

  private entityToModel(dataDB: ProjectEntity): Project {
    const user = new User(dataDB.user.id, dataDB.user.username);
    const project = new Project(
      dataDB.id,
      dataDB.projectNumber,
      dataDB.client,
      dataDB.projectAlphanumericNumber,
      dataDB.workDescription,
      dataDB.workSite,
      dataDB.releaseDate,
      dataDB.initialDate,
      dataDB.finalDate,
      dataDB.headerText,
      user
    );

    if (Array.isArray(dataDB.holes)) {
      dataDB.holes.forEach((holeEntity) => {
        const hole = new Hole(
          holeEntity.id,
          holeEntity.holeNumber,
          holeEntity.initialDate,
          holeEntity.finalDate,
          holeEntity.name,
          holeEntity.workDescription,
          holeEntity.quota,
          holeEntity.waterLevel,
          holeEntity.interval,
          holeEntity.waterLevelTwo,
          holeEntity.intervalTwo,
          holeEntity.torque,
          holeEntity.coating,
          holeEntity.ultimateDigger,
          holeEntity.initialHelical,
          holeEntity.finalHelical,
          holeEntity.printSpt,
          holeEntity.stop,
          holeEntity.textPoll,
          holeEntity.prober,
          holeEntity.pageLines
        );

        project.addHole(hole);
      });
    }

    return project;
  }
}
