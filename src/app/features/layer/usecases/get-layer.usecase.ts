import { Result, ResultDto } from "../../../shared/utils";
import { LayerRepository } from "../repository";

export class GetLayerUsecase {
  async execute(id: string): Promise<ResultDto> {
    const layerRepository = new LayerRepository();

    const layer = await layerRepository.verifyIfLayerExistsById(id);

    if (!layer) return Result.error(400, "Camadas não encontradas.");

    return Result.success(
      200,
      "Camadas encontradas com sucesso.",
      layer.toJson()
    );
  }
}
