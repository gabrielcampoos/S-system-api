import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateHoleDto, EditHoleDto } from "../dtos";
import {
  CreateHoleUsecase,
  DeleteHoleUsecase,
  EditHoleUsecase,
  GetHoleUsecase,
  ListAllHolesUsecase,
} from "../usecases";

export class HoleController {
  static async createHole(request: Request, response: Response) {
    const { projectId } = request.params;

    if (!projectId) {
      return httpHelper.badRequestError(
        response,
        Result.error(400, "ID do projeto é obrigatório.")
      );
    }

    const hole: CreateHoleDto[] = Array.isArray(request.body)
      ? request.body
      : [];

    if (hole.length === 0) {
      return httpHelper.badRequestError(
        response,
        Result.error(400, "Dados dos furos inválidos.")
      );
    }

    try {
      const usecase = new CreateHoleUsecase();

      const result = await usecase.execute(projectId, hole);

      if (!result.success) {
        return httpHelper.badRequestError(response, result);
      }

      return httpHelper.success(response, result);
    } catch (error: any) {
      console.error("Error creating holes:", error);
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listHoles(request: Request, response: Response) {
    const { projectId } = request.params;

    if (!projectId) {
      return httpHelper.badRequestError(
        response,
        Result.error(400, "Project ID is missing.")
      );
    }

    try {
      const usecase = new ListAllHolesUsecase();

      const result = await usecase.execute(projectId);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async getHole(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usecase = new GetHoleUsecase();

      const result = await usecase.execute(id);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async editHole(request: Request, response: Response) {
    const { id } = request.params;
    const {
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
    } = request.body;

    try {
      const usecase = new EditHoleUsecase();

      const result = await usecase.execute({
        id,
        newData: {
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
        },
      });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(response, error.toString());
    }
  }

  static async deleteHole(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new DeleteHoleUsecase();

      const result = await usecase.execute(id);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(response, error.toString());
    }
  }
}
