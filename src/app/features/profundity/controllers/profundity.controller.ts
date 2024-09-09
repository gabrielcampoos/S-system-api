import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateProfundityDto } from "../dtos";
import {
  CreateProfundityUsecase,
  DeleteProfundityUsecase,
  EditProfundityUsecase,
  ListAllProfunditiesUsecase,
} from "../usecases";

export class ProfundityController {
  static async createProfundity(request: Request, response: Response) {
    const profundities: CreateProfundityDto[] = request.body;

    try {
      const usecase = new CreateProfundityUsecase();

      const result = await usecase.execute(profundities);

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

  static async listProfundities(request: Request, response: Response) {
    try {
      const usecase = new ListAllProfunditiesUsecase();

      const result = await usecase.execute();

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

  // static async getLayer(request: Request, response: Response) {
  //   const { id } = request.params;

  //   try {
  //     const usecase = new GetLayerUsecase();

  //     const result = await usecase.execute(id);

  //     if (!result.success) return httpHelper.badRequestError(response, result);

  //     return httpHelper.success(response, result);
  //   } catch (error: any) {
  //     console.error("Error getting layer:", error);
  //     return httpHelper.badRequestError(
  //       response,
  //       Result.error(500, error.toString())
  //     );
  //   }
  // }

  static async editProfundity(request: Request, response: Response) {
    const { id } = request.params;
    const {
      profundity0,
      spt,
      hit1,
      profundity1,
      hit2,
      profundity2,
      hit3,
      profundity3,
    } = request.body;

    try {
      const usecase = new EditProfundityUsecase();

      const result = await usecase.execute({
        id,
        newData: {
          profundity0,
          spt,
          hit1,
          profundity1,
          hit2,
          profundity2,
          hit3,
          profundity3,
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

  static async deleteProfundity(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new DeleteProfundityUsecase();

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
