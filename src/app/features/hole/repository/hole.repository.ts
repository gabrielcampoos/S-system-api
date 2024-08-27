import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Hole } from "../../../models";
import { HoleEntity } from "../../../shared/entities";
import { CreateHoleDto, UpdateHoleDto } from "../dtos";

export class HoleRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfHoleExistsById(id: string): Promise<Hole | null> {
    const holeExists = await this._manager.findOneBy(HoleEntity, {
      id,
    });

    if (!holeExists) return null;

    return this.entityToModel(holeExists);
  }

  async create(hole: CreateHoleDto): Promise<Hole> {
    const createHole = this._manager.create(HoleEntity, { ...hole });

    const createdHole = await this._manager.save(createHole);

    return this.entityToModel(createdHole);
  }

  async listHoles(): Promise<Hole[]> {
    const listHoles = await this._manager.find(HoleEntity);

    return listHoles.map((hole) => this.entityToModel(hole));
  }

  async editHole(data: UpdateHoleDto): Promise<void> {
    const {
      id,
      holeNumber,
      initialDate,
      finalDate,
      name,
      workDescription,
      quota,
      waterLevel,
      interval,
      waterLevelTwo,
      intervalTwo,
      torque,
      coating,
      ultimateDigger,
      initialHelical,
      finalHelical,
      printSpt,
      stop,
      textPoll,
      prober,
      pageLines,
    } = data;

    await this._manager.update(
      HoleEntity,
      { id: id },
      {
        holeNumber,
        initialDate,
        finalDate,
        name,
        workDescription,
        quota,
        waterLevel,
        interval,
        waterLevelTwo,
        intervalTwo,
        torque,
        coating,
        ultimateDigger,
        initialHelical,
        finalHelical,
        printSpt,
        stop,
        textPoll,
        prober,
        pageLines,
      }
    );
  }

  async deleteHole(id: string): Promise<void> {
    const hole = await this._manager.delete(HoleEntity, { id: id });

    if (!hole) return undefined;
  }

  private entityToModel(dataDB: HoleEntity): Hole {
    return new Hole(
      dataDB.id,
      dataDB.holeNumber,
      dataDB.initialDate,
      dataDB.finalDate,
      dataDB.name,
      dataDB.workDescription,
      dataDB.quota,
      dataDB.waterLevel,
      dataDB.interval,
      dataDB.waterLevelTwo,
      dataDB.intervalTwo,
      dataDB.torque,
      dataDB.coating,
      dataDB.ultimateDigger,
      dataDB.initialHelical,
      dataDB.finalHelical,
      dataDB.printSpt,
      dataDB.stop,
      dataDB.textPoll,
      dataDB.prober,
      dataDB.pageLines
    );
  }
}
