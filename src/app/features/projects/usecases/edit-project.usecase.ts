import { Result, ResultDto } from "../../../shared/utils";
import { EditProjectDto } from "../dtos";
import { ProjectRepository } from "../repository";

export class EditProjectUsecase {
  async execute(data: EditProjectDto): Promise<ResultDto> {
    const { id, newData } = data;

    const projectRepository = new ProjectRepository();

    const projectExists = await projectRepository.verifyIfProjectExistsById(id);

    if (!projectExists) return Result.error(400, "Projeto não encontrado.");

    const projectUpdate = projectExists.editProject({
      projectNumber: newData.projectNumber,
      client: newData.client,
      projectAlphanumericNumber: newData.projectAlphanumericNumber,
      workDescription: newData.workDescription,
      workSite: newData.workSite,
      releaseDate: newData.releaseDate,
      initialDate: newData.initialDate,
      finalDate: newData.finalDate,
      headerText: newData.headerText,
    });

    if (!projectUpdate)
      return Result.error(400, "Projeto não pode ser editado.");

    const projectJson = projectExists.toJson();

    projectRepository.editProject({
      id,
      projectNumber: projectJson.projectNumber,
      client: projectJson.client,
      projectAlphanumericNumber: projectJson.projectAlphanumericNumber,
      workDescription: projectJson.workDescription,
      workSite: projectJson.workSite,
      releaseDate: projectJson.releaseDate,
      initialDate: projectJson.initialDate,
      finalDate: projectJson.finalDate,
      headerText: projectJson.headerText,
    });

    return Result.success(200, "Projeto editado com sucesso.", projectJson);
  }
}
