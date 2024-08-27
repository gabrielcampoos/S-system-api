import { NextFunction, Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";

export const validateFieldNewUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username } = request.body;

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário username em formato string")
    );
  }

  return next();
};
