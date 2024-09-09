import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../../user/repository";
import { ProjectRepository } from "../repository";

export class ListAllProjectsUsecase {
  async execute(userId: string): Promise<ResultDto> {
    if (!userId) {
      return Result.error(400, "User ID is missing.");
    }

    const userRepository = new UserRepository();
    const projectRepository = new ProjectRepository();

    const userExists = await userRepository.findUserById(userId);

    if (!userExists) {
      return Result.error(404, "Usuário não encontrado.");
    }

    const projectDB = await projectRepository.listProjects(userId);

    const projects = projectDB.map((project) => project.toJson());

    return Result.success(200, "Projetos cadastrados.", projects);
  }
}
