import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Profundity } from "../../../models";
import { ProfundityEntity } from "../../../shared/entities/profundity.entity";
import { CreateProfundityDto, UpdateProfundityDto } from "../dtos";

export class ProfundityRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfProfundityExistsById(id: string): Promise<Profundity | null> {
    const profundityExists = await this._manager.findOneBy(ProfundityEntity, {
      id,
    });

    if (!profundityExists) return null;

    return this.entityToModel(profundityExists);
  }

  async createProfundities(
    profunditiesData: CreateProfundityDto[]
  ): Promise<Profundity[]> {
    // Get the highest existing profundity0 in the database
    const highestProfundity = await this._manager
      .createQueryBuilder(ProfundityEntity, "profundity")
      .orderBy("profundity.profundity0", "DESC")
      .getOne();

    let nextProfundity0 = 1; // Default starting value for profundity0

    if (highestProfundity && highestProfundity.profundity0 !== undefined) {
      nextProfundity0 = highestProfundity.profundity0 + 1;
    }

    const profundities = profunditiesData.map((profundityData, index) => {
      return this._manager.create(ProfundityEntity, {
        ...profundityData,
        profundity0: nextProfundity0 + index, // Ensure unique and progressive profundity0
      });
    });

    const createdProfundities = await this._manager.save(profundities);

    return createdProfundities.map((profundity) =>
      this.entityToModel(profundity)
    );
  }

  async listProfundities(): Promise<Profundity[]> {
    const listProfundities = await this._manager.find(ProfundityEntity);

    return listProfundities.map((profundity) => this.entityToModel(profundity));
  }

  async editProfundity(data: UpdateProfundityDto): Promise<Profundity | null> {
    const { id, ...updateData } = data;

    const result = await this._manager.update(ProfundityEntity, id, updateData);

    if (result.affected === 0) {
      return null;
    }

    const updatedProfundityEntity = await this._manager.findOneBy(
      ProfundityEntity,
      { id }
    );

    if (updatedProfundityEntity) {
      return this.entityToModel(updatedProfundityEntity);
    }

    return null;
  }

  async deleteProfundity(id: string): Promise<void> {
    const result = await this._manager.delete(ProfundityEntity, id);

    if (result.affected === 0) {
      throw new Error(`Failed to delete profundity with ID ${id}`);
    }
  }

  private entityToModel(dataDB: ProfundityEntity): Profundity {
    return new Profundity(
      dataDB.id,
      dataDB.profundity0,
      dataDB.spt,
      dataDB.hit1,
      dataDB.profundity1,
      dataDB.hit2,
      dataDB.profundity2,
      dataDB.hit3,
      dataDB.profundity3
    );
  }
}
