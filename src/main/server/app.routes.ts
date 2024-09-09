import { Express } from "express";
import userRoutes from "../../app/features/user/user.routes";
import projectsRoutes from "../../app/features/projects/projects.routes";
import holeRoutes from "../../app/features/hole/hole.routes";
import layerRoutes from "../../app/features/layer/layer.routes";
import profundityRoutes from "../../app/features/profundity/profundity.routes";

export const makeRoutes = (app: Express) => {
  app.use(
    userRoutes(),
    projectsRoutes(),
    holeRoutes(),
    layerRoutes(),
    profundityRoutes()
  );
};
