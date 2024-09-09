import { Router } from "express";
import { ProjectController } from "./controllers";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

export default () => {
  const router = Router();

  router.post(
    "/project/:userId",

    ProjectController.createProject
  );

  router.get("/project/:userId", ProjectController.listProjects);
  router.get("/validateDataProject/:id", ProjectController.getProject);

  router.put("/project/:id", authMiddleware, ProjectController.editProject);

  router.delete("/project/:id", ProjectController.deleteProject);

  return router;
};
