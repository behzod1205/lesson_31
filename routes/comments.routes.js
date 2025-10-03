import { Router } from "express";
import { commentController } from "../controller/comment.controller.js";

const CommentRouter = Router()

CommentRouter.get("/", commentController.getAll)
CommentRouter.get("/:id", commentController.getOne)
CommentRouter.post("/", commentController.create)
CommentRouter.put("/:id", commentController.update)
CommentRouter.delete("/", commentController.delete)

export default CommentRouter