import { Result, ResultDto } from "../../../shared/utils";
import { HoleRepository } from "../repository";

export class GetHoleUsecase {
  async execute(id: string): Promise<ResultDto> {
    const holeRepository = new HoleRepository();

    const hole = await holeRepository.verifyIfHoleExistsById(id);

    if (!hole) return Result.error(400, "Furos não encontrados.");

    return Result.success(200, "Furos encontrados com sucesso.", hole.toJson());
  }
}
