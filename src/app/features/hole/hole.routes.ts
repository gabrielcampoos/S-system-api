import { Router } from "express";
import { HoleController } from "./controllers";

export default () => {
  const router = Router();

  router.post(
    "/hole/:projectId",

    HoleController.createHole
  );

  router.get("/hole/:projectId", HoleController.listHoles);
  router.get("/validateDataHole/:id", HoleController.getHole);

  router.put("/hole/:id", HoleController.editHole);

  router.delete("/hole/:id", HoleController.deleteHole);

  return router;
};
