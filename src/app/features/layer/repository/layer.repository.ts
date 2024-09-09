import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Layer } from "../../../models";
import { LayerEntity, HoleEntity } from "../../../shared/entities";
import { CreateLayerDto, UpdateLayerDto } from "../dtos";

export class LayerRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfLayerExistsById(id: string): Promise<Layer | null> {
    const layerExists = await this._manager.findOneBy(LayerEntity, {
      id,
    });

    if (!layerExists) return null;

    return this.entityToModel(layerExists);
  }

  async createLayersForHole(
    holeId: string,
    layersData: CreateLayerDto | CreateLayerDto[]
  ): Promise<Layer[]> {
    const dataArray = Array.isArray(layersData) ? layersData : [layersData];

    const hole = await this._manager.findOne(HoleEntity, {
      where: { id: holeId },
      relations: ["layers"], // assuming layers is a relation in HoleEntity
    });

    if (!hole) {
      throw new Error(`Hole with ID ${holeId} not found`);
    }

    if (!Array.isArray(layersData)) {
      throw new Error("Expected layersData to be an array.");
    }

    try {
      const layers = await Promise.all(
        dataArray.map(async (layerData) => {
          const layerEntity = this._manager.create(LayerEntity, {
            id: layerData.id,
            projectNumber: layerData.projectNumber,
            code: layerData.code,
            depth: layerData.depth,
            type: layerData.type,
            description: layerData.description,
            hatch: layerData.hatch,
            hole: hole,
          });

          await this._manager.save(layerEntity);

          return this.entityToModel(layerEntity);
        })
      );

      return layers;
    } catch (error) {
      console.error("Error creating layers:", error);
      throw error;
    }
  }

  async listLayers(holeId: string): Promise<Layer[]> {
    const listLayers = await this._manager.find(LayerEntity, {
      where: { hole: { id: holeId } },
    });

    if (!listLayers) {
      console.error("Nenhuma camada encontrada para o furo:", holeId);
      return [];
    }

    return listLayers.map((layer) => this.entityToModel(layer));
  }

  async editLayer(data: UpdateLayerDto): Promise<void> {
    const { id, projectNumber, hole, code, depth, type, description, hatch } =
      data;

    const layerEntity = await this._manager.findOne(LayerEntity, {
      where: { id },
    });

    if (!layerEntity) {
      throw new Error(`Layer with ID ${id} not found`);
    }

    if (hole) {
      const holeEntity = await this._manager.findOne(HoleEntity, {
        where: { id: hole },
      });
      if (!holeEntity) {
        throw new Error(`Hole with ID ${hole} not found`);
      }
      layerEntity.hole = holeEntity;
    }
    layerEntity.projectNumber = projectNumber;
    layerEntity.code = code;
    (layerEntity.depth = depth), (layerEntity.type = type);
    layerEntity.description = description;
    layerEntity.hatch = hatch;

    await this._manager.save(layerEntity);
  }

  async deleteLayer(id: string): Promise<void> {
    const result = await this._manager.delete(LayerEntity, { id });

    if (result.affected === 0) {
      throw new Error(`Layer with ID ${id} not found`);
    }
  }

  private entityToModel(dataDB: LayerEntity): Layer {
    if (!dataDB) {
      throw new Error("DataDB is undefined or null");
    }

    // Verifique se todos os dados necessários estão presentes
    if (!dataDB.id || !dataDB.projectNumber || !dataDB.code) {
      throw new Error("Missing required properties in LayerEntity");
    }

    return new Layer(
      dataDB.id,
      dataDB.projectNumber,
      dataDB.hole?.id || "", // Se `hole` não estiver presente, passe um valor padrão
      dataDB.code,
      dataDB.depth,
      dataDB.type || "", // Valores padrão se necessário
      dataDB.description || "",
      dataDB.hatch || ""
    );
  }
}
