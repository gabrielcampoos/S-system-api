import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateProjectDto } from "../dtos";
import {
  CreateProjectUsecase,
  DeleteProjectUsecase,
  EditProjectUsecase,
  GetProjectUsecase,
  ListAllProjectsUsecase,
} from "../usecases";

export class ProjectController {
  static async createProject(request: Request, response: Response) {
    const project: CreateProjectDto = request.body;

    try {
      const usecase = new CreateProjectUsecase();

      const result = await usecase.execute(project);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listProjects(request: Request, response: Response) {
    try {
      const usecase = new ListAllProjectsUsecase();

      const result = await usecase.execute();

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async getProject(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usecase = new GetProjectUsecase();

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

  static async editProject(request: Request, response: Response) {
    const { id } = request.params;
    const {
      projectNumber,
      client,
      projectAlphanumericNumber,
      workDescription,
      workSite,
      releaseDate,
      initialDate,
      finalDate,
      headerText,
    } = request.body;

    try {
      const usecase = new EditProjectUsecase();

      const result = await usecase.execute({
        id,
        newData: {
          projectNumber,
          client,
          projectAlphanumericNumber,
          workDescription,
          workSite,
          releaseDate,
          initialDate,
          finalDate,
          headerText,
        },
      });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(response, error.toString());
    }
  }

  static async deleteProject(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new DeleteProjectUsecase();

      const result = await usecase.execute(id);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(response, error.toString());
    }
  }
}
