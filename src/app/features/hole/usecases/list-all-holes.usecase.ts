import { Result, ResultDto } from "../../../shared/utils";
import { ProjectRepository } from "../../projects/repository";
import { HoleRepository } from "../repository";

export class ListAllHolesUsecase {
  async execute(projectId: string): Promise<ResultDto> {
    if (!projectId) {
      return Result.error(400, "Project ID is missing.");
    }

    const projectRepository = new ProjectRepository();
    const holeRepository = new HoleRepository();

    const projectExists = await projectRepository.verifyIfProjectExistsById(
      projectId
    );

    if (!projectExists) {
      return Result.error(404, "Projeto não encontrado.");
    }

    const holeDB = await holeRepository.listHoles(projectId);

    const hole = holeDB.map((hole) => hole.toJson());

    return Result.success(200, "Furos cadastrados.", hole);
  }
}
