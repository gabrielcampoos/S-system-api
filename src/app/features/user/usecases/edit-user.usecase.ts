import { Result, ResultDto } from "../../../shared/utils";
import { EditUserDto } from "../dtos";
import { UserRepository } from "../repository";

export class EditUserUsecase {
  async execute(data: EditUserDto): Promise<ResultDto> {
    const { id, newData } = data;
    const userRepository = new UserRepository();

    const userExists = await userRepository.verifyIfUserExistsById(id);

    if (!userExists) {
      return Result.error(400, "Usuário não encontrado.");
    }

    const updatedUser = await userRepository.editUser({
      id,
      username: newData.username,
    });

    if (!updatedUser) {
      return Result.error(400, "Usuário não pode ser editado.");
    }

    return Result.success(
      200,
      "Usuário editado com sucesso.",
      updatedUser.toJson()
    );
  }
}
