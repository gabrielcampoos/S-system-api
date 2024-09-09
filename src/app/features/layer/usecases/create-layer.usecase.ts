import { Result, ResultDto } from "../../../shared/utils";
import { HoleRepository } from "../../hole/repository";
import { CreateLayerDto } from "../dtos";
import { LayerRepository } from "../repository";

export class CreateLayerUsecase {
  async execute(holeId: string, data: CreateLayerDto[]): Promise<ResultDto> {
    const layerRepository = new LayerRepository();
    const holeRepository = new HoleRepository();

    try {
      // Verifique se o buraco existe antes de criar camadas
      const holeExists = await holeRepository.verifyIfHoleExistsById(holeId);

      if (!holeExists) return Result.error(400, "Buraco não encontrado.");

      console.log("Data passed to createLayersForHole:", data);

      const newLayers = await layerRepository.createLayersForHole(holeId, data);

      return Result.success(
        200,
        "Camadas criadas com sucesso.",
        newLayers.map((layer) => layer.toJson())
      );
    } catch (error) {
      console.error("Error in CreateLayerUsecase:", error);
      return Result.error(500, "Erro ao criar camadas.");
    }
  }
}
