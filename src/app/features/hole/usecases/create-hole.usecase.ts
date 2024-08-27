import { Result, ResultDto } from "../../../shared/utils";
import { CreateHoleDto } from "../dtos";
import { HoleRepository } from "../repository";

export class CreateHoleUsecase {
  async execute(data: CreateHoleDto): Promise<ResultDto> {
    const holeRepository = new HoleRepository();

    const newHole = await holeRepository.create(data);

    return Result.success(200, "Furos criados com sucesso.", newHole.toJson());
  }
}
