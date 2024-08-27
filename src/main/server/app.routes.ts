import { Express } from "express";
import userRoutes from "../../app/features/user/user.routes";
import projectsRoutes from "../../app/features/projects/projects.routes";
import holeRoutes from "../../app/features/hole/hole.routes";

export const makeRoutes = (app: Express) => {
  app.use(userRoutes(), projectsRoutes(), holeRoutes());
};
