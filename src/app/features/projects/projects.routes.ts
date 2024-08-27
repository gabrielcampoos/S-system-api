import { Router } from "express";
import { ProjectController } from "./controllers";

export default () => {
  const router = Router();

  router.post(
    "/project",

    ProjectController.createProject
  );

  router.get("/project", ProjectController.listProjects);
  router.get("/validateDataProject/:id", ProjectController.getProject);

  router.put("/project/:id", ProjectController.editProject);

  router.delete("/project/:id", ProjectController.deleteProject);

  return router;
};
