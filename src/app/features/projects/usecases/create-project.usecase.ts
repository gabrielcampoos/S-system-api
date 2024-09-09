import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../../user/repository";
import { CreateProjectDto } from "../dtos";
import { ProjectRepository } from "../repository";

export class CreateProjectUsecase {
  async execute(userId: string, data: CreateProjectDto): Promise<ResultDto> {
    const userRepository = new UserRepository();
    const projectRepository = new ProjectRepository();

    const userExists = await userRepository.findUserById(userId);

    if (!userExists) return Result.error(400, "Usuário não encontrado.");

    const newProject = await projectRepository.createProject(
      userExists.toJson().id,
      data
    );

    return Result.success(200, "Projeto criado com sucesso.", {
      ...newProject.toJson(),
      userId,
    });
  }
}
