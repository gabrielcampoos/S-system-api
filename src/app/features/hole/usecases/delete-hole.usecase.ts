import { Result, ResultDto } from "../../../shared/utils";
import { HoleRepository } from "../repository";

export class DeleteHoleUsecase {
  async execute(id: string): Promise<ResultDto> {
    const holeRepository = new HoleRepository();

    const holeExists = await holeRepository.verifyIfHoleExistsById(id);

    if (!holeExists)
      return Result.error(
        400,
        "Furos não encontrados. Não foi possível excluir."
      );

    await holeRepository.deleteHole(id);

    return Result.success(200, "Furos excluidos com sucesso.", id);
  }
}
