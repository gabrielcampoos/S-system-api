import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../repository";

export class DeleteUserUsecase {
  async execute(id: string): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const userExists = await userRepository.verifyIfUserExistsById(id);
    console.log("Usuário encontrado:", userExists);

    if (!userExists) {
      return Result.error(
        400,
        "Usuário não encontrado. Não foi possível excluir."
      );
    }

    await userRepository.deleteUser(id);

    return Result.success(200, "Usuário excluído com sucesso.", id);
  }
}
