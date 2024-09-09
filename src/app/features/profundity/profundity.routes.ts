import { Router } from "express";
import { ProfundityController } from "./controllers";

export default () => {
  const router = Router();

  router.post(
    "/profundity",

    ProfundityController.createProfundity
  );

  router.get("/profundity", ProfundityController.listProfundities);
  // router.get("/validateDatalayer/:id", ProfundityController.getLayer);

  router.put("/profundity/:id", ProfundityController.editProfundity);

  router.delete("/profundity/:id", ProfundityController.deleteProfundity);

  return router;
};
