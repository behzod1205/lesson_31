import { Router  } from "express";
import userController from "../controller/user.controller.js";

const UserRouter = Router()

UserRouter.get("/", userController.getAll)
UserRouter.get("/:id", userController.getOne)
UserRouter.post("/", userController.create)
UserRouter.put("/:id", userController.update)
UserRouter.delete("/:id", userController.delete)
UserRouter.get("/:id/posts", userController.findUserAndPosts)
UserRouter.get("/:id/posts/:postId", userController.findUserAndOnePost)
UserRouter.get("/:id/posts/:postId/comments", userController.findUserAndOneWithComments)

export default UserRouter