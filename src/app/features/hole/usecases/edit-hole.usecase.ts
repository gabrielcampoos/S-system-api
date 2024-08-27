import { Result, ResultDto } from "../../../shared/utils";
import { EditHoleDto } from "../dtos";
import { HoleRepository } from "../repository";

export class EditHoleUsecase {
  async execute(data: EditHoleDto): Promise<ResultDto> {
    const { id, newData } = data;

    const holeRepository = new HoleRepository();

    const holeExists = await holeRepository.verifyIfHoleExistsById(id);

    if (!holeExists) return Result.error(400, "Furo não encontrado.");

    const holeUpdate = holeExists.editHole({
      holeNumber: newData.holeNumber,
      initialDate: newData.initialDate,
      finalDate: newData.finalDate,
      name: newData.name,
      workDescription: newData.workDescription,
      quota: newData.quota,
      waterLevel: newData.waterLevel,
      interval: newData.interval,
      waterLevelTwo: newData.waterLevelTwo,
      intervalTwo: newData.intervalTwo,
      torque: newData.torque,
      coating: newData.coating,
      ultimateDigger: newData.ultimateDigger,
      initialHelical: newData.initialHelical,
      finalHelical: newData.finalHelical,
      printSpt: newData.printSpt,
      stop: newData.stop,
      textPoll: newData.textPoll,
      prober: newData.prober,
      pageLines: newData.pageLines,
    });

    if (!holeUpdate) return Result.error(400, "Furo não pode ser editado.");

    const holeJson = holeExists.toJson();

    await holeRepository.editHole({
      id,
      holeNumber: holeJson.holeNumber,
      initialDate: holeJson.initialDate,
      finalDate: holeJson.finalDate,
      name: holeJson.name,
      workDescription: holeJson.workDescription,
      quota: holeJson.quota,
      waterLevel: holeJson.waterLevel,
      interval: holeJson.interval,
      waterLevelTwo: holeJson.waterLevelTwo,
      intervalTwo: holeJson.intervalTwo,
      torque: holeJson.torque,
      coating: holeJson.coating,
      ultimateDigger: holeJson.ultimateDigger,
      initialHelical: holeJson.initialHelical,
      finalHelical: holeJson.finalHelical,
      printSpt: holeJson.printSpt,
      stop: holeJson.stop,
      textPoll: holeJson.textPoll,
      prober: holeJson.prober,
      pageLines: holeJson.pageLines,
    });

    return Result.success(200, "Furo editado com sucesso.", holeJson);
  }
}
