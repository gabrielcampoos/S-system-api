import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateUserDto } from "../dtos";
import {
  CreateUserUsecase,
  DeleteUserUsecase,
  EditUserUsecase,
  GetUserUsecase,
  ListAllUserUsecase,
} from "../usecases";

export class UserController {
  static async createUser(request: Request, response: Response) {
    const user: CreateUserDto = request.body;

    try {
      const usecase = new CreateUserUsecase();

      const result = await usecase.execute(user);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listUser(request: Request, response: Response) {
    try {
      const usecase = new ListAllUserUsecase();

      const result = await usecase.execute();

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async getUser(request: Request, response: Response) {
    try {
      const { id } = request.body;

      const usecase = new GetUserUsecase();

      const result = await usecase.execute(id);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async editUser(request: Request, response: Response) {
    const { id } = request.params;
    const { username } = request.body;

    try {
      const usecase = new EditUserUsecase();

      const result = await usecase.execute({
        id,
        newData: {
          username,
        },
      });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(response, error.toString());
    }
  }

  static async deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const usecase = new DeleteUserUsecase();

      const result = await usecase.execute(id);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(response, error.toString());
    }
  }
}
