import { Result, ResultDto } from "../../../shared/utils";
import { HoleRepository } from "../../hole/repository";
import { LayerRepository } from "../../layer/repository";
import { ProfundityRepository } from "../repository";

export class ListAllProfunditiesUsecase {
  async execute(): Promise<ResultDto> {
    const profundityRepository = new ProfundityRepository();

    const profundityDB = await profundityRepository.listProfundities();

    const profundity = profundityDB.map((profundity) => profundity.toJson());

    return Result.success(200, "Camadas cadastradas.", profundity);
  }
}
