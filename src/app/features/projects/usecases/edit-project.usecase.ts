import { Result, ResultDto } from "../../../shared/utils";
import { UpdateHoleDto } from "../../hole/dtos";
import { EditProjectDto, UpdateProjectDto } from "../dtos";
import { ProjectRepository } from "../repository";

export class EditProjectUsecase {
  async execute(userId: string, data: EditProjectDto): Promise<ResultDto> {
    const { id, newData } = data;

    const projectRepository = new ProjectRepository();

    const projectExists = await projectRepository.verifyIfProjectExistsById(id);

    if (!projectExists) return Result.error(400, "Projeto não encontrado.");

    if (projectExists.getUserId() !== userId) {
      return Result.error(403, "Usuário não autorizado a editar este projeto.");
    }

    const projectUpdate = projectExists.editProject(newData);

    if (!projectUpdate)
      return Result.error(400, "Projeto não pode ser editado.");

    const updateProjectDto: UpdateProjectDto = {
      id,
      projectNumber: newData.projectNumber,
      client: newData.client,
      projectAlphanumericNumber: newData.projectAlphanumericNumber,
      workDescription: newData.workDescription,
      workSite: newData.workSite,
      releaseDate: newData.releaseDate,
      initialDate: newData.initialDate,
      finalDate: newData.finalDate,
      headerText: newData.headerText,
    };

    await projectRepository.editProjectAndHoles(userId, updateProjectDto);

    const updatedProject = await projectRepository.verifyIfProjectExistsById(
      id
    );
    const updatedProjectJson = updatedProject?.toJson();

    if (!updatedProjectJson)
      return Result.error(400, "Falha ao obter projeto atualizado.");

    return Result.success(
      200,
      "Projeto editado com sucesso.",
      updatedProjectJson
    );
  }
}
