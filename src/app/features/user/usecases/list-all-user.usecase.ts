import { Result, ResultDto } from "../../../shared/utils";
import { UserRepository } from "../repository";

export class ListAllUserUsecase {
  async execute(): Promise<ResultDto> {
    const userRepository = new UserRepository();

    const userDB = await userRepository.listUser();

    const user = userDB.map((user) => user.toJson());

    return Result.success(200, "Usuários cadastrados.", user);
  }
}
