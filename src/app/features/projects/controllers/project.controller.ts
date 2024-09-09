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
import { UpdateHoleDto } from "../../hole/dtos";

export class ProjectController {
  static async createProject(request: Request, response: Response) {
    const { userId } = request.params;
    const project: CreateProjectDto = request.body;

    try {
      const usecase = new CreateProjectUsecase();

      const result = await usecase.execute(userId, project);

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
    const { userId } = request.params;

    if (!userId) {
      return httpHelper.badRequestError(
        response,
        Result.error(400, "User ID is missing.")
      );
    }

    try {
      const usecase = new ListAllProjectsUsecase();

      const result = await usecase.execute(userId);

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
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

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

    const projectData = {
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
    };

    try {
      const usecase = new EditProjectUsecase();

      const result = await usecase.execute(userId, {
        id,
        newData: projectData.newData,
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
