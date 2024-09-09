import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Hole, Layer, Profundity, Project, User } from "../../../models";
import { UserEntity } from "../../../shared/entities";
import { CreateUserDto, UpdateUserDto } from "../dtos";

export class UserRepository {
  private _manager = DatabaseConnection.connection.manager;

  async findUserById(id: string): Promise<User | null> {
    const userExists = await this._manager.findOne(UserEntity, {
      where: { id: id },
      relations: ["projects", "projects.holes", "projects.holes.layers"],
    });

    if (!userExists) return null;

    return this.entityToModel(userExists);
  }

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
    const listUser = await this._manager.find(UserEntity, {
      relations: ["projects", "projects.holes", "projects.holes.layers"],
    });

    return listUser.map((user) => this.entityToModel(user));
  }

  async editUser(data: UpdateUserDto): Promise<User | null> {
    const { id, username } = data;

    const result = await this._manager.update(UserEntity, id, { username });

    if (result.affected === 0) {
      return null;
    }

    const updatedUserEntity = await this._manager.findOneBy(UserEntity, { id });

    if (updatedUserEntity) {
      return this.entityToModel(updatedUserEntity);
    }

    return null;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this._manager.delete(UserEntity, { id: id });

    if (result.affected === 0) {
      throw new Error(`Failed to delete user with ID ${id}`);
    }
  }

  private entityToModel(dataDB: UserEntity): User {
    const user = new User(dataDB.id, dataDB.username);

    if (Array.isArray(dataDB.projects)) {
      dataDB.projects.forEach((projectEntity) => {
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

        if (Array.isArray(projectEntity.holes)) {
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

            if (Array.isArray(holeEntity.layers)) {
              holeEntity.layers.forEach((layerEntity) => {
                const layer = new Layer(
                  layerEntity.id,
                  layerEntity.projectNumber,
                  layerEntity.hole?.id,
                  layerEntity.code,
                  layerEntity.depth,
                  layerEntity.type,
                  layerEntity.description,
                  layerEntity.hatch
                );

                hole.addLayer(layer);
              });
            }

            project.addHole(hole);
          });
        }

        user.addProject(project);
      });
    }

    return user;
  }
}
