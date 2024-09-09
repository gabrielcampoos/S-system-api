import { Result, ResultDto } from "../../../shared/utils";
import { LayerRepository } from "../repository";

export class DeleteLayerUsecase {
  async execute(id: string): Promise<ResultDto> {
    const layerRepository = new LayerRepository();

    const layerExists = await layerRepository.verifyIfLayerExistsById(id);

    if (!layerExists)
      return Result.error(
        400,
        "Camadas não encontradas. Não foi possível excluir."
      );

    await layerRepository.deleteLayer(id);

    return Result.success(200, "Camadas excluidas com sucesso.", id);
  }
}
