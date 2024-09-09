import { Result, ResultDto } from "../../../shared/utils";
import { ProfundityRepository } from "../repository";

export class DeleteProfundityUsecase {
  async execute(id: string): Promise<ResultDto> {
    const profundityRepository = new ProfundityRepository();

    const profundityExists =
      await profundityRepository.verifyIfProfundityExistsById(id);

    if (!profundityExists)
      return Result.error(
        400,
        "Camadas não encontradas. Não foi possível excluir."
      );

    await profundityRepository.deleteProfundity(id);

    return Result.success(200, "Camadas excluidas com sucesso.", id);
  }
}
