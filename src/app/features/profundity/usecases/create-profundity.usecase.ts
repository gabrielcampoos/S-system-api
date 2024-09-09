import { Result, ResultDto } from "../../../shared/utils";
import { LayerRepository } from "../../layer/repository";
import { CreateProfundityDto } from "../dtos";
import { ProfundityRepository } from "../repository";

export class CreateProfundityUsecase {
  async execute(data: CreateProfundityDto[]): Promise<ResultDto> {
    const profundityRepository = new ProfundityRepository();

    try {
      const newProfundities = await profundityRepository.createProfundities(
        data
      );

      return Result.success(
        200,
        "Camadas criadas com sucesso.",
        newProfundities.map((profundity) => profundity.toJson())
      );
    } catch (error) {
      console.error("Error in CreateLayerUsecase:", error);
      return Result.error(500, "Erro ao criar camadas.");
    }
  }
}
