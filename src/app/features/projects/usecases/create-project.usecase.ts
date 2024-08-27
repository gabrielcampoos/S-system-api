import { Result, ResultDto } from "../../../shared/utils";
import { CreateProjectDto } from "../dtos";
import { ProjectRepository } from "../repository";

export class CreateProjectUsecase {
  async execute(data: CreateProjectDto): Promise<ResultDto> {
    const projectRepository = new ProjectRepository();

    const newProject = await projectRepository.create(data);

    return Result.success(
      200,
      "Projeto criado com sucesso.",
      newProject.toJson()
    );
  }
}
