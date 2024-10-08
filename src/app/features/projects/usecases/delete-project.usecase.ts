import { Result, ResultDto } from "../../../shared/utils";
import { ProjectRepository } from "../repository";

export class DeleteProjectUsecase {
  async execute(id: string): Promise<ResultDto> {
    const projectRepository = new ProjectRepository();

    try {
      const projectExists = await projectRepository.verifyIfProjectExistsById(
        id
      );

      if (!projectExists) {
        return Result.error(
          400,
          "Projeto não encontrado. Não foi possível excluir."
        );
      }

      await projectRepository.deleteProject(id);

      return Result.success(200, "Projeto excluído com sucesso.", id);
    } catch (error: any) {
      return Result.error(500, `Erro ao excluir o projeto: ${error.message}`);
    }
  }
}
