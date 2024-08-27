import { NextFunction, Request, Response } from "express";

export const clearField = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username } = request.body;

  request.body.username = username.trim();

  next();
};
