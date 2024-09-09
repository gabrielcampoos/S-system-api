import { Result, ResultDto } from "../../../shared/utils";
import { CreateHoleDto } from "../dtos";
import { HoleRepository } from "../repository";

export class CreateHoleUsecase {
  async execute(projectId: string, data: CreateHoleDto[]): Promise<ResultDto> {
    const holeRepository = new HoleRepository();

    if (!Array.isArray(data)) {
      return Result.error(400, "Dados dos furos inválidos.");
    }

    try {
      const newHoles = await holeRepository.createHolesForProject(
        projectId,
        data
      );

      if (!newHoles) {
        throw new Error("Nenhum furo foi criado.");
      }

      return Result.success(
        200,
        "Furos criados com sucesso.",
        newHoles.map((hole) => hole.toJson())
      );
    } catch (error) {
      console.error("Error in CreateHoleUsecase:", error);
      return Result.error(500, "Erro ao criar furos.");
    }
  }
}
