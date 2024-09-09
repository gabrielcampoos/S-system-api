import { Result, ResultDto } from "../../../shared/utils";
import { CreateUserDto } from "../dtos";
import { UserRepository } from "../repository";

export class CreateUserUsecase {
  async execute(data: CreateUserDto): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const newUser = await userRepository.create(data);

    return Result.success(201, "Usuário criado com sucesso.", newUser.toJson());
  }
}
