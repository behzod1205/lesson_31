import { Router  } from "express";
import userController from "../controller/user.controller.js";

const UserRouter = Router()

UserRouter.get("/", userController.getAll)
UserRouter.get("/:id", userController.getOne)
UserRouter.post("/", userController.create)
UserRouter.put("/:id", userController.update)
UserRouter.delete("/:id", userController.delete)

export default UserRouter