import { Result, ResultDto } from "../../../shared/utils";
import { EditProfundityDto } from "../dtos";
import { ProfundityRepository } from "../repository";

export class EditProfundityUsecase {
  async execute(data: EditProfundityDto): Promise<ResultDto> {
    const { id, newData } = data;

    const profundityRepository = new ProfundityRepository();

    const profundityExists =
      await profundityRepository.verifyIfProfundityExistsById(id);

    if (!profundityExists) return Result.error(400, "Camada não encontrada.");

    const profundityUpdate = profundityExists.editProfundity({
      profundity0: newData.profundity0,
      spt: newData.spt,
      hit1: newData.hit1,
      profundity1: newData.profundity1,
      hit2: newData.hit2,
      profundity2: newData.profundity2,
      hit3: newData.hit3,
      profundity3: newData.profundity3,
    });

    if (!profundityUpdate)
      return Result.error(400, "Camada não pode ser editada.");

    const profundityJson = profundityExists.toJson();

    await profundityRepository.editProfundity({
      id,
      profundity0: profundityJson.profundity0,
      spt: profundityJson.spt,
      hit1: profundityJson.hit1,
      profundity1: profundityJson.profundity1,
      hit2: profundityJson.hit2,
      profundity2: profundityJson.profundity2,
      hit3: profundityJson.hit3,
      profundity3: profundityJson.profundity3,
    });

    return Result.success(200, "Camada editada com sucesso.", profundityJson);
  }
}
