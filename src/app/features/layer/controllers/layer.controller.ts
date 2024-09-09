import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateLayerDto, EditLayerDto } from "../dtos";
import {
  CreateLayerUsecase,
  DeleteLayerUsecase,
  EditLayerUsecase,
  GetLayerUsecase,
  ListAllLayersUsecase,
} from "../usecases";

export class LayerController {
  static async createLayer(request: Request, response: Response) {
    const { holeId } = request.params;
    const layers: CreateLayerDto[] = request.body;

    try {
      const usecase = new CreateLayerUsecase();

      const result = await usecase.execute(holeId, layers);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      console.error("Error creating layers:", error);
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listLayers(request: Request, response: Response) {
    const { holeId } = request.params;

    try {
      const usecase = new ListAllLayersUsecase();

      const result = await usecase.execute(holeId);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      console.error("Error listing layers:", error);
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async getLayer(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new GetLayerUsecase();

      const result = await usecase.execute(id);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      console.error("Error getting layer:", error);
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async editLayer(request: Request, response: Response) {
    const { id } = request.params;
    const {
      projectNumber,
      hole,
      code,
      depth,
      profundities,
      type,
      description,
      hatch,
    } = request.body;

    try {
      const usecase = new EditLayerUsecase();

      const result = await usecase.execute({
        id,
        newData: {
          projectNumber,
          hole,
          code,
          depth,
          type,
          description,
          hatch,
        },
      });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      console.error("Error editing layer:", error);
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async deleteLayer(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new DeleteLayerUsecase();

      const result = await usecase.execute(id);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      console.error("Error deleting layer:", error);
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
