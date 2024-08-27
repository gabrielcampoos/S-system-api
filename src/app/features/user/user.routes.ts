import { Router } from "express";
import { UserController } from "./controllers";
import { clearField, validateFieldNewUser } from "./middlewares";

export default () => {
  const router = Router();

  router.post(
    "/user",
    [validateFieldNewUser, clearField],
    UserController.createUser
  );

  router.get("/user", UserController.listUser);
  router.get("/validateDataUser", UserController.getUser);

  router.put("/user/:id", UserController.editUser);

  router.delete("/user/:id", UserController.deleteUser);

  return router;
};
