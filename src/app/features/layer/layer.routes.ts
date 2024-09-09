import { Router } from "express";
import { LayerController } from "./controllers";

export default () => {
  const router = Router();

  router.post(
    "/layer/:holeId",

    LayerController.createLayer
  );

  router.get("/layer/:holeId", LayerController.listLayers);
  router.get("/validateDatalayer/:id", LayerController.getLayer);

  router.put("/layer/:id", LayerController.editLayer);

  router.delete("/layer/:id", LayerController.deleteLayer);

  return router;
};
