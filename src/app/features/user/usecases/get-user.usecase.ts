import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../repository";

export class GetUserUsecase {
  async execute(id: string): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const user = await userRepository.verifyIfUserExistsById(id);

    if (!user) return Result.error(400, "Usuário não encontrado.");

    return Result.success(
      200,
      "Usuário encontrado com sucesso.",
      user.toJson()
    );
  }
}
