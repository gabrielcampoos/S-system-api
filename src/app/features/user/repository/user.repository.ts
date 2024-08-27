import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { User } from "../../../models";
import { UserEntity } from "../../../shared/entities";
import { CreateUserDto, UpdateUserDto } from "../dtos";

export class UserRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfUserExistsById(id: string): Promise<User | null> {
    const userExists = await this._manager.findOneBy(UserEntity, {
      id,
    });

    if (!userExists) return null;

    return this.entityToModel(userExists);
  }

  async create(user: CreateUserDto): Promise<User> {
    const createUser = this._manager.create(UserEntity, { ...user });

    const createdUser = await this._manager.save(createUser);

    return this.entityToModel(createdUser);
  }

  async listUser(): Promise<User[]> {
    const listUser = await this._manager.find(UserEntity);

    return listUser.map((user) => this.entityToModel(user));
  }

  async editUser(data: UpdateUserDto): Promise<void> {
    const { id, username } = data;

    await this._manager.update(UserEntity, { id: id }, { username });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this._manager.delete(UserEntity, { id: id });

    if (!user) return undefined;
  }

  private entityToModel(dataDB: UserEntity): User {
    return new User(dataDB.id, dataDB.username);
  }
}
