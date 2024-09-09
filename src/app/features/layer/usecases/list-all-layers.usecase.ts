import { Result, ResultDto } from "../../../shared/utils";
import { HoleRepository } from "../../hole/repository";
import { LayerRepository } from "../repository";

export class ListAllLayersUsecase {
  async execute(holeId: string): Promise<ResultDto> {
    const holeRepository = new HoleRepository();
    const layerRepository = new LayerRepository();

    const holeExists = await holeRepository.verifyIfHoleExistsById(holeId);

    if (!holeExists) return Result.error(404, "Furo não encontrado.");

    const layerDB = await layerRepository.listLayers(holeId);

    const layer = layerDB.map((layer) => layer.toJson());

    return Result.success(200, "Camadas cadastradas.", layer);
  }
}
