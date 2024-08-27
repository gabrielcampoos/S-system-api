import { Result, ResultDto } from "../../../shared/utils";
import { ProjectRepository } from "../repository";

export class ListAllProjectsUsecase {
  async execute(): Promise<ResultDto> {
    const projectRepository = new ProjectRepository();

    const projectDB = await projectRepository.listProjects();

    const project = projectDB.map((project) => project.toJson());

    return Result.success(200, "Projetos cadastrados.", project);
  }
}
