import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../repository";
import { Hole, Project, User } from "../../../models";

export class GetUserUsecase {
  async execute(id: string): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const userEntity = await userRepository.findUserById(id);

    if (!userEntity) {
      return Result.error(404, "Usuário não encontrado.");
    }
    const user = new User(userEntity.toJson().id, userEntity.toJson().username);

    if (userEntity.toJson().projects) {
      userEntity.toJson().projects.forEach((projectEntity) => {
        const project = new Project(
          projectEntity.id,
          projectEntity.projectNumber,
          projectEntity.client,
          projectEntity.projectAlphanumericNumber,
          projectEntity.workDescription,
          projectEntity.workSite,
          projectEntity.releaseDate,
          projectEntity.initialDate,
          projectEntity.finalDate,
          projectEntity.headerText,
          user
        );

        if (projectEntity.holes) {
          projectEntity.holes.forEach((holeEntity) => {
            const hole = new Hole(
              holeEntity.id,
              holeEntity.holeNumber,
              holeEntity.initialDate,
              holeEntity.finalDate,
              holeEntity.name,
              holeEntity.workDescription,
              holeEntity.quota,
              holeEntity.waterLevel,
              holeEntity.interval,
              holeEntity.waterLevelTwo,
              holeEntity.intervalTwo,
              holeEntity.torque,
              holeEntity.coating,
              holeEntity.ultimateDigger,
              holeEntity.initialHelical,
              holeEntity.finalHelical,
              holeEntity.printSpt,
              holeEntity.stop,
              holeEntity.textPoll,
              holeEntity.prober,
              holeEntity.pageLines
            );

            project.addHole(hole);
          });
        }

        user.addProject(project);
      });
    }

    return Result.success(
      200,
      "Usuário encontrado com sucesso.",
      user.toJson()
    );
  }
}
