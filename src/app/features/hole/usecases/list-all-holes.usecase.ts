import { Result, ResultDto } from "../../../shared/utils";
import { HoleRepository } from "../repository";

export class ListAllHolesUsecase {
  async execute(): Promise<ResultDto> {
    const holeRepository = new HoleRepository();

    const holeDB = await holeRepository.listHoles();

    const hole = holeDB.map((hole) => hole.toJson());

    return Result.success(200, "Furos cadastrados.", hole);
  }
}
