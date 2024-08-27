import { Result, ResultDto } from "../../../shared/utils";
import { ProjectRepository } from "../repository";

export class GetProjectUsecase {
  async execute(id: string): Promise<ResultDto> {
    const projectRepository = new ProjectRepository();

    const project = await projectRepository.verifyIfProjectExistsById(id);

    if (!project) return Result.error(400, "Projeto não encontrado.");

    return Result.success(
      200,
      "Projeto encontrado com sucesso.",
      project.toJson()
    );
  }
}
