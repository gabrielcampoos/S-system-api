import { Result, ResultDto } from "../../../shared/utils";
import { CreateUserDto } from "../dtos";
import { UserRepository } from "../repository";

export class CreateUserUsecase {
  async execute(data: CreateUserDto): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const userExists = await userRepository.verifyIfUserExistsById(data.id!);

    if (userExists) return Result.error(400, "Usuário já cadastrado.");

    const newUser = await userRepository.create(data);

    return Result.success(200, "Usuário criado com sucesso.", newUser.toJson());
  }
}
