import { Profundity } from "../../../models";
import { Result, ResultDto } from "../../../shared/utils";
import { EditLayerDto } from "../dtos";
import { LayerRepository } from "../repository";

export class EditLayerUsecase {
  async execute(data: EditLayerDto): Promise<ResultDto> {
    const { id, newData } = data;

    const layerRepository = new LayerRepository();

    const layerExists = await layerRepository.verifyIfLayerExistsById(id);

    if (!layerExists) return Result.error(400, "Camada não encontrada.");

    const layerUpdate = layerExists.editLayer({
      projectNumber: newData.projectNumber,
      hole: newData.hole,
      code: newData.code,
      depth: newData.depth,
      type: newData.type,
      description: newData.description,
      hatch: newData.hatch,
    });

    if (!layerUpdate) return Result.error(400, "Camada não pode ser editada.");

    const layerJson = layerExists.toJson();

    await layerRepository.editLayer({
      id,
      projectNumber: layerJson.projectNumber,
      hole: layerJson.hole,
      code: layerJson.code,
      depth: layerJson.depth,
      type: layerJson.type,
      description: layerJson.description,
      hatch: layerJson.hatch,
    });

    return Result.success(200, "Camada editada com sucesso.", layerJson);
  }
}
