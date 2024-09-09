import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Hole, Layer } from "../../../models";
import { HoleEntity, ProjectEntity } from "../../../shared/entities";
import { UserRepository } from "../../user/repository";
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

  async createHolesForProject(
    projectId: string,
    holesData: CreateHoleDto[]
  ): Promise<Hole[]> {
    if (!Array.isArray(holesData)) {
      throw new TypeError("holesData must be an array");
    }

    const project = await this._manager.findOne(ProjectEntity, {
      where: { id: projectId },
      relations: ["holes"],
    });

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    const holes = holesData.map((holeData) => {
      return this._manager.create(HoleEntity, { ...holeData, project });
    });

    const createdHoles = await this._manager.save(holes);
    return createdHoles.map((hole) => this.entityToModel(hole));
  }

  async listHoles(projectId: string): Promise<Hole[]> {
    if (!projectId) {
      throw new Error("Project ID is missing.");
    }

    const listHoles = await this._manager.find(HoleEntity, {
      where: { project: { id: projectId } },
      relations: ["layers"],
    });

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
    const hole = new Hole(
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

    if (dataDB.layers) {
      dataDB.layers.forEach((layerEntity) => {
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

    return hole;
  }
}
